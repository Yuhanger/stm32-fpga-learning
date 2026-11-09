# STM32 × FPGA 学习工作台
网址：https://github.com/Yuhanger/stm32-fpga-learning
原 Site 的完整源码导出，以及可独立部署的 GitHub Pages 静态版。

## 使用

- 8 个 STM32 标准外设库主线项目 + 5 个 FPGA 支线项目。
- 调整顺序、任务拆分、进度勾选、学习笔记、项目编辑与自定义项目。
- 3 个进阶模板：FreeRTOS、SD 卡记录、STM32 × FPGA 数据通路。
- 保留原版页面样式。HAL 不作为必学框架。

## 目录

- `src/`：GitHub Pages 版 React 应用；`storage.mjs` 为浏览器持久化与备份校验。
- `original-site/`：原 Site 全部 119 个 Git 跟踪源码文件，包含原服务端、数据库结构、迁移、锁文件、样式和项目数据。未包含依赖目录、构建产物、凭据或运行时数据库。
- `.github/workflows/pages.yml`：main 分支提交后自动测试、构建并部署 Pages。
- `tests/`：持久化和备份导入测试。

## 数据持久化说明

原 Site 的 `/api/state` 使用 Cloudflare D1，GitHub Pages 无法运行这类服务端 API。Pages 版使用 localStorage（键 `yuhang-embedded-lab:v1`），记录只保存于当前浏览器、当前站点，不会上传到仓库。清理浏览器数据或更换设备不会自动保留记录，请定期导出 JSON；可在另一设备导入。

导入兼容原 Site 导出的 JSON 数组以及 `{data, revision}` 格式，会询问是否替换当前记录；导出建议先做备份。相同浏览器多个标签页同时编辑时会提示冲突，避免静默覆盖。

2026-11-09 迁移时只读检查原 Site 的生产 `/api/state`：`data: null, revision: 0`，没有用户写入的笔记、进度或排序需要迁移。13 个初始项目与 3 个进阶模板均保留。预览测试记录未迁入。

如果需要多设备实时同步，需要另行部署带身份认证的后端（如 Cloudflare Worker + D1）。原后端源码已保留，但不能直接以公共 API 部署：原版依赖 Sites 的私有访问控制，独立部署必须补充认证与用户数据隔离。不要在公开前端放 API 密钥或 GitHub token。

## 本地开发

```sh
npm ci
npm test
npm run dev
npm run build
```

Node.js 22.13 或更新版本。Vite base 为 `/stm32-fpga-learning/`。GitHub Pages 地址在 Actions 部署成功后的环境输出中显示。

首次部署若 configure-pages 提示无权启用 Pages，请在仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions，再重新运行 Deploy GitHub Pages。

原 Site 保持独立，未覆盖、未删除、未改变访问权限。`original-site/.openai/hosting.json` 为来源快照，不应拿来部署或覆盖原 Site。
