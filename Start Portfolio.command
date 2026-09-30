#!/bin/zsh
set -eu

portfolio_root="${0:A:h}"
portfolio_frontend="$portfolio_root/frontend"
portfolio_runtime="$HOME/.local/share/shani-portfolio/node-22.22.2/bin"
portfolio_url="http://127.0.0.1:5173"

if [[ -x "$portfolio_runtime/node" ]]; then
  export PATH="$portfolio_runtime:$PATH"
fi

if [[ ! -f "$portfolio_frontend/package.json" ]]; then
  print 'לא נמצאה תיקיית frontend לצד קובץ ההפעלה.'
  exit 1
fi
cd "$portfolio_frontend"

# Reopening the shortcut reuses this project's server without starting a second one.
portfolio_listeners=$(/usr/sbin/lsof -nP -t -iTCP:5173 -sTCP:LISTEN 2>/dev/null || true)
if [[ -n "$portfolio_listeners" ]]; then
  for portfolio_pid in ${(f)portfolio_listeners}; do
    portfolio_server_cwd=$(/usr/sbin/lsof -a -p "$portfolio_pid" -d cwd -Fn 2>/dev/null | /usr/bin/sed -n 's/^n//p')
    if [[ "$portfolio_server_cwd" == "$portfolio_frontend" ]]; then
      print 'תיק העבודות כבר פועל. פותחת אותו בדפדפן…'
      /usr/bin/open "$portfolio_url"
      exit 0
    fi
  done
  print 'הכתובת 5173 כבר בשימוש של פרויקט אחר. יש לעצור אותו לפני הפעלת תיק העבודות.'
  exit 1
fi

if ! command -v npm >/dev/null 2>&1 || ! command -v node >/dev/null 2>&1; then
  print 'לא נמצאה התקנת Node.js. נדרשת גרסה 22.22.2 ומעלה להפעלת הפרויקט.'
  exit 1
fi

if [[ ! -d node_modules ]]; then
  print 'מתקינה את חבילות הפרויקט לקראת ההפעלה הראשונה…'
  npm ci
fi

print 'מפעילה את תיק העבודות. האתר ייפתח בדפדפן בעוד רגע.'
print 'השאירי את חלון הטרמינל הזה פתוח בזמן העבודה. לעצירה לחצי Control+C.'
exec npm run dev -- --open
