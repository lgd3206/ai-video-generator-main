# 生产环境变量配置

在你的部署平台（如 Vercel、Netlify 等）上，请确保设置以下环境变量：

## 必需的环境变量

```env
# Replicate API配置
REPLICATE_API_TOKEN=your_replicate_api_token_here

# Google OAuth配置
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth配置
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-actual-domain.com

# Node环境
NODE_ENV=production
```

## 重要提醒

1. **NEXTAUTH_URL**：必须设置为你的实际部署域名，例如：
   - `https://your-app.vercel.app`
   - `https://your-domain.com`

2. **Google OAuth 重定向URI**：在 Google Cloud Console 中，确保已添加你的生产域名的重定向URI：
   - `https://your-actual-domain.com/api/auth/callback/google`

3. **环境变量检查**：部署后，可以通过以下API端点检查环境变量是否正确加载：
   - 访问：`https://your-domain.com/api/auth/providers`

## 常见问题

- 如果登录后跳转到空白页面，通常是 `NEXTAUTH_URL` 配置错误
- 如果Google登录失败，检查重定向URI配置
- 确保所有环境变量都在生产环境中正确设置