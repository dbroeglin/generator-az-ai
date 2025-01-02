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
    # UV_PYTHON=python<%- pythonVersion %> \

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
