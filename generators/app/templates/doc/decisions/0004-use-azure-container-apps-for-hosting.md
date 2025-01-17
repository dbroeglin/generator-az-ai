# 6. Use Azure Container Apps for hosting

Date: 2024-12-25

## Status

Accepted

## Context

### Landscape

The solution needs to be hosted when deployed. We have several options to
consider:
- [Azure AppService](https://learn.microsoft.com/en-us/azure/app-service/)
- [Azure Batch](https://learn.microsoft.com/en-us/azure/batch/batch-technical-overview)
- [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview)
- [Azure Container Instances](https://learn.microsoft.com/en-us/azure/container-instances/) : 
- [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview)
- [Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks/what-is-aks)
- [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/overview) static
  single page applciation with Azure functions as backends

Options not considered in the discussion below:
- [Azure RedHat
  Openshift](https://azure.microsoft.com/en-us/products/openshift): can be
  assimilated to Azure Kubernetes Service for all intent and purposes of this
  conversation
- [Azure Spring Apps](https://learn.microsoft.com/en-us/azure/spring-apps/):
  Java specific and being retired.
- Virtual machines: excluded from the start as we want to minimize the amount of
  work required to deploy the solution


### Discussion

#### Azure AppService

Pros:
- Prominent solution that exists for a long time.
- Many additional capabilities like: Certificate management, authentication,
  WebJobs for batching, etc.
- Can deploy _Containers_
- Integrated in AZD Cons:
- The solution is not _Container_ first, deploying containers is slightly more
  complicated than for ACA, but simpler than for AKS

Summary: This is one of the best solutions with ACA. Allows for _containers_ and
brings additional capabilities while not requiring a lot of learning upfront.

#### Azure Batch

Pros:
- Allow to drive _batch_ workloads easily. Some of the workloads our solutions
will address require a form of batch.s Cons:
- This is a pretty low-level batch interface.

Summary: Azure AppService, Azure Container Apps and Azure Functions all have
_batching_ capabilities. Bringing in Azure Batch is not worth the complexity.

#### Azure Container Apps (ACA)

Pros:
- _Container_ first solution (but without the complexity of AKS) 
- Simple, no bells and whistles
- Integrated in AZD Cons:
- ACA is newer than Azure AppService, some of the extra features available to
  Azure AppService are not (yet) available in ACA (some authentication
  possibilities for instance)
- Less prominent than Azure AppService.

Summary: One of the best solutions with Azure App Services. Simplest that
provides all required features. 

#### Azure Container Instances

Pros:
- Very simple way of deploying containers Cons:
- Too simple, as we do not have any other capability for ingress, in-transit
  encryption, authentication, etc.

Summary: Too simple for deploying our solution. 

#### Azure Functions

Pros:
- Can manage several languages. 
- Does not require as much _boilerplate_ code for integration with other
  services. Triggers on events happening in Azure (file added to a storage,
  database, etc.) are trivially simple.
- Integrated in AZD Cons:
- No real solution to deploy a server-side _Frontend_. Has forced some solutions
  to run the _Frontend_ locally which is sub-optiminal.
- Implies learning about Azure Functions and the Azure Serverless capabilities.
  Can make staring harder.

Summary: As we have a preference for containerized packaging, Azure Functions
seems less adequate than ACA and Azure AppService. However, keeping the door
open as Azure Functions can run run containers and some solutions might require
many moving parts in which case setting things up on ACA or AppService might me
harder than going with Functions. Azure functions can also be mixed with
AppService and ACA. 

#### Azure Kubernetes Service (AKS)

Pros:
- Allows to use containers and allows for many different deployment scenarios
  without having to go down to the Virtual Machine level.
- AKS is pretty prominent at many customers. 
- Integrated in AZD Cons:
- AKS brings a lot of _accidental complexity_ to the deployment

Summary: Despite the prominence of AKS at customers it brings a lot of
complexity to a simple demployment. If we make the choice of deploying with
_Containers_ on a PaaS hosting solution, we do not loose much as it would be
pretty easy to deploy those containers on AKS if needed.

#### Azure Static WebApps

Pros:
- Low cost and low complexity
- Would rely on Azure Functions for the _backend_. The  Azure Functions
  discussion above applies here also.
- Integrated in AZD Cons:
- To use Azure Static Webapps we would need to deploy an SPA. However, most of
  our solutions usually come with [Streamlit](https://streamlit.io/) or
  [Chainlit](https://docs.chainlit.io/) as a _frontend_. We actually need a way
  to deploy those.

Summary: Rejected due to the constraint on the front end.

## Decision

We are using [Azure Container
Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview) as it is
right now the simplest to use. However, it is mostly a tie with [Azure
AppService](https://learn.microsoft.com/en-us/azure/app-service/). Initial
decision is to go with the simplest hosting solution but keep the door open for
[Azure AppService](https://learn.microsoft.com/en-us/azure/app-service/) and
[Azure Kubernetes
Service](https://learn.microsoft.com/en-us/azure/aks/what-is-aks). We are doing
so by ensuring the produced containers are independent from the _hosting_
solution. This is a good property to have for our solutions anyways as it makes
it easier to deploy them in additional environments. 

ACA is _opinionated_ about how to run _Containers. There is less choice in the
way workloads can be deployed. However, we did not identify any case where this
would limit the solutions as we envision then today. Potential future needs did
not outweight the increased complexitiy of AKS for the simple deployments we
envision now.

## Consequences

1. The solution needs to be packaged as _Containers_.
2. Deploying and running those containers is taken care of by AZD and ACA.
3. ACA is _opinionated_ about how it deploys _Containers_. There is less choice
   available than running in AKS. 