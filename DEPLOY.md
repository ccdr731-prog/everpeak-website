# EverPeak 网站发布教程（GitHub + Vercel）

本项目是 Vite + React 纯静态网站，发布流程：**本地代码 → GitHub 仓库 → Vercel 自动构建部署**。

---

## 第一步：本地初始化 Git（已帮你做好一半）

如果你还没有执行，先在项目目录执行：

```bash
cd /Users/zero/Desktop/everpeak-website
git init
```

> 项目已包含 `.gitignore`，会自动忽略 `node_modules`、`dist`、`.DS_Store` 等不需要上传的文件。

## 第二步：在 GitHub 创建仓库

1. 打开 https://github.com/new （需先登录 GitHub）
2. 填写：
   - **Repository name**：`everpeak-website`（或你喜欢的名字）
   - **Private / Public**：随意（Public 则网站源码公开可见）
3. 点击 **Create repository**
4. **不要**勾选 "Add a README / .gitignore / license"（避免冲突），保持空仓库

## 第三步：本地提交并推送

在终端执行（把 `YOUR_USERNAME` 换成你的 GitHub 用户名）：

```bash
cd /Users/zero/Desktop/everpeak-website
git add .
git commit -m "Initial commit: EverPeak website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/everpeak-website.git
git push -u origin main
```

> 如果提示要登录，GitHub 会弹出浏览器授权窗口，确认即可。

## 第四步：在 Vercel 创建项目并部署

1. 打开 https://vercel.com/new （用 **GitHub 账号**登录）
2. 点击 **Import** 你刚推送的 `everpeak-website` 仓库
3. Vercel 会自动识别为 **Vite** 项目，保持默认即可：
   - Framework Preset：`Vite`
   - Build Command：`npm run build`
   - Output Directory：`dist`
4. 点击 **Deploy**
5. 等待约 1 分钟，部署完成后会得到网址，例如：
   - `https://everpeak-website.vercel.app`

✅ 到这里网站就已经上线了！

## 第五步（可选）：绑定自定义域名

1. 在 Vercel 项目页进入 **Settings → Domains**
2. 输入你的域名，如 `everpeak-energy.com`
3. 按 Vercel 提示，在你的域名服务商（阿里云 / GoDaddy / Cloudflare 等）添加 DNS 记录（通常是 `A` 记录指向 `76.76.21.21`，或 `CNAME` 指向 `cname.vercel-dns.com`）
4. 等 DNS 生效（几分钟到几小时），即可用 `https://everpeak-energy.com` 访问

## 以后怎么更新网站？

每次改完代码，只需：

```bash
git add .
git commit -m "更新内容"
git push
```

Vercel 检测到推送后会自动重新构建并上线，无需手动操作。

## 常见问题

- **预览地址打不开？** 等待部署完成（Production 状态显示 Ready 后再访问）。
- **图片不显示？** 确认 `public/` 下的图片文件名与代码引用一致（`/blade.jpg` 等）。
- **想部署到子路径（如 GitHub Pages）？** 需要修改 `vite.config.js` 的 `base` 配置，可联系我处理。

---

## 附录：腾讯云 DNSPod 绑定自定义域名（energyblock.cn）

### 1. 进入 DNSPod 解析管理

1. 打开 https://console.dnspod.cn/dns/list 并登录
2. 在「我的域名」列表中找到 `energyblock.cn`
3. 点击右侧的「解析」按钮进入记录管理页

### 2. 删除冲突的旧记录

在记录列表中找到以下 **3 条 A 记录**，逐条点击右侧「删除」：

| 类型 | 主机记录 | 记录值 |
|---|---|---|
| A | www | 43.153.254.91 |
| A | www | 43.163.180.183 |
| A | www | 43.153.249.198 |

> 这些是腾讯云服务器/CDN 的旧 IP，与 Vercel 冲突，必须删掉。

### 3. 添加 Vercel 的 CNAME 记录

点击「添加记录」，填写：

| 字段 | 值 |
|---|---|
| 记录类型 | CNAME |
| 主机记录 | www |
| 记录值 | `d84756147c08c904.vercel-dns.com` |
| 其他 | 保持默认（TTL 600） |

点击「保存」。

### 4.（可选）绑定根域名 energyblock.cn

如果需要不带 `www` 的域名也能访问，再添加一条：

| 字段 | 值 |
|---|---|
| 记录类型 | A |
| 主机记录 | @ |
| 记录值 | `216.198.79.10` |

### 5. 等待生效并刷新 Vercel

1. DNSPod 的 TTL 默认 600 秒，保存后等 **10 分钟～几小时**
2. 回到 Vercel → Settings → Domains → `www.energyblock.cn` → 点 **Refresh**
3. 状态从 `Invalid Configuration` 变为绿色 `Valid Configuration` 即成功

### 备注

- 若 DNSPod 提示记录值不能以 `.` 结尾，去掉 Vercel 显示末尾的点即可
- 主机记录 `@` 表示根域名，`www` 表示 www 前缀
- 如果 DNSPod 里找不到该域名，说明域名 NS 服务器不在 DNSPod，需先到注册商把 NS 改为 DNSPod 的 `f1g1ns1.dnspod.net` / `f1g1ns2.dnspod.net`
