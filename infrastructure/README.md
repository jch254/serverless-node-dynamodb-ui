# Deployment/Infrastructure

This project is built and deployed to AWS by CodeBuild. The static bundle is served from a private S3 origin through CloudFront, with DNS managed by Cloudflare.

Terraform ([`infrastructure/terraform`](./terraform)) manages: ACM cert (us-east-1), Cloudflare DNS records (ACM validation + app CNAME), private S3 origin, CloudFront distribution + Origin Access Control, CodeBuild project + IAM role, and SSM placeholders for the Cloudflare API token + Google Analytics ID.

## Prerequisites (one-time, account-level)

- S3 bucket for Terraform remote state (default `jch254-terraform-remote-state` in `ap-southeast-4`)
- S3 bucket for CodeBuild dependency cache (default `jch254-codebuild-cache`)
- Cloudflare zone for the apex domain (default `603.nz`) with API token created
- Auth0 application configured as **Single Page Application** with **JWT Signature Algorithm = RS256**, and the SPA's origin (e.g. `https://serverless-api.603.nz`) added to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**
- [shared-platform](https://github.com/jch254/shared-platform) deployed (provides the `shared-platform-build-notification-formatter` Lambda for build-status notifications)
- The companion [serverless-node-dynamodb-api](https://github.com/jch254/serverless-node-dynamodb-api) deployed and reachable at the URL set in `API_BASE_URI`

## SSM placeholders managed by Terraform

Terraform creates these parameters with placeholder values; populate the real values once with `aws ssm put-parameter ... --overwrite`. The modules' `lifecycle { ignore_changes = [value] }` keeps subsequent applies from clobbering them:

| Parameter | Purpose |
| --- | --- |
| `/serverless-node-dynamodb-ui/cloudflare-api-token` | Cloudflare API token, used by both Terraform's `cloudflare` provider and the build to manage DNS |
| `/serverless-node-dynamodb-ui/ga-id` | Google Analytics measurement ID injected at build time (asserted in the buildspec's `pre_build` phase) |

`AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `API_BASE_URI` are public values, set as plaintext env vars on the CodeBuild project.

## Local Terraform usage

**All commands below must be run from the repository root. Terraform lives in `infrastructure/terraform`.**

1. Install [Terraform](https://www.terraform.io/) and make sure it is in your `PATH`.
1. Set AWS credentials via env vars, `aws configure`, or an attached IAM Role.
1. Export `CLOUDFLARE_API_TOKEN` (the Terraform `cloudflare` provider reads this directly).

### Deploying / updating infrastructure

```bash
cd infrastructure/terraform
terraform init \
  -backend-config 'bucket=jch254-terraform-remote-state' \
  -backend-config 'key=serverless-node-dynamodb-ui' \
  -backend-config 'region=ap-southeast-4'
terraform plan -out main.tfplan
terraform apply main.tfplan
```

The repo's [`infrastructure/deploy-infrastructure.bash`](./deploy-infrastructure.bash) wraps the same flow for CodeBuild, and [`infrastructure/upload-artifacts.bash`](./upload-artifacts.bash) syncs `dist/` to S3 and invalidates CloudFront after the build.

### Destroying (use with care)

```bash
cd infrastructure/terraform
terraform destroy
```
