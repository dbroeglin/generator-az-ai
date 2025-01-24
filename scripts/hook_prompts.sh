#!/bin/bash
set -euo pipefail
[[ ${DEBUG-} =~ ^1|yes|true$ ]] && set -o xtrace

prompt='
Port the following Bash script to Powershell.
Transform it AS-IS, so that the PowerShell script behaves exactly the same way as the Bash script.
Double check your work. If you think something cannot be ported say so.
Do not add extraneous comments or code even for explaining what you do.

If you encounter terminal color codes use the following pattern to translate them:
```powershell
    Write-Host "    ➜ " -ForegroundColor Green -NoNewline
    Write-Host "Rest of the message..."
```
'

for script in $(find ./generators/app/templates/scripts -name \*.sh); do
  printf "============================== $script ==============================\n\n"
  printf '%s\n\nScript:\n\n```bash\n%s\n```\n\n' "$prompt" "$(cat $script)"
  printf '\n\n'
done
