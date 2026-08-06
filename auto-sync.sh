#!/bin/bash
# 自动同步脚本：每 5 秒检测源码变化 → 自动提交并推送到 GitHub（Vercel 会自动重新部署）
cd "$(dirname "$0")"

WATCH_PATHS="src public index.html package.json package-lock.json vite.config.js tailwind.config.js postcss.config.js"

echo "🚀 自动同步已启动（每 5 秒检测一次）"
echo "   监控范围：$WATCH_PATHS"
echo "   按 Ctrl+C 停止"

while true; do
  sleep 5
  CHANGED=$(git status --porcelain -- $WATCH_PATHS 2>/dev/null)
  if [ -n "$CHANGED" ]; then
    git add -A -- $WATCH_PATHS 2>/dev/null
    if ! git diff --cached --quiet 2>/dev/null; then
      git commit -m "auto-sync $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1
      git push origin main >/dev/null 2>&1
      echo "📤 $(date '+%H:%M:%S') 检测到更新，已自动同步到 GitHub"
    fi
  fi
done
