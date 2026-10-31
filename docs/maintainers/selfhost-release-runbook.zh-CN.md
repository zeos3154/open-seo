# OpenSEO 自托管发布与故障回滚 SOP

适用实例：`openseo.willship.dev`，主 Worker `open-seo-selfhost`，审计 Worker `open-seo-selfhost-audit`，Alchemy stack `open-seo` / stage `selfhost`。这份文档说明操作流程；每次实际执行的版本号、备份、时间和验收结果另存私有发布记录，不提交到 Git。

## 1. 先确认 main 与线上之间的关系

GitHub 的 main 是源码分支；Cloudflare Worker version 是线上运行版本，两者不自动等同。

每次发布先核对两条可能的部署路径：

1. **GitHub Actions**：检查 `.github/workflows/` 的触发事件、仓库限制和部署目标。本仓库现有 `deploy-production.yml` 只接受手动 `workflow_dispatch`，且仅允许它列出的上游仓库部署托管版，不负责本自托管实例。`ci.yml` 在 main push 后执行检查，不部署本实例。
2. **Cloudflare Workers Builds**：通过官方 Builds API 核对是否关联 Git、关联仓库、production branch、build/deploy commands、是否启用预览，以及变量与密钥来源。若已关联 production branch 为 main，推送或合并到 main 会触发构建并执行部署命令。API 读取失败不代表未关联；403 时需提供具备读取权限的凭据，或在允许使用浏览器时查控制台。

**必须在合并 main 之前完成备份。** 自动部署已接通时，合并本身就是发布触发点。不要同时再从本机部署，避免两个发布过程互相覆盖。

确认未关联自动部署后，合并 main 只更新源码，需要从本机使用下面的自托管部署命令构建、上传。Cloudflare 面板出现 “Automatic deployment on upload” 只表示上传后自动激活版本，不能证明关联了 Git。

参考：[Workers Builds 分支规则](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/)、[Builds API](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/)。

### 使用 CLI 读取构建触发器

Wrangler 当前没有直接查询 Workers Builds 配置的子命令，可以从 CLI 调用官方接口：

```text
GET /accounts/{account_id}/builds/workers/{worker_tag}/triggers
```

`worker_tag` 是 Workers API 返回的不可变 tag，不是 Worker 名称。该读取接口接受 `Workers CI Read` 或 `Workers CI Write`。现有部署 OAuth 登录可能只有 `Workers Scripts` 等权限，能发布 Worker 也不代表能读取 Builds；反复执行同一命令或重新申请同一组 OAuth scopes 不能补出缺少的权限。

只核查触发器时，使用限定当前账号的用户 API Token 并授予 `Workers CI Read`；需要查询实际 DNS 记录时，额外限定目标 zone 的 `DNS Read`。不要为此创建全权限令牌。令牌从安全环境或私有文件读取，不放进命令行参数、聊天或 Git。官方权限依据：[列出 Worker 构建触发器](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/list/)。

DNS 的公开解析可用 DNS-over-HTTPS 查询并保存，避免本机代理的 Fake-IP 被当成真实解析。公开 A/AAAA 结果不是控制台 DNS 记录的完整备份：它不包含 record ID、原始 CNAME 目标及代理设置。应与 Worker custom-domain 配置分开记录。

### 在 Cloudflare 中配置本实例的自动发布

先在现有 `open-seo-selfhost` 上关联仓库；`open-seo-selfhost-audit` 由同一 Alchemy stack 管理，不另配一条并行发布链路。配置完成并验收前，打开“禁用构建”、关闭“启用预览构建”。

| 表单项          | 值                                             |
| --------------- | ---------------------------------------------- |
| Git 账户 / 仓库 | 自己的 fork，例如 `zeos3154/open-seo`          |
| 生产分支        | `main`                                         |
| 路径            | `/`                                            |
| 构建命令        | `pnpm selfhost:prepare-build && pnpm ci:check` |
| 部署命令        | `pnpm deploy:selfhost --yes`                   |
| 预览构建        | 初期关闭；预览需要单独隔离的资源和 Access 配置 |
| 构建是否启用    | 全部配置及发布准备通过后再启用                 |

