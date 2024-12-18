#!/bin/bash -x
set -e

# Add here commands that need to be executed before provisioning
# Typically: preparing additional environment variables, creating app registrations, etc.
# see https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/azd-extensibility

AZURE_APP_ID=$(
  az ad app list \
    --app-id "$AZURE_CLIENT_APP_ID" \
    --query '[].id' \
    -o tsv)

if [ ! -z "$AZURE_APP_ID" ]; then
  echo "Deleting app $AZURE_CLIENT_APP_ID..."
  az ad app delete --id "$AZURE_APP_ID"
fi
