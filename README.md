# Az AI Generator [![npm version](https://badge.fury.io/js/generator-az-ai.svg)](https://badge.fury.io/js/generator-az-ai)

> Az AI Scaffolding Tool

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/dbroeglin/generator-az-ai) [![Open in Dev Containers](https://img.shields.io/static/v1?style=for-the-badge&label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/dbroeglin/generator-az-ai)

## Quick start

### Generate you own fully functional project

First, install [Yeoman](http://yeoman.io) and `generator-az-ai` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-az-ai
```

**NOTE!** If you have the generator installed already, you might also want to update the templates.

```bash
# optional
npm upgrade -g generator-az-ai
```

Then generate your new project:
```bash
yo az-ai awesome-ai-app
```

### Prefer to have a look at an already generated project?

 - An example of a L100 project is available here: [evmin/az-ai-kickstarter](https://github.com/evmin/az-ai-kickstarter)
 - An example of a L300 project is available at [dbroeglin/az-ai-scaffolding-test-l300](https://github.com/dbroeglin/az-ai-scaffolding-test-l300)

## Development

For local development link your souce directory with NPM:
```bash
npm link
```

Full testing:
```shell
uv run pytest --runslow
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

### Comparing generations

Comparing full L100 generation:
```shell
yo az-ai  ../az-ai-kickstarter \
  --solutionName 'Azure AI App Kickstarter' \
  --solutionLevel 100 \
  --solutionDescription 'AI Application chassis - best AI app practices optimized for Azure' \
  --solutionSlug az-ai-kickstarter \
  --solutionVersion 0.1.0 \
  --creatorName 'AI GBB EMEA' \
  --creatorEmail eminkevich@microsoft.com \
  --withGitHub true \
  --withFrontend true \
  --withBackend true \
  --gitHubOrg evmin \
  --gitHubRepo az-ai-kickstarter \
  --withGitHubPush ''

# Positive result: the last line in the command output should be "No changes to commit."
```

Comparing full Level 300 generation:
```shell
yo az-ai  ../az-ai-scaffolding-test-l300 \
  --solutionName 'Az AI scaffolding tool test' \
  --solutionLevel 300 \
  --solutionDescription 'Solution generated with the Az AI Scaffolding tool test (l300)' \
  --solutionSlug az-ai-scaffolding-test-l300 \
  --solutionVersion 0.1.0 \
  --creatorName 'Dominique Broeglin' \
  --creatorEmail dominique.broeglin@microsoft.com \
  --withFrontend true \
  --withBackend true \
  --withPackage true \
  --packageName 'Az AI Scaffolding Core' \
  --packageDescription 'Az AI Scaffolding Test Core Package' \
  --packageSlug 'az-ai-scaffolding-core' \
  --withGitHub true \
  --gitHubOrg dbroeglin \
  --gitHubRepo az-ai-scaffolding-test-l300 \
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

## Authors

  * [Dominique Broeglin](https://github.com/dbroeglin)
  * [Evgeny Minkevich](https://github.com/evmin)