构建环境使用 Node 24（例如构建变量 `NODE_VERSION=24`）以及仓库 `packageManager` 锁定的 pnpm 版本。部署命令会完成自托管生产构建，不需要再填默认的 `pnpm run build`。

在**构建变量和机密**中配置：

- `CLOUDFLARE_ACCOUNT_ID`：现有实例所在账号 ID，普通变量。
- `OPENSEO_SELFHOST_ENV_B64`：原 `.env.selfhost` 完整字节的 base64，必须设为加密 Secret。它包含运行密钥；base64 本身不是加密。不要使用模板文件替代现有配置，不要放进 Git。
- 构建环境的部署凭据：必须供 Alchemy 读取到 `CLOUDFLARE_API_TOKEN`。平台默认 build token 是否已经注入、权限是否足够，需要在首次部署前核对。

在可信本机终端复制原配置的 base64 到剪贴板，不向终端或聊天输出密钥：

```sh
base64 < .env.selfhost | tr -d '\n' | pbcopy
```

将剪贴板内容粘贴进上述**构建 Secret**。`selfhost:prepare-build` 在全新构建机恢复权限为 `600` 的 `.env.selfhost`；遇到不同的既有文件会拒绝覆盖。它保留原始字节，拒绝 `hosted`/`local_noauth` 的生产配置，不打印变量值。它只准备配置，不做备份或发布。

Alchemy 在新构建机还需连接原有的 `alchemy-state-store`；沿用 `open-seo/selfhost`，不能换 stage 或重新 bootstrap。当前锁定版本首次在 CI 读取状态凭据时，会通过现有 Secrets Store 与临时 edge preview 获取状态访问令牌，因此部署凭据还要满足这条路径的权限。

发布凭据至少应覆盖现有自托管 stack 实际使用的资源：Workers Scripts、D1、Workers KV、Workers R2、目标 zone 的 Workers Routes，以及 Access Apps and Policies 的更新；还需账号/zone 读取、原 Zero Trust organization 读取，以及上述 Secrets Store 状态访问路径。以当前资源计划和实际 API 权限核对，限定为当前账号和目标 zone。不要把“能上传一个 Worker”当作整个 Alchemy stack 的权限已经齐全。

构建页提示缺少 `artifacts_read`/`artifacts_write`，只说明这两项尚未授权；它不是本 stack 其余权限的检测结果。预览关闭后仍应按所使用的平台功能核对令牌，不能仅补齐这两项就认为部署已经就绪。

首次启用前，准备脚本必须已包含在目标 main SHA；确认原环境配置和状态能读取，备份校验通过，Alchemy 计划没有意外资源变化。这个配置尚未实现自动导出全部存储；**每次推送 main 前仍须完成第 3 节的备份**。需要把备份也放进流水线时，应先指定私有持久化位置、保留期和恢复校验，再启用无人值守发布。

## 2. 发布准入检查

记录操作者、目标仓库/分支和准确 Git SHA，确认当前 Cloudflare 账号以及 Worker、D1、R2、KV 的实际 ID。不要把默认 Wrangler 配置中的 `DB` 当成已确认的生产数据库。

```sh
git status -sb
git fetch origin
git rev-parse origin/main
git rev-parse origin/codex/selfhost-zh-cn
pnpm exec wrangler whoami
```

对照待发布差异：

- UI 或文案变更：通常可以仅回退 Worker 版本，不回退数据。
- 数据库迁移、数据写入逻辑：核对线上 `d1_migrations` 与待发布 `drizzle/sqlite/`。数据库结构变更需要单独确认兼容性、执行顺序及恢复点，不能只凭前端测试通过发布。
- Durable Object 类迁移、绑定替换/删除、资源重建：先另定迁移及恢复方案；旧版本可能无法直接回滚。
- Access、OAuth、域名或密钥变化：列明变化及恢复办法，不能把它们算作代码回滚的一部分。

