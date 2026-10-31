# OpenSEO 自托管发布与故障回滚 SOP

适用实例：`openseo.willship.dev`，主 Worker `open-seo-selfhost`，审计 Worker `open-seo-selfhost-audit`，Alchemy stack `open-seo` / stage `selfhost`。这份文档说明操作流程；每次实际执行的版本号、备份、时间和验收结果另存私有发布记录，不提交到 Git。

当前选择：保留 CLI 手动发布，不新增 GitHub 自动构建连接。每次更新按本 SOP 先备份、检查，再合并代码并执行 `pnpm deploy:selfhost --yes`。合并 main 不等于上线。改变为自动发布需要用户另行确认。

## 日常从这里开始

| 要做的事             | 操作入口                                           |
| -------------------- | -------------------------------------------------- |
| 更新线上版本         | 按下列六步执行，命令和检查标准见第 1–5 节          |
| 页面或代码出错       | 第 6A 节：回到本次发布前的 Worker 版本，再验收     |
| 怀疑数据损坏         | 第 6B 节：先保全现状，确认恢复点和数据损失后再恢复 |
| 登录、域名或配置出错 | 第 6C 节：比对本次私有备份，恢复具体配置           |
| 找上次发布证据及备份 | 附录 A；每次发布后更新私有记录索引                 |
| 换电脑或交接维护     | 第 8 节；仅拉取 Git 仓库不足以恢复这个实例         |

一次日常更新：

1. 更新源码，记录准备上线的提交，检查变更范围及 CI；保留已有未提交文件。
2. 核对账号、Alchemy 授权、原环境文件和线上资源；确认 Git 自动构建仍未连接。
3. 建立本次私有备份并验证可恢复；涉及结构或资源迁移时先确认方案。
4. 检查准确提交的构建与 Alchemy 计划，通过后更新本地 main，手动发布。
5. 核对版本、数据、登录后健康接口和主要页面，观察至少 15 分钟并检查原调度。
6. 保存私有记录，写清通过项、未验收项及回退点；有未完成项时保留“待验收”状态。

下次可直接委托：“按本 SOP 更新 openseo.willship.dev，先核对目标提交、备份和资源计划；涉及数据库结构、资源替换或权限策略变化时，把方案交给我确认。”这句话是后续任务的委托模板，本文件本身不授权执行线上变更。

## 1. 先确认 main 与线上之间的关系

GitHub 的 main 是源码分支；Cloudflare Worker version 是线上运行版本，两者不自动等同。

本实例采用本机手动发布。每次发布仍需只读核对以下两处，防止后来接入的自动构建与本机发布冲突；若发现触发器，先查明并确认发布方式，不自行启用、删除或修改连接：

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

`worker_tag` 是 Workers API 返回的不可变 tag，不是 Worker 名称。该读取接口接受 `Workers CI Read` 或 `Workers CI Write`。现有默认部署 OAuth 登录可能只有 `Workers Scripts` 等权限，能发布 Worker也不代表能读取 Builds；重新申请同一组默认 scopes 不会增加缺少的权限。

项目使用的 Alchemy CLI 提供更完整的自定义 OAuth scopes，可在默认选中项之外加上 `access:write`（维护原 Access 应用及策略）、`workers_builds:read`（查询构建配置）和 `dns_records:read`（读取 DNS 备份）：

```sh
pnpm alchemy login deploy/alchemy/alchemy.run.ts \
  --env-file .env.selfhost --configure
```

选择 OAuth，Customize OAuth scopes 选择 Yes，保留默认选项并勾选上述所需项，再完成打开页面中的授权。随后以实际 API 查询和部署预演验证。该命令需指定本仓库的 stack 文件；省略时会查找不存在的根目录 `alchemy.run.ts`。重新登录时不要把之前补过的 Access 权限丢掉。

也可使用限定当前账号、具备 `Workers CI Read` 的用户 API Token；需要查询实际 DNS 记录时，额外限定目标 zone 的 `DNS Read`。不要为此创建全权限令牌。令牌从安全环境或私有文件读取，不放进命令行参数、聊天或 Git。官方权限依据：[列出 Worker 构建触发器](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/list/)。

DNS 的公开解析可用 DNS-over-HTTPS 查询并保存，避免本机代理的 Fake-IP 被当成真实解析。公开 A/AAAA 结果不是控制台 DNS 记录的完整备份：它不包含 record ID、原始 CNAME 目标及代理设置。应与 Worker custom-domain 配置分开记录。

## 2. 发布准入检查

记录操作者、目标仓库/分支和准确 Git SHA，确认当前 Cloudflare 账号以及 Worker、D1、R2、KV 的实际 ID。不要把默认 Wrangler 配置中的 `DB` 当成已确认的生产数据库。

```sh
cd /Users/apple/Desktop/projects/open-seo
git status -sb
git remote get-url origin
git fetch origin
git rev-parse HEAD
git rev-parse origin/main
pnpm exec wrangler whoami
```

