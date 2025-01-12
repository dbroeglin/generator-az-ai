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

This works fine but it can lead to weird behavior when you switch environments 
like that:

```shell
azd env select other-env-name

azd up
```

This would not run azd up in the `other-env-name` environment but would 
run it in the environment in which the `source` command occured because 
`AZURE_ENV_NAME` still contains the name of the old environment.
 

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
