# NLP Journey

一个面向 NLP、LLM 与 AI 系统工程的公开研究笔记站点。内容聚焦模型理解、生产部署、评估方法和产品实验，优先记录可复现的过程、结果与后续迭代。

## 本地运行

```bash
yarn install
yarn dev
```

开发服务器默认运行在 `http://localhost:3000`。

## 内容维护

- 在 `data/blog/` 新建 MDX 文件，并使用 frontmatter 提供 `title`、`date`、`tags`、`summary` 与作者信息。
- 文章标题仅写在 frontmatter 的 `title` 中；文章正文从首段或二级标题开始，避免产生重复 H1。
- 仅发布真实研究、工程实践与实验记录。尚未准备好的内容请设为 `draft: true`，不要使用示例文章填充栏目。
- 能力域使用 `data/siteConfig.ts` 中定义的 `domains` 标识；未匹配内容的能力页会显示“正在整理中”。
- 图片放入 `public/static/images/`，并在文章 frontmatter 或正文中使用以 `/static/images/` 开头的路径。

## 验证与构建

```bash
yarn build
```

生产构建会重新生成主题索引和本地搜索数据。提交前请确认博客、主题索引、首页和能力域页面只展示真实内容。
