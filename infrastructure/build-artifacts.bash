#!/bin/bash -ex

yarn install
export API_BASE_URI="https://62xhj71jke.execute-api.ap-southeast-2.amazonaws.com/prod"
yarn run build
