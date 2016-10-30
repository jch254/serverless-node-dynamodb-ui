#!/bin/bash -ex

cd infrastructure
terraform remote config -backend=s3 \
  -backend-config="bucket=603-terraform-remote-state" \
  -backend-config="key=react-redux-terraform-aws.tfstate" \
  -backend-config="region=ap-southeast-2" \
  -backend-config="encrypt=true"

terraform plan -var-file react-redux-terraform-aws.tfvars
terraform apply -var-file react-redux-terraform-aws.tfvars
cd ..
