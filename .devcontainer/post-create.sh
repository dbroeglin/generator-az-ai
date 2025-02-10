#!/bin/bash
set -euo pipefail
[[ ${DEBUG-} =~ ^1|yes|true$ ]] && set -o xtrace

# Update APT cache
sudo apt update

# Install uv, see https://astral.sh for additional information
curl -LsSf https://astral.sh/uv/install.sh | sh
echo 'export UV_LINK_MODE=copy' >> $HOME/.bashrc
source $HOME/.bashrc

# Install Yeoman and prepare the dev directory
npm install -g yo
npm install
npm link

# Install adr-tools, see https://github.com/npryce/adr-tools
git clone https://github.com/npryce/adr-tools.git --depth 1 $HOME/.adr-tools
echo 'export PATH=$PATH:$HOME/.adr-tools/src' >> $HOME/.bashrc
source $HOME/.bashrc

# Install devcontainers CLI (used by the test scripts)
npm install -g @devcontainers/cli
