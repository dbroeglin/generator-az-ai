#!/bin/bash
set -e

# Update APT cache
sudo apt update

# Install uv, see https://astral.sh for additional information
curl -LsSf https://astral.sh/uv/install.sh | sh
uv sync

# Install adr-tools, see https://github.com/npryce/adr-tools
git clone https://github.com/npryce/adr-tools.git --depth 1 $HOME/.adr-tools
echo 'export PATH=$PATH:$HOME/.adr-tools/src' >> $HOME/.bashrc
