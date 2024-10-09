A GitHub Action to set up a variety of tools for Continuous Delivery.

## The folk's feature

- bump dependencies in the `package.json`
- bump versions of components to download in integration test
- update deprecated fields in the workflows and action config
- allows arm64 packages to be installed

## Supported Tools

The tool matching the architecture of the action runner (either amd64 or arm64) will automatically be downloaded.

Consult the following support table to see if a build for the target architecture is provided. Be sure to select a version of the tool that has a build for the desired architecture. 

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
        uses: coscene-io/setup-cd-tools@v2
        env:
          # required!!!
          ACTIONS_ALLOW_UNSECURE_COMMANDS: true
        with:
          kubectl: '1.22.2'
          kustomize: '4.5.4'
          skaffold: '1.38.0'
          helm: '3.8.2'
          yq: '2.3.0'
          jq: '1.6'
          hub: '2.14.2'
      ...
```

## Contributing

Requires node >= 16 and yarn ^1 

```sh
yarn install
```

Make changes and then run the build

This repository does not currently have an automated build workflow setup and so builds are currently pushed and released manually

```sh
yarn build
```

Finally publish the changes
