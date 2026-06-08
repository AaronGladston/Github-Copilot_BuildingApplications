#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="/workspaces/Github-Copilot_BuildingApplications"
CONFIG_PATH="$REPO_ROOT/.devcontainer/devcontainer.with-dind.json"

if ! command -v devcontainer >/dev/null 2>&1; then
  echo "devcontainer CLI not found. Install with: npm install -g @devcontainers/cli"
  exit 2
fi

echo "Starting devcontainer with Docker-in-Docker config..."
devcontainer up --workspace-folder "$REPO_ROOT" --config "$CONFIG_PATH"
