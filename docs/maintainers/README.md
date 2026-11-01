# Maintainer documentation

Shared, versioned documentation for people maintaining OpenSEO. Put engineering decisions, development workflows, and useful maintenance notes here.

User-facing documentation belongs in the rest of `docs/` or `web/content/docs/`. This directory is not published to the documentation site, but its contents are tracked in the repository and must not contain secrets.

`review-guidelines.md` is the shared context for code reviewers, human and agent: hard invariants plus the false-positive controls that keep reviewers from flagging intentional behavior.

Create documents when they will help future maintenance or when explicitly requested. Keep task status, PR review notes, and validation results in the PR description. Log repository friction in `.agents/PAPERCUTS.md`.

## openseo.willship.dev 日常维护

从 [自托管发布与故障回滚 SOP](./selfhost-release-runbook.zh-CN.md) 的“日常从这里开始”进入：更新源码、备份校验、手动发布、验收及故障处理都在同一份文档中。该实例采用本机 `pnpm deploy:selfhost --yes` 发布；合并 main 后仍需手动部署。私有发布记录及长期交接要求见该文档附录 A 和第 8 节。

## 上游同步后的界面文案

合并上游后，按[简中界面文案维护](./simplified-chinese-copy.md)检查新增文案、补齐简中翻译，并运行既有语言切换验收。Git 没有冲突不代表简中文案完整。
