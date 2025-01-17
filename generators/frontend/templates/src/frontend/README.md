# Overview

The project is managed by pyproject.toml and [uv package manager](https://docs.astral.sh/uv/getting-started/installation/).


## Local execution

```shell
cd src/frontend
uv sync
. ./.venv/bin/activate
streamlit run app.py
```

**OBS!** Environment variables will be read from the AZD env file: $project/.azure/<selected_azd_environment>/.env automatically
