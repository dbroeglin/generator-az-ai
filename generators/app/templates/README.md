# <%- solutionDescription %>

ToC: [**USER STORY**](#user-story) \| [**GETTING STARTED**](#getting-started)  \| [**HOW IT WORKS**](#how-it-works)

## User story

### <%- solutionName %> overview

<% if (solutionLevel == 100) { -%>
L100 level aplication stub for an AI copilot/agent.
<% } else { -%>
> [!TIP] 
> **AI GBB Tip**: Document what your solution does here.
<% } -%>

## Getting Started

### Codespaces and DevContainers

This respository has been configured to support GitHub Codespace and DevContainers.

<% if (withGitHub) { -%>
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/<%- gitHubOrg %>/<%- gitHubRepo %>) [![Open in Dev Containers](https://img.shields.io/static/v1?style=for-the-badge&label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/<%- gitHubOrg %>/<%- gitHubRepo %>)
<% } -%>

### Local

It is possible to operate the fully local setup.

  - [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/what-is-azure-cli): `az`
  - [Azure Developer CLI](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/overview): `azd`
  - [Python](https://www.python.org/about/gettingstarted/): `python`
  - [UV](https://docs.astral.sh/uv/getting-started/installation/): `uv`
  - Optionally [Docker](https://www.docker.com/get-started/): `docker` 

> [!TIP] 
> **AI GBB Tip**: Document here how to quickly deploy the solution. Try to reduce this to `azd up` by
> automating as much as possible. Have a look at `main.bicep` and `scripts` for examples of how to do
> that

### Quick deploy

To deploy <%- solutionName %> just run: 
`azd up`

> **WARNING** The application automatically configures authentication to secure frontend
> To do so it creates an app registration in EntraID. 
> If the account you are using to deploy the app does not have the required permissions, disable the preprovision script in azure.yaml

## How it works

- TODO: How to run backend locally
- TODO: How to run frontend locally

### User Manual

- TODO : Obervability
> [!TIP] 
> **AI GBB Tip**: Document how the solution is used and operated here.
> Optionally, if the section is too long, create a `USER_MANUAL.md` file and
> link to it from here.

### Architecture
<% if (solutionLevel >= 300) { -%>
> [!TIP] 
> **AI GBB Tip**: Document the solution's architecture here.
> Optionally, if the section is too long, create a `ARCHITECTURE.md` file and
> link to it from here.

> [!TIP] 
> **AI GBB Tip**: For architecture diagrams, you can leverage the [Markdown text
> diagramming capabilities](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams) available in GitHub. See example below.
<% } %>
```mermaid
architecture-beta
    group solution(cloud)[Solution]

    service frontend(server)[Frontend] in solution
    service backend(server)[Backend] in solution

    frontend:R --> L:backend
```

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

Resources:

- [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/)
- [Microsoft Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
- Contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with questions or concerns

For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Responsible AI Guidelines

This project follows below responsible AI guidelines and best practices, please review them before using this project:

- [Microsoft Responsible AI Guidelines](https://www.microsoft.com/en-us/ai/responsible-ai)
- [Responsible AI practices for Azure OpenAI models](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/overview)
- [Safety evaluations transparency notes](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/safety-evaluations-transparency-note)
