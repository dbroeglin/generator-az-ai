@description('Location for all resources')
param location string = resourceGroup().location

@description('Principal ID of the user runing the deployment')
param azurePrincipalId string

output AZURE_PRINCIPAL_ID string = azurePrincipalId
