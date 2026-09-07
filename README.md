# 开源个人博客系统 - 二次开发实验

> 基于 [Ghost](https://github.com/TryGhost/Ghost) 开源博客系统的二次开发实验项目
> 课程：传统软件的开源设计与实现 | 实验01
> 作者：L0910 | 日期：2026-09-07

## 项目简介

本项目是在成熟开源项目 Ghost 基础上进行的二次开发实验，目标是交付一个**可注册、可写作、可评论、可搜索的个人博客系统**。

项目不修改Ghost核心代码，而是通过**自定义主题**和**前端扩展**的方式实现二次开发，既保留了上游升级能力，又实现了个性化需求。

## 功能清单

| 功能 | 状态 | 说明 |
|---|---|---|
| 会员注册/登录 | ✅ | Ghost原生会员系统 |
| 文章发布/编辑 | ✅ | Ghost原生编辑器 |
| 标签关联与浏览 | ✅ | 文章可关联多个标签 |
| 会员评论 | ✅ | 登录会员可评论，匿名可浏览 |
| 关键词搜索 | ✅ | 弹窗搜索，中文支持 |
| 自定义主题 | ✅ | oss-blog-theme v1.0.0 |
| 相关文章推荐 | ✅ | 自主扩展功能 |
| 搜索高亮与导航 | ✅ | 自主扩展功能 |
| 文章目录自动生成 | ✅ | 体验优化 |
| 响应式布局 | ✅ | 桌面/移动端适配 |
| 数据导出/备份 | ✅ | 管理端导出JSON |

## 技术栈

| 层级 | 技术 | 版本 |
|---|---|---|
| 运行时 | Node.js | 22 LTS |
| 博客平台 | Ghost | 5.x |
| 数据库 | SQLite | 3.x |
| 主题模板 | Handlebars | Ghost内置 |
| 前端样式 | CSS3 | 自定义 |
| 前端脚本 | 原生JavaScript | 无框架依赖 |
| 版本控制 | Git + GitHub | - |

## 系统架构

系统采用"核心不变，主题扩展"的架构策略：

- **Ghost核心**：负责认证、内容、标签、会员、评论等基础能力，不做修改
- **自定义主题**：负责页面展示、交互逻辑和自主扩展功能，是二次开发的主要边界
- **Content API**：主题通过Ghost内置助手和Content API访问内容数据
- **SQLite数据库**：持久化存储所有业务数据

详细架构说明见 [docs/architecture.md](docs/architecture.md)

## 环境要求

| 工具 | 最低版本 | 检查命令 |
|---|---|---|
| 操作系统 | Windows 10+ / macOS 10.15+ / Linux | - |
| Node.js | 22.x LTS | `node --version` |
| npm | 10.x | `npm --version` |
| Git | 2.40+ | `git --version` |
| Ghost CLI | 1.x | `ghost --version` |
| 可用端口 | 2368 | - |

## 安装与运行

### 1. 克隆仓库
```bash
git clone https://github.com/L0910/Ghost.git
cd Ghost
```

### 2. 安装Ghost本地实例
```bash
# 创建运行时目录（Ghost要求空目录）
mkdir runtime
cd runtime

# 安装Ghost本地实例
ghost install local

# 启动Ghost
ghost start
```

### 3. 访问系统
- 前台地址：http://localhost:2368
- 管理端地址：http://localhost:2368/ghost

首次访问管理端时，按照提示完成管理员账号初始化。

### 4. 安装自定义主题
```bash
# 进入主题目录
cd theme/oss-blog-theme

# 打包主题（Windows PowerShell）
Compress-Archive -Path * -DestinationPath ..\..\oss-blog-theme.zip

# 在Ghost管理端安装主题
# 设置 → 设计 → 更换主题 → 上传主题 → 选择zip文件 → 激活
```

### 5. 启停命令
```bash
# 启动
cd runtime
ghost start

# 停止
ghost stop

# 重启
ghost restart

# 查看状态和日志
ghost ls
ghost log
ghost doctor
```

## 演示数据

### 演示账号
| 角色 | 邮箱 | 密码 |
|---|---|---|
| 管理员 | admin@example.com | Admin@123456 |
| 会员A | member_a@example.com | Member@123456 |
| 会员B | member_b@example.com | Member@123456 |

> 注意：以上为演示账号，实际部署时请修改为强密码。

### 演示文章（8篇）
1. 开源软件入门：什么是开源？（标签：开源、教程）
2. Ghost博客系统安装与配置指南（标签：Ghost、教程）
3. 如何为Ghost开发自定义主题（标签：Ghost、开发、主题）
4. 深入理解Ghost Content API（标签：Ghost、开发、API）
5. 开源项目中的许可证选择指南（标签：开源、法律）
6. 个人博客SEO优化实战（标签：SEO、优化）
7. 代码块测试：JavaScript异步编程（标签：编程、JavaScript）
8. 中文搜索测试：开源博客系统二次开发实验（标签：实验、测试）

### 演示标签（3个）
- 开源（opensource）
- Ghost（ghost）
- 教程（tutorial）

## 二次开发内容

### 自定义主题 oss-blog-theme

与默认Casper主题的差异：

| 组件 | 上游基线 | 本项目自定义 |
|---|---|---|
| 导航栏 | 简单导航 | 搜索按钮、会员入口、滚动效果 |
| 文章卡片 | 基础列表 | 卡片式设计、标签角标、悬停动画 |
| 文章详情 | 基础排版 | 自动目录、作者卡片、相关推荐 |
| 搜索 | 无（需第三方） | 弹窗搜索、实时结果、热门标签 |
| 404页面 | 简单提示 | 友好提示、搜索入口、推荐文章 |
| 响应式 | 基础适配 | 完善的移动端适配 |
| 无障碍 | 基础 | 高对比模式、键盘导航、减少动画 |

### 自主扩展功能

#### 1. 相关文章推荐
- 位置：文章详情页底部
- 功能：基于当前文章主标签，推荐同标签下的其他文章
- 实现：Handlebars partial + Ghost {{#get}}助手
- 可配置：推荐数量（3/4/6篇）
- 用户价值：提升内容发现率和站点停留时间

#### 2. 搜索高亮与导航
- 位置：全站（URL带搜索参数时触发）
- 功能：高亮页面中匹配关键词的文本，提供上一个/下一个导航
- 实现：纯前端JavaScript，URL参数驱动
- 快捷键：F3/Ctrl+G下一个，Shift+F3上一个，ESC关闭
- 用户价值：从搜索结果进入文章后快速定位关键词位置

#### 3. 其他体验优化
- 文章目录（TOC）自动生成
- 回到顶部按钮
- 图片懒加载
- 导航栏滚动效果

## 测试

### 测试类型与结果

| 测试类别 | 用例数 | 通过 | 失败 | 通过率 |
|---|---|---|---|---|
| 功能测试 | 8 | 8 | 0 | 100% |
| 权限测试 | 4 | 4 | 0 | 100% |
| 主题/界面测试 | 4 | 4 | 0 | 100% |
| 恢复测试 | 2 | 2 | 0 | 100% |
| **合计** | **18** | **18** | **0** | **100%** |

详细测试用例见 [tests/acceptance.md](tests/acceptance.md)

### 主题兼容性检查
```bash
npx gscan theme/oss-blog-theme
```
结果：0错误，0警告。

## 项目结构

```
Ghost/
├── theme/oss-blog-theme/    # 自定义主题（本人开发）
│   ├── assets/
│   │   ├── css/custom.css    # 自定义样式
│   │   └── js/               # 自定义脚本
│   ├── partials/             # 局部模板
│   ├── default.hbs           # 默认布局
│   ├── index.hbs             # 首页
│   ├── post.hbs              # 文章详情
│   ├── tag.hbs               # 标签页
│   ├── author.hbs            # 作者页
│   ├── error.hbs             # 404页面
│   └── package.json          # 主题元数据
├── docs/                     # 实验文档
│   ├── baseline.md           # 基线记录
│   ├── architecture.md       # 架构说明
│   ├── experiment-report.md  # 实验报告
│   └── demo-script.md        # 演示脚本
├── tests/                    # 测试用例
│   ├── acceptance.md         # 验收测试用例
│   └── test-cases.md         # 功能测试记录
├── runtime/                  # Ghost运行时（不提交数据）
├── .env.example              # 环境配置示例
├── start.bat / stop.bat      # 一键启停脚本
├── README.md                 # 项目说明（本文件）
├── NOTICE.md                 # 许可证声明
└── LICENSE                   # MIT许可证
```

## Git与开源规范

### 分支策略
- `main`：主分支，保持可运行状态
- `feature/blog-enhancement`：功能开发分支

### 提交规范
采用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：
- `feat`：新功能
- `fix`：修复bug
- `docs`：文档更新
- `test`：测试相关
- `chore`：构建/工具

### 许可证
- 上游Ghost项目：MIT License
- 本项目自定义主题：MIT License（与上游兼容）
- 第三方资源：无外部图片/字体依赖，使用系统字体和内联SVG图标

详细许可证声明见 [NOTICE.md](NOTICE.md)

## 安全注意事项

- `.env` 文件包含敏感配置，已在 `.gitignore` 中排除，不要提交到Git
- 演示账号密码仅用于本地演示，实际部署时必须修改
- 生产环境建议使用强密码，启用HTTPS，定期备份数据
- 不要在前端代码中暴露Admin API密钥
- 数据备份：管理端"设置 → 实验室 → 导出内容"，或直接备份SQLite数据库文件

## 相关文档

- [实验报告](docs/experiment-report.md)
- [架构说明](docs/architecture.md)
- [基线记录](docs/baseline.md)
- [演示脚本](docs/demo-script.md)
- [验收测试用例](tests/acceptance.md)
- [许可证声明](NOTICE.md)
- [Ghost官方文档](https://ghost.org/docs/)
- [Ghost主题开发文档](https://ghost.org/docs/themes/)

## 许可证

Copyright (c) 2026 L0910 - Released under the [MIT license](LICENSE).

Ghost and the Ghost Logo are trademarks of Ghost Foundation Ltd.
