#!/bin/bash
set -e

# Update APT cache
sudo apt update

# Install uv and run a sync to ensure everything is setup
curl -LsSf https://astral.sh/uv/install.sh | sh
uv sync
