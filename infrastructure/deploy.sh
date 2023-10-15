target_bucket=s3://$(echo "var.bucket_name" | terraform console -var-file terraform.tfvars | tr -d '"')

echo Deploying to AWS $target_bucket

aws s3 sync ../public $target_bucket \
  --exclude '*.html' \
  --exclude 'page-data/*.json' \
  --exclude 'sw.js' \
  --cache-control 'public,max-age=31536000,s-maxage=31536000,immutable' \
  --delete

aws s3 sync ../public $target_bucket \
  --exclude '*' \
  --include '*.html' \
  --include 'page-data/*.json' \
  --include 'sw.js' \
  --cache-control 'public,no-cache' \
  --delete
