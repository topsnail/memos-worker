# 在线留言板

一个基于 Cloudflare Workers 和 D1 数据库的现代化在线留言板应用，具有美观的毛玻璃效果界面和完整的留言回复功能。

## ✨ 功能特性

- 💬 **留言功能** - 用户可以发布留言，支持邮箱验证
- 💭 **回复功能** - 支持对留言进行回复，形成对话树
- 👤 **自动生成头像** - 基于邮箱自动生成唯一头像，每个用户都有独特的头像和颜色
- 🎨 **现代化 UI** - 毛玻璃效果、动态渐变背景、响应式设计
- 📱 **移动端适配** - 完美支持手机和平板设备
- 🔐 **管理后台** - 管理员可以管理留言和回复
- 🏷️ **管理员标记** - 可以标记管理员回复，突出显示
- ⚡ **高性能** - 基于 Cloudflare Workers 边缘计算，全球低延迟

## 🛠️ 技术栈

- **后端**: Cloudflare Workers
- **数据库**: Cloudflare D1 (SQLite)
- **前端**: HTML + JavaScript + Tailwind CSS
- **头像服务**: UI Avatars（自动生成）

## 📋 前置要求

- Cloudflare 账号
- Cloudflare D1 数据库已创建并初始化

## 🚀 部署说明

### 1. 配置环境变量

在 Cloudflare Dashboard 中设置以下环境变量：

- `ADMIN_PASSWORD`: 管理员后台登录密码

### 2. 部署到 Cloudflare

使用 Wrangler CLI 部署到生产环境：

```bash
npm run deploy
```

或直接使用：

```bash
wrangler deploy
```

## 📁 项目结构

```
web-message-main/
├── index.html          # 前端页面
├── src/
│   └── index.js        # Cloudflare Workers 后端代码
├── schema.sql          # 数据库表结构（参考）
├── wrangler.toml       # Wrangler 生产环境配置
├── package.json        # 项目配置（仅部署脚本）
└── README.md          # 项目说明文档
```

## 🎯 API 接口

### 留言相关

- `GET /api/messages` - 获取所有主留言
- `POST /api/messages` - 创建新留言
- `GET /api/messages/:id/replies` - 获取某条留言的回复
- `POST /api/messages/:id/replies` - 创建回复

### 管理相关

- `POST /api/admin/login` - 管理员登录
- `GET /api/admin/messages` - 获取所有留言（管理用）
- `GET /api/admin/replies/all` - 获取所有回复（管理用）
- `PUT /api/admin/replies/:id/status` - 更新回复状态
- `DELETE /api/admin/messages/:id` - 删除留言或回复

## 🔧 配置说明

### wrangler.toml

主要配置项：

- `name`: Worker 名称
- `main`: 入口文件路径
- `compatibility_date`: 兼容性日期
- `d1_databases`: D1 数据库绑定配置

### 数据库结构

`messages` 表包含以下字段：

- `id`: 主键，自增
- `content`: 留言/回复内容
- `email`: 用户邮箱
- `parent_id`: 父留言ID（NULL表示主留言）
- `created_at`: 创建时间
- `is_approved`: 是否已审核
- `is_admin_reply`: 是否为管理员回复

## 📝 使用说明

### 用户端

1. 访问应用首页
2. 填写留言内容和邮箱地址
3. 点击"发送留言"提交
4. 可以点击"回复"按钮对其他留言进行回复

### 管理端

1. 访问 `/admin` 路径
2. 输入管理员密码登录
3. 可以查看、删除留言和回复
4. 可以标记/取消管理员回复

## 🎨 界面特性

- **动态渐变背景** - 20秒循环动画效果
- **毛玻璃效果** - 现代化的半透明容器设计
- **响应式布局** - 完美适配桌面和移动设备
- **自动生成头像** - 基于邮箱自动生成个性化头像

## 📦 部署脚本

- `npm run deploy` - 部署到 Cloudflare Workers 生产环境

## 🔒 安全特性

- XSS 防护 - HTML 转义处理
- 邮箱格式验证
- 内容长度限制（留言1000字符，回复500字符）
- 管理员密码保护

## 📄 许可证

MIT License

## 👤 作者

Tim

## 🙏 致谢

- Cloudflare Workers 提供边缘计算平台
- Tailwind CSS 提供样式框架
- UI Avatars 提供头像生成服务
