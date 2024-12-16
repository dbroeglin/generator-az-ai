# generator-aigbb [![npm version](https://badge.fury.io/js/generator-aigbb.svg)](https://badge.fury.io/js/generator-aigbb)

> AI GBB Scaffolding Tool

## Installation

First, install [Yeoman](http://yeoman.io) and generator-aigbb using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-aigbb
```

Then generate your new project:

```bash
yo aigbb
```

Local development:
```
npm link
```

Simple testing: 

```shell
( 
  rm -rf /tmp/foobar; cd /tmp; yo aigbb foobar && cd foobar && \
  AZURE_ENV_NAME=delete-me AZURE_LOCATION=francecentral azd up 
  read
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

 © Dominique Broeglin
