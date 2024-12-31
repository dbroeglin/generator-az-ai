# AI GBB Generator [![npm version](https://badge.fury.io/js/generator-aigbb.svg)](https://badge.fury.io/js/generator-aigbb)

> AI GBB Scaffolding Tool

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/dbroeglin/generator-aigbb) [![Open in Dev Containers](https://img.shields.io/static/v1?style=for-the-badge&label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/dbroeglin/generator-aigbb)

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-aigbb` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-aigbb
```

Then generate your new project:
```bash
yo aigbb awesome-ai-app
```

Local development:
```bash
npm link
```

Simple end to end testing: 
```shell
( 
  rm -rf /tmp/foobar; yo aigbb /tmp/foobar && cd /tmp/foobar && \
  AZURE_ENV_NAME=delete-me AZURE_LOCATION=francecentral azd up 
  read
  az ad app delete --id $(az ad app list --display-name "delete-me-app" --query '[].id'  -o tsv)
  azd down --purge --force
)
```

Cleanup only:
```shell
( 
  cd /tmp/foobar && \
  azd down --purge --force
)
```

Testing backend authentication:
```shell
token=$(az account get-access-token \
  --resource api://$(azd env get-value AZURE_CLIENT_APP_ID) \
  -t $(az account show --query tenantId -o tsv) \
  --query accessToken -o tsv)
curl -i  $(azd env get-value SERVICE_BACKEND_URL)/echo \
  -X GET \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $token" \
  -d '{"Hello":"World!"}'
```

Comparing generations:
```shell
yo aigbb  ../hello-ai-world \
  --solutionName 'Hello AI World' \
  --solutionLevel 100 \
  --solutionDescription 'AI Application chassis - best AI app practices optimized for Azure' \
  --solutionSlug hello-ai-world \
  --solutionVersion 0.1.0 \
  --creatorName 'AI GBB EMEA' \
  --creatorEmail dominique.broeglin@microsoft.com \
  --withGitHub true \
  --withFrontend true \
  --withBackend true \
  --gitHubOrg dbroeglin \
  --gitHubRepo hello-ai-world \
  --withGitHubPush ''

# Positive result: the last line in the command output should be "No changes to commit."
```

```shell
yo aigbb  ../aigbb-scaffolding-test-l100 \
  --solutionName 'AI GBB scaffolding tool test' \
  --solutionLevel 100 \
  --solutionDescription 'Solution generated with the AI GBB Scaffolding tool test (l300)' \
  --solutionSlug aigbb-scaffolding-test-l100 \
  --solutionVersion 0.1.0 \
  --creatorName 'Dominique Broeglin' \
  --creatorEmail dominique.broeglin@microsoft.com \
  --withFrontend true \
  --withBackend true \
  --withGitHub true \
  --gitHubOrg dbroeglin \
  --gitHubRepo aigbb-scaffolding-test-l100 \
  --withGitHubPush false
  
# Positive result: the last line in the command output should be "No changes to commit."

yo aigbb  ../aigbb-scaffolding-test-l300 \
  --solutionName 'AI GBB scaffolding tool test' \
  --solutionLevel 300 \
  --solutionDescription 'Solution generated with the AI GBB Scaffolding tool test (l300)' \
  --solutionSlug aigbb-scaffolding-test-l300 \
  --solutionVersion 0.1.0 \
  --creatorName 'Dominique Broeglin' \
  --creatorEmail dominique.broeglin@microsoft.com \
  --withFrontend true \
  --withBackend true \
  --withPackage true \
  --packageName 'AI GBB Scaffolding Core' \
  --packageDescription 'AI GBB Scaffolding Test Core Package' \
  --packageSlug 'aigbb-scaffolding-core' \
  --withGitHub true \
  --gitHubOrg dbroeglin \
  --gitHubRepo aigbb-scaffolding-test-l300 \
  --withGitHubPush false

  
# Positive result: the last line in the command output should be "No changes to commit."
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

## Acknowledgements

  * Kudos to [Pamela Fox](https://github.com/pamelafox) and [James Casey](https://github.com/jamesc) for [Azure-Samples/openai-chat-app-entra-auth-builtin](https://github.com/Azure-Samples/openai-chat-app-entra-auth-builtin) from which we borrowed most of authentication & authorization setup.
  * [Evgeny Minkevich](https://github.com/evmin) for his many contributions particularily to the the Bicep code.
