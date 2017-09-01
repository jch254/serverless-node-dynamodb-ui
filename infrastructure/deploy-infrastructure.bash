#!/bin/bash -ex

cd infrastructure
terraform init
terraform plan -var-file main.tfvars -out main.tfplan
terraform apply -var-file main.tfvars main.tfplan
cd ..
