# 2. Provide a DevContainer configuration

Date: 2024-12-06

## Status

Accepted

## Context

It can be complicated for a user to setup a development environment with all the pre-requisites 
necessary to deploy or further develop the solution. There is also a lot of variability in terms
of environments where the user usually works.

Providing a [DevContainer](https://containers.dev/) configuration file allows for either opening the project in a Docker 
container automatically provisioned and configured by Visual Studio code or running from the web
in a [Codespace](https://github.com/features/codespaces) container managed by GitHub.

## Decision

Every solution will come with a DevContainer configuration file. For AI solution working with Python and Notebooks a simple 
starting point is https://github.com/dbroeglin/aigbb-devcontainer

## Consequences

Users who have Visual Studio and Docker on their machine can run the project in a DevContainer
Users who have access to GitHub Codespaces can run it from the Web.
Other users can ignore those configurations, install the dependencies and run the solution as usual.
