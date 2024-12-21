#!/bin/bash
set -e

# Update APT cache
sudo apt update

# Install uv, see https://astral.sh for additional information
curl -LsSf https://astral.sh/uv/install.sh | sh
uv sync
