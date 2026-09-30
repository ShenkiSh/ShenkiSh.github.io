#!/bin/zsh
set -eu
portfolio_root="${0:A:h}"
portfolio_runtime="$HOME/.local/share/shani-portfolio/node-22.22.2/bin"
if [[ -x "$portfolio_runtime/node" ]]; then
  export PATH="$portfolio_runtime:$PATH"
fi
cd "$portfolio_root/frontend"
if ! command -v npm >/dev/null 2>&1; then
  print 'Install Node.js 22.22.2 or newer, then run this launcher again.'
  exit 1
fi
if [[ ! -d node_modules ]]; then npm ci; fi
npm run build
exec npm run preview -- --open
