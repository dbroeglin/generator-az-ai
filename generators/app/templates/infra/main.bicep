@description('Location for all resources')
param location string = resourceGroup().location

@description('Principal ID of the user runing the deployment')
param azurePrincipalId string

/* -------------------------------------------------------------------------- */
/*                                  VARIABLES                                 */
/* -------------------------------------------------------------------------- */

/* --------------------- Globally Unique Resource Names --------------------- */

/* ----------------------------- Resource Names ----------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  RESOURCES                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                   OUTPUTS                                  */
/* -------------------------------------------------------------------------- */

// Outputs are automatically saved in the local azd environment .env file.
// To see these outputs, run `azd env get-values`,  or
// `azd env get-values --output json` for json output.
// To generate your own `.env` file run `azd env get-values > .env`

output AZURE_PRINCIPAL_ID string = azurePrincipalId