确认没有未完成的审计、排名检查或其他后台任务。需要数据一致性时安排维护窗口、停止新任务和写入；按已验证的方式暂停调度，先记录原设置。D1、R2、KV 的分别导出不构成跨存储的原子快照。

## 3. 备份及恢复校验

每次新建一个私有发布目录，目录权限 `700`，包含数据或配置的文件权限 `600`。不要覆盖上一次可用备份，也不要把 SQL、对象数据、密钥或 Alchemy state 加入 Git。至少留存发布前备份和发布后观察记录；已含凭证的备份按凭证资料保管。

| 对象           | 必须留存                                                                                            | 怎么确认备份可用                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| D1             | 数据库 ID、当前 Time Travel bookmark、完整 SQL 导出、迁移清单、关键表计数                           | SQL 导入一个本地空 SQLite，`PRAGMA integrity_check` 为 `ok`，核对表数、业务表计数、迁移尾项 |
| R2             | 所有对象的完整分页清单、原始字节、key、大小、ETag、HTTP/custom metadata                             | 对象数及总大小一致；每个文件 SHA-256；再列一次目录确认备份期间未变化                        |
| KV 与 OAUTH_KV | namespace ID、完整分页 key 清单、原始值、metadata、绝对过期时间                                     | 按 key 保存校验和；空 namespace 也记录为零，不能遗漏 OAuth namespace                        |
| 两个 Worker    | 当前部署的全部 version/流量比例、版本详情、配置/绑定、可下载的部署代码、调度                        | 当前 100% 流量版本可在版本列表查到；不要误用列表中“最新上传但未部署”的版本                  |
| Alchemy        | `open-seo/selfhost` 全部资源 state、stack output、原始 `.env.selfhost`、依赖锁文件、源码 Git bundle | 能对应线上资源 ID；核对 state 与线上变量；在私有发布记录中标注恢复依赖                      |
| Access/OAuth   | 应用 ID/AUD、全部 destinations、关联策略及邮箱白名单、Managed OAuth/DCR/localhost 设置              | 发布前后逐项比较，而非只比应用名称                                                          |
| 域名           | Worker custom-domain 绑定、zone ID、相关 DNS 记录、Access 对该域名的覆盖                            | 域名仍指向同一 Worker，两个入口都受原 Access 保护                                           |

D1 常用命令如下。`D1_ID` 必须从线上 Worker 的实际绑定和本次发布记录取得；操作目录/账号也要核对。

```sh
OPENSEO_RELEASE_DIR="<本次私有发布目录>"
D1_ID="<线上实际 D1 UUID>"

pnpm exec wrangler d1 time-travel info "$D1_ID" --json \
  > "$OPENSEO_RELEASE_DIR/d1-bookmark-before.json"
pnpm exec wrangler d1 export "$D1_ID" --remote \
  --output "$OPENSEO_RELEASE_DIR/d1-before.sql"

pnpm exec wrangler deployments list --name open-seo-selfhost
pnpm exec wrangler deployments list --name open-seo-selfhost-audit
```

R2/KV 批量备份需使用已授权的 API/S3 工具，完整处理分页；单独执行一次 `r2 object get` 不算整个 bucket 的备份。逐个 R2 对象下载可以使用已核对 key 的命令：

```sh
pnpm exec wrangler r2 object get "open-seo-r2-selfhost/<完整 key>" \
  --remote --file "<本地备份文件>"
```

Cloudflare 不返回已有 secret 的明文。运行密钥需从 `.env.selfhost`、已授权的密钥保管处或 Alchemy 保存的 resolved state 保留；只有 secret 名称清单不能重建配置。不要为了备份轮换或创建新的密钥。

Durable Object 的内部数据没有被 D1 SQL 或 Worker version 备份覆盖。保留原 namespace ID 不等于已导出其中的数据。有会话等持久数据时，需要另行采用应用支持的导出/恢复方式；没有可验证方案时，不执行涉及这些数据或类生命周期的迁移。临时工作流进度也不是通用可恢复快照。

