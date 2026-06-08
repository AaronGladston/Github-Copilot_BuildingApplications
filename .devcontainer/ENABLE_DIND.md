Opting in to Docker-in-Docker (DIND)

This repository provides two devcontainer configurations:

- `devcontainer.json` – default configuration (recommended).
- `devcontainer.with-dind.json` – alternate configuration that includes the `docker-in-docker` feature. Use this only if you need to run Docker inside the container.

How to use the alternate configuration

- With the devcontainer CLI (preferred):

  npm install -g @devcontainers/cli
  devcontainer up --workspace-folder /workspaces/Github-Copilot_BuildingApplications --config .devcontainer/devcontainer.with-dind.json

- With VS Code: open the Command Palette and run "Dev Containers: Rebuild Container" and choose to use the alternate configuration file if prompted, or run the CLI command above.

Notes

- The Docker-in-Docker feature may attempt network installs and can fail in environments with restricted network access. Only enable it when you explicitly need nested Docker.
