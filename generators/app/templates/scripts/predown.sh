#!/bin/bash
set -e

# Add here commands that need to be executed before provisioning
# Typically: preparing additional environment variables, creating app registrations, etc.
# see https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/azd-extensibility

az ad app delete --id $(
  az ad app list \
    --app-id "$AZURE_CLIENT_APP_ID" \
    --query '[].id' \
    -o tsv)