D1 Time Travel 自动启用；当前文档的保留期为 Free 7 天、Paid 30 天。书签不是永久备份，长期保留仍靠 SQL 导出。参考：[D1 Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/)。

## 4. 用准确版本重新构建并发布

### 发布前预演

在准备发布的确切提交上安装锁定依赖，使用原 `.env.selfhost`，构建并检查资源计划：

```sh
pnpm install --frozen-lockfile
pnpm ci:check
pnpm test:ci
pnpm build:report-widgets
pnpm exec vite build --mode selfhost
pnpm alchemy plan deploy/alchemy/alchemy.run.ts \
  --env-file .env.selfhost --stage selfhost
```

核对计划没有意外 create/delete/replace；D1、KV、R2、Access 与域名没有不在本次范围的变化。仅 UI 发布应继续使用原资源，不重新初始化数据库。

部署脚本会重新同步 Worker 的变量和密钥。只在控制台手动设置、却不在部署配置里的值可能被覆盖；发布前先查清差异。Access 由 Alchemy 管理时，不要临时改成“手工管理”来绕过检查：移除受管资源可能触发资源删除。

自有域名须继续保留 `.env.selfhost` 中的 `SELFHOST_DOMAIN`。保留原 Access audience、workers.dev 与自有域名两个 destinations、邮箱策略和 Managed OAuth。

### 合并与部署

备份校验通过、自动部署状态确认后，再把已验收的开发分支合并 main。遵守仓库现有合并规则，不强推、不覆盖他人的提交。

- **已有正确的自动部署**：由 main push 触发；检查构建使用的 SHA、部署命令和最终目标 Worker。等待该次构建完成，不叠加手动部署。
- **未接自动部署**：在合并后的准确 main SHA 上，从本机执行：

```sh
pnpm deploy:selfhost --yes
```

该命令会重新构建报告组件和自托管前端/服务端、检查类型，再由 Alchemy 同步资源、迁移并发布需要更新的 Worker。它不是在旧产物上点一次刷新。保留完整发布日志并核对最终 Worker version。

本实例不使用 `pnpm deploy`、`deploy:postgres` 或上游 `Deploy production` 来发布，也不执行 `alchemy destroy`。不要用部署按钮重新创建一套资源。

## 5. 发布后验收与观察

记录 main SHA、部署时间、新旧两个 Worker version，以及资源计划/实际变化。

1. 主 Worker 最新部署的 100% 流量指向预期新版本；审计 Worker 如未变更，记录保持原版本。
2. 自有域名与 workers.dev 的未登录访问仍被原 Access 拦截；已授权用户能正常登录。受 Access 保护的 `/api/health`，未登录得到重定向或 401 不能算健康检查成功。
3. 登录后 `/api/health` 的应用/数据库检查正常，原项目及已有数据可读。
4. 设置页切换简体中文/English、刷新及跨页后语言正确；关键词、排名、审计等主要界面无异常。查看既有数据即可，不为发布验收启动收费的关键词查询或审计任务。
5. 发布前后比对 D1 UUID、R2 bucket、KV/DO namespace、workflow/service 目标、域名、Access AUD/策略/OAuth 设置。业务数据计数没有无法解释的减少。
6. 检查主/审计 Worker 日志或 Observability，关注新出现的 5xx、异常、数据库错误和资源绑定错误；至少观察 15 分钟，并在下一次原有调度之后补查后台任务。

任一核心入口不可用、数据不可读、Access 被放开或关键设置丢失，按下面对应路径处理，不反复盲目重建。

## 6. 故障回滚

### A. 页面、语言或普通代码问题：只回退代码

先停止后续部署/合并，确认没有并行自动构建会把坏版本再次覆盖回来。将流量恢复到本次发布前记录的正常版本：

```sh
APP_GOOD_VERSION="<本次发布前主 Worker 的完整 version UUID>"
pnpm exec wrangler rollback "$APP_GOOD_VERSION" \
  --name open-seo-selfhost --message "Rollback: <故障简述>"
```

