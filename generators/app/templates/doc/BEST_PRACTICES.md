# Best Practices

## Architecture Decision Records

- Use [Architecture Decision Records](decisions/0001-record-architecture-decisions.md) to track the project decisions. 
- Use a lightweight ADR toolset by Nat Pryce -  [adr-tools](https://github.com/npryce/adr-tools).

## AZD

1. **Always provide an AZD deployment**.
2. Use `AZURE_PRINCIPAL_ID` in `main.parameters.json` to assign RBAC roles to the user who deploys so that he can run applications locally when developing. See [AZD Environment Variables](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/manage-environment-variables) for more information on available environment variables.
3. One step config: in `main.bicep` define output variables with the same name as the environment variables you wish to use when running locally. Then document the use of `azd env get-values > .env` in your installation steps. Alternatively: `source <(azd env get-values)`
4. AZD has concept of _Service_ make sure your directory, application, deployment, etc. names all align well with those _Services_
5. Use the AZD _Exists_ magic parameter in main.bicep to handle situations whenb we need to know if the app already exists (for instance when using Azure Container App and Azure Container Registry)

## Bicep

1. Use [Azure Verified Modules](https://azure.github.io/Azure-Verified-Modules/) whenever possible.
2. Setup role assignments in Bicep not externally through AZ or manual steps.
3. Add `@allowed` annotations to parameters when necessary. Especially, limit the `location` parameter to regions where the deployment will work. Example: `@allowed(['northcentralusstage','westus2','northeurope'])`.

## Docker

1. Optimize `Dockerfile`to both minimize image size and time to build (order commands in the file in a way that the Docker cache is used as much as possible). See [Best practices | Docker Docs](https://docs.docker.com/build/building/best-practices/).

## GitHub

- Create a GitHub repository with a meaningful name.
- Add stars to our various GitHub repositories.