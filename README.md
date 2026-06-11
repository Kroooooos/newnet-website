# NEWNET TECHNOLOGY 官网

纯静态网站（HTML / CSS / JS），无构建工具，中英双语切换。

## 目录结构

```
index.html          页面结构（文案通过 data-i18n 属性绑定）
css/style.css       全部样式（颜色变量在文件顶部 :root 中）
js/i18n.js          中英文案字典（改文案只需改这个文件）
js/main.js          语言切换、导航、滚动动画、数字计数
assets/img/         图片素材（来自公司 Profile PDF）
deploy/nginx.conf   阿里云 nginx 端口配置
```

## 本地预览

VS Code 安装 Live Server 扩展后右键 index.html → Open with Live Server；
或在项目目录执行：

```
python3 -m http.server 8080
```

浏览器访问 http://localhost:8080

## 修改文案

所有中英文文案集中在 `js/i18n.js`，按 key 对应修改即可，无需改动 HTML。
新增文案：在 HTML 元素上加 `data-i18n="你的key"`，并在 zh / en 两个字典中补充该 key。

## 部署到阿里云 ECS

1. 上传文件：`scp -r ./* root@服务器IP:/var/www/newnet/`
2. 配置 nginx：将 `deploy/nginx.conf` 复制到 `/etc/nginx/conf.d/newnet.conf`，按注释修改域名
3. 重载：`nginx -t && systemctl reload nginx`
4. 阿里云控制台安全组放行 80 端口（启用 HTTPS 后放行 443）
