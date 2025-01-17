# Developing AI Apps in Azure Tips & Tricks Section

Just a collection of tips and tricks we accumulated that can help when
developing or troubleshooting an AI app in Azure.

## AZD

### Running it

While developing/troubleshooting, it can be useful to skip the interactive
choice of values by providing values on the command line. Use this syntax
to avoid being asked to input values:

```shell
AZURE_ENV_NAME="my-env-name" AZURE_LOCATION="eastus2" azd up
```

It works for all `azd` commands 

### Environment variables

#### Beware of global environment

When working with AZD it can be tempting to set environment variables
in your shell like this:

```shell
source <(azd env get-values | sed 's/^/export /')
```

This works but can lead to weird behavior when you switch environments like that:
```shell
azd env select other-env-name

azd up
```

This would not run azd up in the `other-env-name` environment but would 
run it in the environment in which the `source` command occured because 
`AZURE_ENV_NAME` still contains the name of the old environment.
 
#### App Registration Client Secret

The App registration client secret is generated once when the App Registration
is created (usually during the initial `azd up` run) in `scripts/preprovision.sh`. It is then set as a secret in the keyvault during provisioning and deleted immediately after from the AZD environment in `scripts/postprovision.sh`.

If for some reason you need to reset the value of the client app secret use the following commands:

```shell
AZURE_CLIENT_APP_ID=$(azd env get-value AZURE_CLIENT_APP_ID)
azd env set AZURE_CLIENT_APP_SECRET "$(
  az ad app credential reset \
    --id $AZURE_CLIENT_APP_ID \
    --display-name "client-secret" \
    --query password \
    --years 1 \
    --output tsv
  )"
azd provision
```

### Hooks

#### Use bash debug while developing hooks

Use this as your shebang when debugging or developing AZD hooks:

```shell
#!/bin/bash -x
```

Then run your hook specifically with :

```shell
azd hooks run preprovision
```
