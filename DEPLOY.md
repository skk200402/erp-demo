# 部署到 GitHub Pages

这个站点是**纯静态**的（无构建、无依赖、hash 路由），所以部署只需要把文件传上去，再开一下 Pages。

预计 3 分钟，下面两种方式选一种。

---

## 方式 A：网页上传（不用装 git，最省事）

1. 打开 https://github.com/new ，仓库名填 `erp-demo`，可见性选 **Public**，点 **Create repository**。

   > 想直接用 `https://<你的用户名>.github.io/` 根地址访问，仓库名要写成 `<你的用户名>.github.io`；否则地址是 `https://<你的用户名>.github.io/erp-demo/`。

2. 在仓库页点 **Add file → Upload files**，把本目录下的这些内容拖进去：

   - `index.html`
   - `assets/`（整个文件夹）
   - `screenshots/`（可选，README 里引用了）
   - `README.md`
   - `DEPLOY.md`

   然后点 **Commit changes**。

3. 进入仓库 **Settings → Pages**：

   - **Source** 选 `Deploy from a branch`
   - **Branch** 选 `main`，目录选 `/ (root)`
   - 点 **Save**

4. 等 1-2 分钟，访问：

   ```
   https://<你的用户名>.github.io/erp-demo/
   ```

`index.html` 会自动作为首页，`assets/` 是相对路径，不需要改任何配置。

---

## 方式 B：命令行（已安装 git）

在 `erp-demo` 目录下执行（把 `<你的用户名>` 和仓库名换成自己的）：

```bash
git init -b main
git add .
git commit -m "feat: 电商 ERP 前端演示站"
git remote add origin https://github.com/<你的用户名>/erp-demo.git
git push -u origin main
```

推送后同样到 **Settings → Pages** 选 `main` / `/ (root)` → Save。

---

## 常见问题

**Q：页面打开是 404？**
确认 Settings → Pages 里已经 Save 且分支选的是 `main`；首次部署要等 1-2 分钟，可在 **Actions** 标签页看进度。

**Q：样式没加载 / 白屏？**
说明文件没传全，检查仓库根目录下是否有 `index.html` 和 `assets/styles.css`（注意别多套一层文件夹）。

**Q：仓库能设为 Private 吗？**
免费账号的 Pages 只对 Public 仓库开放；Private 仓库需要 GitHub Pro。

**Q：能绑自己的域名吗？**
Settings → Pages → **Custom domain** 填域名，然后按提示在 DNS 加一条 CNAME 记录。

**Q：为什么不需要配置 404 回退？**
路由用的是 URL hash（`#/orders`），请求路径始终是根目录，不存在服务端路由。这是静态托管最省心的做法。

---

## 其它可选部署方式

| 平台 | 做法 |
| --- | --- |
| Vercel | 拖入项目目录，Framework 选 Other，Build 留空 |
| Netlify | 把文件夹拖到 https://app.netlify.com/drop ，立刻出地址 |
| 对象存储（OSS/COS） | 上传后开启「静态网站托管」，默认首页设为 `index.html` |
| Nginx | `root` 指向本目录，`index index.html;` 即可 |