仓库应为 `https://github.com/zeos3154/open-seo.git`。目标是已合并 main 时，记录 `origin/main` 的完整 SHA；尚未合并时，另记录本次实际开发分支的 SHA，不沿用上次分支名。比较“上次实际部署 SHA”到“目标 SHA”的差异，不能只比较本地 main 与远端 main。

`wrangler whoami` 仅核对 Wrangler 的身份，不能证明 Alchemy 使用同一账号或具有全部权限。另核对 Alchemy 当前 profile/目标账号，并通过资源读取和第 4 节 `plan` 验证；授权不足时按第 1 节补齐，不每次重新登录。不输出 profile 的 token 或 resolved state 明文。

保留原 `.env.selfhost`；不要用 `deploy/.env.selfhost.example` 覆盖，它默认是 `AUTH_MODE=password`，与本实例的 Access 登录方式不同。核对 `AUTH_MODE=cloudflare_access`、`SELFHOST_DOMAIN=openseo.willship.dev`，并在私有环境中比较原密钥、白名单及资源配置。部署预检查只检查部分缺项，不能替代这些核对。

对照待发布差异：

- UI 或文案变更：通常可以仅回退 Worker 版本，不回退数据。
- 数据库迁移、数据写入逻辑：核对线上 `d1_migrations` 与待发布 `drizzle/sqlite/`。数据库结构变更需要单独确认兼容性、执行顺序及恢复点，不能只凭前端测试通过发布。
- Durable Object 类迁移、绑定替换/删除、资源重建：先另定迁移及恢复方案；旧版本可能无法直接回滚。
- Access、OAuth、域名或密钥变化：列明变化及恢复办法，不能把它们算作代码回滚的一部分。

确认没有未完成的审计、排名检查或其他后台任务。需要数据一致性时安排维护窗口、停止新任务和写入；按已验证的方式暂停调度，先记录原设置。D1、R2、KV 的分别导出不构成跨存储的原子快照。

## 3. 备份及恢复校验

每次新建一个私有发布目录，目录权限 `700`，包含数据或配置的文件权限 `600`。不要覆盖上一次可用备份，也不要把 SQL、对象数据、密钥或 Alchemy state 加入 Git。至少留存发布前备份和发布后观察记录；已含凭证的备份按凭证资料保管。

| 对象           | 必须留存                                                                                            | 怎么确认备份可用                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| D1             | 数据库 ID、当前 Time Travel bookmark、完整 SQL 导出、迁移清单、关键表计数                           | SQL 导入一个本地空 SQLite，`PRAGMA integrity_check` 为 `ok`，`PRAGMA foreign_key_check` 无结果，核对表数、业务表计数、迁移尾项 |
| R2             | 所有对象的完整分页清单、原始字节、key、大小、ETag、HTTP/custom metadata                             | 对象数及总大小一致；每个文件 SHA-256；再列一次目录确认备份期间未变化                                                           |
| KV 与 OAUTH_KV | namespace ID、完整分页 key 清单、原始值、metadata、绝对过期时间                                     | 按 key 保存校验和；空 namespace 也记录为零，不能遗漏 OAuth namespace                                                           |
| 两个 Worker    | 当前部署的全部 version/流量比例、版本详情、配置/绑定、可下载的部署代码、调度                        | 当前 100% 流量版本可在版本列表查到；不要误用列表中“最新上传但未部署”的版本                                                     |
| Alchemy        | `open-seo/selfhost` 全部资源 state、stack output、原始 `.env.selfhost`、依赖锁文件、源码 Git bundle | 能对应线上资源 ID；核对 state 与线上变量；在私有发布记录中标注恢复依赖                                                         |
| Access/OAuth   | 应用 ID/AUD、全部 destinations、关联策略及邮箱白名单、Managed OAuth/DCR/localhost 设置              | 发布前后逐项比较，而非只比应用名称                                                                                             |
| 域名           | Worker custom-domain 绑定、zone ID、相关 DNS 记录、Access 对该域名的覆盖                            | 域名仍指向同一 Worker，两个入口都受原 Access 保护                                                                              |

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

本地 SQL 校验只证明该导出可读取且结构、引用通过检查，不等于已完成线上整库恢复演练。R2/KV 文件校验也不能证明整套应用已恢复；完整演练应在隔离环境另行安排。

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

备份校验通过、自动部署状态确认后，再把已验收的开发分支按仓库规则合并 main。若源码此前已合并，也必须重新备份和检查线上实际版本。在已有明确发布授权的任务中，将本地 main 快进到已确认的目标提交：

```sh
git switch main
git pull --ff-only origin main
git rev-parse HEAD
git status --short
```

如果工作区改动阻止切换、分支已分叉，或拉取后 SHA 超出了已验收范围，先解决或重新验收，不使用 `reset --hard`、强推或清理文件。部署会使用当前目录内容，包括未提交源码；只允许已核对且不影响构建的无关改动留在工作区，不将它们纳入本次提交。必要时在独立 checkout 准备准确源码，并安全提供原环境和授权。

确认 HEAD 为本次已验收的准确 main SHA，且没有并行发布后，从本机执行：

