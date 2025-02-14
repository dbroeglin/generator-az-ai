<% if (solutionLevel == 100) { -%>
###############################################
# Base stage (shared between build and final) #
###############################################

FROM python:<%- pythonVersion %>-slim AS base

###############
# Build stage #
###############

FROM base AS builder

## Install and configure UV, see https://docs.astral.sh/uv/ for more information

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PROJECT_ENVIRONMENT=/app/.venv
    # UV_PYTHON_DOWNLOADS=never \
    # UV_PYTHON=python<%- pythonVersion %>

WORKDIR /app

COPY uv.lock pyproject.toml /app/
RUN uv sync \
    --frozen \
    --no-dev \
    --no-install-workspace \
    --no-editable \
    --all-packages

COPY app.py /app/

###############
# Final image #
###############

FROM base
STOPSIGNAL SIGINT

RUN groupadd -r app
RUN useradd -r -d /app -g app -N app

COPY --from=builder --chown=app:app /app /app
WORKDIR /app

EXPOSE 8000
ENTRYPOINT ["/app/.venv/bin/streamlit", "run", "app.py", "--server.port=8000", "--server.address=0.0.0.0"]
<% } else { -%>
###############################################
# Base stage (shared between build and final) #
###############################################

FROM python:3.12-slim AS base

ENV APP_NAME=frontend
<% if (withPackage) { -%>
ENV PACKAGE_NAME=<%= packageSlug %>
<% } -%>

###############
# Build stage #
###############

FROM base AS builder

## Install and configure UV, see https://docs.astral.sh/uv/ for more information

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never \
    UV_PYTHON=python3.12 \
    UV_PROJECT_ENVIRONMENT=/app/.venv

WORKDIR /app

## Install depdencies first as they change less often

COPY uv.lock pyproject.toml .python-version /app/
<% if (withPackage) { -%>
COPY src/${PACKAGE_NAME}/.python-version /app/src/${PACKAGE_NAME}/
COPY src/${PACKAGE_NAME}/pyproject.toml /app/src/${PACKAGE_NAME}/
<% } -%>
COPY src/${APP_NAME}/pyproject.toml /app/src/${APP_NAME}/
COPY src/${APP_NAME}/.python-version /app/src/${APP_NAME}/
RUN uv sync \
    --frozen \
    --no-dev \
    --no-install-workspace \
    --no-editable \
    --all-packages

## Install the app last as it changes most often

<% if (withPackage) { -%>
COPY src/${PACKAGE_NAME} /app/src/${PACKAGE_NAME}
<% } -%>
COPY src/${APP_NAME} /app/src/${APP_NAME}
RUN uv sync \
    --frozen \
    --no-dev \
    --no-editable \
    --project src/${APP_NAME}

###############
# Final image #
###############

FROM base

RUN groupadd -r app
RUN useradd -r -d /app -g app -N app

WORKDIR /app/src/${APP_NAME}
COPY --from=builder --chown=app:app /app/.venv /app/.venv
COPY --from=builder --chown=app:app /app/src/${APP_NAME} /app/src/${APP_NAME}

EXPOSE 8000
ENTRYPOINT ["/app/.venv/bin/streamlit", "run", "app.py", "--server.port=8000", "--server.address=0.0.0.0"]
<% } -%>
