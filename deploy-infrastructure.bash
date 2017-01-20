#!/bin/bash -ex

cd infrastructure
terraform remote config -backend=s3 \
  -backend-config="bucket=603-terraform-remote-state" \
  -backend-config="key=serverless-node-dynamodb-ui.tfstate" \
  -backend-config="region=ap-southeast-2" \
  -backend-config="encrypt=true"

terraform plan -var-file serverless-node-dynamodb-ui.tfvars
terraform apply -var-file serverless-node-dynamodb-ui.tfvars
cd ..
