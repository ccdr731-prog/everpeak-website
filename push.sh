#!/bin/bash
# 一键推送脚本：本地修改 → 提交 → 推送到 GitHub → Vercel 自动部署
cd "$(dirname "$0")"

git add .
git commit -m "update $(date '+%Y-%m-%d %H:%M')" || echo "（没有需要提交的更改）"
git push

echo "✅ 已推送，Vercel 正在自动部署..."
