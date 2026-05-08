#!/bin/bash -ex

DEPLOYMENT_BUCKET=$(cd infrastructure/terraform && terraform output -raw deployment_bucket)
CLOUDFRONT_DISTRIBUTION_ID=$(cd infrastructure/terraform && terraform output -raw cloudfront_distribution_id)

cd dist
aws s3 sync . "s3://${DEPLOYMENT_BUCKET}/" --delete --exclude '.git/*'
aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths '/*'
cd ..