如果审计 Worker 也发生了更新，使用其独立的旧版本记录，按预先确认的接口兼容顺序恢复。仅主 Worker 更新时无需回退审计 Worker。

回滚后再查当前部署流量、登录、健康接口、数据和日志。**不要因为界面故障恢复 D1 或覆盖 R2。** Worker version 记录代码、静态资源、绑定及兼容配置；它不恢复 D1、R2、KV 或 Durable Object 的数据，也不恢复 Access/DNS 的账户级设置。

保留故障版本和日志，修复后正常提交，再做一次完整发布。回滚成功后若 Alchemy state 仍记录坏版本，下一次 `plan` 必须核对这个漂移；不要直接把整份旧 state 强行写回，也不要马上重跑原来的坏提交。

Cloudflare 仅允许回退最近 100 个已发布版本。DO 类生命周期迁移、删除依赖资源等可能阻止回滚；若 API 拒绝，不要使用 force/destroy 重建，应采用兼容的前向修复。参考：[Workers 回滚与限制](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)。

### B. 数据确实损坏：先保全当前状态，再决定恢复点

这是独立于代码回滚的操作，需要负责人确认恢复时间及可能损失的发布后写入。

1. 记录故障现象和受影响表/对象；停止写入和后台调度，保留其原配置。
2. 再导出当前 D1、取得当前 bookmark，备份当前相关 R2/KV，避免恢复后失去调查或撤回机会。
3. 确认应用代码与目标数据库 schema 兼容，并选择发布前 bookmark；需要时先验证 SQL 导出能恢复到一个隔离环境。
4. 经确认后执行原库 Time Travel：

```sh
pnpm exec wrangler d1 time-travel restore "$D1_ID" \
  --bookmark "<已确认的发布前 bookmark>"
```

该命令会覆盖整库并中断在途查询；恢复点之后的写入可能丢失。保存它返回的“恢复之前 bookmark”，必要时可撤回这次恢复。不要在现有有数据的库上直接执行全量 SQL 导入当作替代。

5. 检查完整性、迁移表、关键业务行及跨表引用。R2 若需恢复，按备份 manifest 恢复必要对象和 metadata；新对象先保留，不做整桶删除。数据库里的对象引用必须能对应实际文件。
6. KV 按必要 key 恢复，保留 metadata 与原绝对过期时间，已过期项不复活。OAUTH_KV 涉及会话/令牌，不能为普通故障整体覆盖，必要时采用重新授权。
7. 两个 Worker、数据库与存储兼容性确认后恢复调度，重新走发布后验收，记录不可恢复项及实际数据影响。

### C. Access、OAuth、域名或配置丢失

从本次备份对比并恢复受影响的具体配置。保留现有 Access 应用 ID/AUD、原邮箱白名单、策略顺序、两个 destinations、Managed OAuth 的 DCR 与 loopback 设置；不要新建替代应用使 audience 改变。

密钥从原安全来源恢复，不在命令行参数、公开日志或文档中填写明文。若涉及泄漏，改走密钥轮换流程，而不是恢复已经泄漏的值。域名只恢复本实例受影响的绑定/记录，不覆盖整个 zone。

## 7. 发布记录及收尾

私有发布目录至少包含：

- 准确 Git SHA、main 合并结果、自动构建是否接通的证据、构建及部署日志。
- 发布前后 Worker deployment/version/资源 ID；D1 bookmark、SQL、恢复校验和；R2/KV manifest 与对象校验和。
- 原环境配置、Alchemy state、Access/OAuth/域名配置；不能备份的项目及原因。
- 验收结果、观察期状态；如回滚，记录触发原因、使用的版本/书签和恢复后的验证。

检查文件权限和 SHA-256 清单，确认备份未入 Git。源码的未提交改动保持原样；不清理或删除与本轮无关的材料。只有全部必要验收完成，才把本次发布记录标为成功。
