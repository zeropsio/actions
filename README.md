# ⚡️ Zerops Actions

A Github Action for zerops deployment workflow for your project if you are a
github workflows addict.

## Usage

To set up the Zerops deployment workflow, use the following GitHub Actions YAML
configuration in `.github/workflows/deploy.yml`:

```yml
name: Deploy with Zerops

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy with Zerops
        uses: zeropsio/actions@master
        with:
          access-token: ${{ secrets.ZEROPS_TOKEN }}
          service-id: ${{ secrets.ZEROPS_SERVICE_ID }}
```

### Setting up Environment Variables

#### Generate a Zerops Token

A personal access token is required to authorize your Zerops CLI. Keep this
token private as it grants admin permissions.

- Open
  [Settings > Access Token Management](https://app.zerops.io/settings/token-management)
  in the Zerops app
- Generate a new access token.

Now we need a service id and dont worry nothing happens if this gets leaked

#### Get your Service ID

The service ID is used to identify your Zerops service. Although it's less
sensitive than the access token, keep it secure.

- Visit your service dashboard at
  `https://app.zerops.io/service-stack/EjmDVbL0QMuemLJ2hSO6zw/dashboard`.
- `EjmDVbL0QMuemLJ2hSO6zw` is your service ID.

#### Add Secrets to Your Repository

Store the Zerops token and service ID as secrets in your GitHub repository:

- Go to your repository on GitHub.
- Navigate to Settings > Secrets and variables > Actions > Repository secrets.
- Add the following secrets:
  - `ZEROPS_TOKEN` with your Zerops access token.
  - `ZEROPS_SERVICE_ID` with your Zerops service ID.

`https://github.com/${username}/${repository}/settings/secrets/actions`
