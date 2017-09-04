#!/bin/bash -ex

yarn install
export API_BASE_URI="https://sls-api.603.nu"
yarn run build
