A GitHub Action to set up a variety of tools for Continuous Delivery.

This is a fork of [Setup CD tools by coscene](https://github.com/marketplace/actions/setup-cd-tools-by-coscene) but with more tools, more features, and more platform support,

## Features

- Download and setup a variety of common CDI tools for multiple architectures and platforms (x64, arm64)
- setup and download arbitrary custom tools

## Usage

```
name: Deployment
on: [push]
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      ...
      - name: Set up tools
        uses: khauri/setup-cdi-tools
        with:
          kubectl: '1.22.2'
          kustomize: '4.5.4'
          skaffold: '1.38.0'
          helm: '3.8.2'
          yq: '2.3.0'
          jq: '1.6'
          hub: '2.14.2'
          # etc...
      ...
```

See the Built-in Tools section for a full list of included tools

## Built-in Tools

The tool matching the architecture of the action runner (either amd64 or arm64) will automatically be downloaded.

Consult the following support table to see if a build for the target architecture is provided. 
When deciding the version of the tool that you would like to use, be sure to use one that has a build for the desired architecture.

|  | linux | macos | windows |
|---|:---:|---|---|
| [jq](https://stedolan.github.io/jq/) | amd64,arm64 | amd64,arm64 | amd64 |
| [yq](https://github.com/mikefarah/yq) | amd64,arm64 | amd64,arm64 | amd64 |
| [kubectl](https://github.com/kubernetes/kubectl) | amd64,arm64 | amd64,arm64 | amd64 |
| [kustomize](https://github.com/kubernetes-sigs/kustomize) | amd64,arm64 | amd64,arm64 | amd64,arm64 |
| [skaffold](https://github.com/GoogleContainerTools/skaffold) | amd64,arm64 | amd64,arm64 | amd64 |
| [helm](https://github.com/helm/helm) | amd64,arm64 | amd64,arm64 | amd64 |
| [hub](https://github.com/github/hub) | amd64,arm64 | amd64,arm64 | amd64 |
| [oras](https://github.com/oras-project/oras) | amd64,arm64 | amd64,arm64 | amd64 |

## Custom Tools

This feature was added in the event that you want to easily setup tools that are not built-in.

You can either provide a direct url to download the tool from, or a more complex configuration when you need to support multiple platforms (this is in fact the same configuration that we use to define the built-in tools).

> [!NOTE]
> inputs to github actions can only be passed in as strings. Make sure that you are passing in this value as a 
> [multi-line string](https://yaml-multiline.info/). The string itself should be yaml formatted

```yaml
custom: |
  # Provide a direct URL to the tool's download link
  # This method is the simplest to use when you already know the runner's platform and architecture  
  my-tool: https://github.com/org/repo/releases/download/1.0.0/my-tool-linux-x64.tar.gz

  # Or provide a template url with platform-speciffic configuration
  # This can be used to automatically determine which tool to download based on the type of runner
  my-tool:
    version: 1.0.0
    template: https://github.com/org/repo/releases/download/${version}/my-tool-${platform}-${arch}.tar.gz
    linux:
      architectures: [x86, arm64]
    windows:
      architectures: [x86]
      # Ex: use a different version on windows
      version: 0.9.0
    darwin:
      architectures: [x86]
      # Ex: Download from a different repo on macos
      template: https://github.com/org/repo-mac/releases/download/${version}/my-tool 
```

## Contributing

Requires Bun

```sh
bun install
```

Make changes and then run the build

This repository does not currently have an automated build workflow setup and so builds are currently pushed and released manually

```sh
bun run build
```

Finally publish the changes by committing and pushing to your branch

### Adding new built-in tools

1. Modify the `src/tools.yml` file to 
2. Add a version for the tool in `__test__/integration.test.ts` and ensure the tests pass
3. Add a test in `.github/workflows/integration_test.yaml` for the new tool
4. Update the Built-in Tools section of this README
