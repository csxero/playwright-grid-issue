# playwright-grid-issue

Running our tests locally and against our grid works in playwright 1.10.0 but as soon as we upgrade we get an issue with some undefined types

## Verify it works on v1.10.0

### Locally
- `yarn install`
- `yarn test`

### Docker
- `./batect test-grid`


## Verify it does not work on >= v1.11.0

Update the `playwright` package and the docker image in `batect.yml`

### Locally
- `yarn install`
- `yarn test`

### Docker
- `./batect test-grid`
