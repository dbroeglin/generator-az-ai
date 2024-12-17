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

Simple testing: 
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
  az ad app delete --id $(az ad app list --display-name "delete-me-app" --query '[].id'  -o tsv)
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
