#!/bin/bash -ex

cd infrastructure
terraform init
terraform plan -var-file serverless-node-dynamodb-ui.tfvars
terraform apply -var-file serverless-node-dynamodb-ui.tfvars
cd ..