```sh
pnpm deploy:selfhost --yes
```

该命令会重新构建报告组件和自托管前端/服务端、检查类型，再由 Alchemy 同步资源、迁移并发布需要更新的 Worker。它不是在旧产物上点一次刷新。保留完整发布日志并核对最终 Worker version。

本实例不使用 `pnpm deploy`、`deploy:prod`、`deploy:preview`、`everyapp install` 或上游 `Deploy production` 来发布，也不执行 `alchemy destroy`。不要用部署按钮重新创建一套资源。

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

检查文件权限和 SHA-256 清单，确认备份未入 Git。源码的未提交改动保持原样；不清理或删除与本轮无关的材料。只有全部必要验收完成，才把本次发布记录标为成功。线上登录后检查未做时，明确写“部署完成，线上登录验收待完成”，不要把 Access 的 401 当作应用健康证明。

## 8. 长期维护与交接

| 何时                       | 维护动作                                                                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 每次更新前                 | 按第 1–4 节核对源码、权限、原配置、备份与资源计划；记录实际目标 SHA                                                                             |
| 每次更新后                 | 按第 5、7 节验收并保存记录，更新私有“最近一次发布”索引；不要把固定旧版本当作永久回退点                                                          |
| 修改环境、密钥或绑定前     | 记录变更及恢复办法，备份当前配置；确保下次部署的配置来源同步，避免被 Alchemy 覆盖                                                               |
| 换电脑、交接或重做授权时   | 取得仓库与锁文件、原 `.env.selfhost`、备份解密资料、Alchemy profile/账号和 Cloudflare state store 访问权；先只读核对原 stack/stage/资源，再预演 |
| 定期检查（频率待用户确定） | 检查备份存放位置、权限、校验和与保留期限；在隔离环境验证恢复，查看线上错误和调度是否正常                                                        |

Alchemy 使用 Cloudflare state store，Git 和本地 `.alchemy/` 都不是全部状态。state store 不可访问、原资源与 state 对不上时，先调查恢复路径，不重新 bootstrap、adopt、destroy 或创建替代资源。

以下事项仍需用户参与或另行确认：

- 用户完成上次发布的线上登录验收：登录后健康接口、已有项目可读、语言切换及主要页面；维护 agent 只能在获得可用登录会话后代验收。
- 数据库结构或 DO 生命周期迁移、资源替换/删除、Access/OAuth/域名策略变化，以及改接自动构建：先确认具体影响与恢复方案。
- 数据恢复：确认恢复时间、停写窗口和可接受的发布后写入损失。
- 长期备份：确定私有加密副本的存放位置、保留周期和隔离恢复演练时间。上次本机备份已有校验，尚无已验证的异地副本或完整恢复演练证据；普通故障不以生产恢复代替演练。

## 附录 A：已有发布记录的定位

最近一次已知发布记录为 **2026-11-01 06:43（Asia/Taipei）**，源码 `7bb9245567bcc6a8349d6ae8481533f3de9ff529`。这是交接时的历史基线，本轮文档整理没有重新查询线上，也没有部署。

私有记录目录（仅本机路径，备份内容不入 Git）：

```text
/Users/apple/.codex/visualizations/2026/10/31/01a18f66-55f1-7110-816f-614f2ce099a0/selfhost-release/manual-20261101T063828/
```

先读 `README.md` 与 `release-result.json`；数据与配置位于 `backup/`，校验清单为 `backup/SHA256SUMS.json`。`rollback-app.sh` 只针对这次发布前的旧版本，未在生产执行回滚演练，后续发布不可直接复用。

该记录确认：Git 构建触发器为 0；主 Worker 发布后为 `d5d801c0-4eec-49d5-8aa7-6f6a1c98f47b`，此前为 `1ae5c007-b104-410a-a622-ae07a601bce0`；审计 Worker 保持 `d576b20d-8aa2-42f5-8761-90521da17195`。发布前后 54 张表、9 个 R2 对象和 15 项密钥哈希一致，15 分钟观察通过。线上登录后 UI 与健康接口验收仍待完成。

## 附录 B：维护时核对的源码入口

- `package.json` 的 `deploy:selfhost`：预检查、构建、类型检查、Alchemy 发布的实际顺序。
- `scripts/selfhost-deploy-preflight.mjs`：本机发布前的部分环境和授权检查。
- `deploy/alchemy/alchemy.run.ts`：`open-seo` stack、`selfhost` stage 的资源、D1 迁移、变量、密钥、绑定与调度。
- `deploy/alchemy/alchemy.access.ts`、`deploy/alchemy/alchemy.domains.ts`：Access 与自有域名逻辑。
- `wrangler.jsonc`：Alchemy 读取的兼容配置、调度、DO/workflow 声明；其默认资源配置不直接作为本实例发布目标。
- `.github/workflows/ci.yml`、`.github/workflows/deploy-production.yml`：CI 与上游托管版部署的边界。

部署脚本、权限或资源声明变动时，同步核对本 SOP。不要为手动发布重新加入 Git 自动构建的临时适配。
