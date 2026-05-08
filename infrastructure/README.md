# Deployment/Infrastructure

This project is built, tested and deployed by AWS CodeBuild. Artifacts are served from a private S3 bucket through CloudFront. Cloudflare is used for DNS.

---

### Deployment Prerequisites

**All commands below must be run from the repository root. Terraform lives in `/infrastructure/terraform`.**

To deploy to AWS, you must:

1. Install [Terraform](https://www.terraform.io/) and make sure it is in your PATH.
1. Set your AWS credentials using one of the following options:
   1. Set your credentials as the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
   1. Run `aws configure` and fill in the details it asks for.
   1. Run on an EC2 instance with an IAM Role.
   1. Run via CodeBuild or ECS Task with an IAM Role (see [buildspec-test.yml](../buildspec-test.yml) for workaround)

#### Deploying infrastructure

1. Export `AWS_DEFAULT_REGION`, `REMOTE_STATE_BUCKET`, `TF_STATE_KEY`, and `CLOUDFLARE_API_TOKEN`.
1. Initialise Terraform from `infrastructure/terraform`:
```
terraform init \
  -backend-config 'bucket=YOUR_S3_BUCKET' \
  -backend-config 'key=YOUR_S3_KEY' \
  -backend-config 'region=YOUR_REGION' \
  -get=true \
  -upgrade=true
```
1. `terraform plan -out main.tfplan`
1. `terraform apply main.tfplan`

#### Updating infrastructure

1. Export `AWS_DEFAULT_REGION`, `REMOTE_STATE_BUCKET`, `TF_STATE_KEY`, and `CLOUDFLARE_API_TOKEN`.
1. Make necessary infrastructure code changes.
1. Initialise Terraform from `infrastructure/terraform`:
```
terraform init \
  -backend-config 'bucket=YOUR_S3_BUCKET' \
  -backend-config 'key=YOUR_S3_KEY' \
  -backend-config 'region=YOUR_REGION' \
  -get=true \
  -upgrade=true
```
1. `terraform plan -out main.tfplan`
1. `terraform apply main.tfplan`

#### Destroying infrastructure (use with care)

1. Export `AWS_DEFAULT_REGION`, `REMOTE_STATE_BUCKET`, `TF_STATE_KEY`, and `CLOUDFLARE_API_TOKEN`.
1. Initialise Terraform from `infrastructure/terraform`:
```
terraform init \
  -backend-config 'bucket=YOUR_S3_BUCKET' \
  -backend-config 'key=YOUR_S3_KEY' \
  -backend-config 'region=YOUR_REGION' \
  -get=true \
  -upgrade=true
```
1. `terraform destroy`
