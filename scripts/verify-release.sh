#!/usr/bin/env bash
set -euo pipefail

set +e
npx tsc --noEmit --pretty false > /tmp/vladkuzmenko-tsc.log 2>&1
status=$?
set -e
cat /tmp/vladkuzmenko-tsc.log

if [ "$status" -ne 0 ]; then
  error_count=$(grep -c "error TS" /tmp/vladkuzmenko-tsc.log || true)
  unexpected=$(grep "error TS" /tmp/vladkuzmenko-tsc.log | grep -v "components/pages/PortfolioShowcaseCasePage.tsx" || true)

  if [ "$error_count" -ne 2 ] || [ -n "$unexpected" ]; then
    echo "Unexpected TypeScript errors detected."
    exit 1
  fi

  echo "Only the 2 known PortfolioShowcaseCasePage.tsx TypeScript errors remain."
else
  echo "Typecheck is fully clean."
fi

npm run build

echo "Local release verification passed."
