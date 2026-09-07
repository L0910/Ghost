# NOTICE

> 开源个人博客系统二次开发项目
> 基于 Ghost 开源项目进行二次开发

## 上游项目

### Ghost
- 项目名称：Ghost
- 项目地址：https://github.com/TryGhost/Ghost
- 项目官网：https://ghost.org
- 许可证：MIT License
- 版权所有：Copyright (c) 2013-2026 Ghost Foundation

### Ghost 默认主题（开发参考）
- 主题名称：Casper
- 项目地址：https://github.com/TryGhost/Casper
- 许可证：MIT License

## 本人开发内容

以下内容为本项目作者（L0910）在实验过程中独立开发：

### 自定义主题 oss-blog-theme
- 主题目录：theme/oss-blog-theme/
- 包含文件：
  - default.hbs - 默认布局模板（含搜索弹窗）
  - index.hbs - 首页模板（含文章列表和最近文章）
  - post.hbs - 文章详情页模板（含相关推荐引入）
  - tag.hbs - 标签页模板
  - author.hbs - 作者页模板
  - error.hbs - 404错误页模板
  - partials/related-posts.hbs - 相关文章推荐模块（自主功能）
  - partials/pagination.hbs - 分页模板
  - assets/css/custom.css - 自定义样式
  - assets/js/custom.js - 自定义脚本（含搜索、目录、回到顶部）
  - assets/js/search-highlight.js - 搜索高亮模块（自主功能）
  - package.json - 主题元数据和配置

### 自主扩展功能

1. 相关文章推荐
   - 文件：theme/oss-blog-theme/partials/related-posts.hbs
   - 功能：基于文章标签匹配相关文章，提升内容发现
   - 实现：Handlebars partial + Ghost {{#get}}助手

2. 搜索高亮与导航
   - 文件：theme/oss-blog-theme/assets/js/search-highlight.js
   - 功能：URL关键词高亮、匹配导航、无结果提示
   - 实现：纯前端JavaScript，不依赖后端

### 文档与测试
- README.md - 项目说明文档
- docs/baseline.md - 实验基线记录
- docs/architecture.md - 项目架构说明
- docs/experiment-report.md - 实验报告
- docs/demo-script.md - 课堂演示脚本
- tests/acceptance.md - 验收测试用例（18项）
- tests/test-cases.md - 功能测试详细记录

## 第三方资源声明

本项目未使用以下外部资源：
- 外部图片资源（所有图标使用内联SVG）
- 外部字体（使用系统默认字体栈）
- 外部JavaScript库（原生JS实现）
- 外部CSS框架（自定义CSS）
- 外部API服务（搜索使用Ghost原生Content API）

## 许可证

本项目整体采用 MIT License，与上游Ghost项目保持一致。

MIT License

Copyright (c) 2026 L0910

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 上游MIT许可证全文

Ghost项目的MIT许可证见根目录 LICENSE 文件。

## 致谢

感谢 Ghost Foundation 开发并维护了优秀的 Ghost 开源博客系统，为本实验提供了成熟的基线项目。
