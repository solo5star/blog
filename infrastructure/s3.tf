resource "aws_s3_bucket" "main" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "default" {
  bucket = aws_s3_bucket.main.id

  block_public_acls   = false
  block_public_policy = false
}

resource "aws_s3_bucket_policy" "default" {
  bucket     = aws_s3_bucket.main.id
  depends_on = [aws_s3_bucket_public_access_block.default]
  policy     = data.aws_iam_policy_document.default.json
}

resource "aws_s3_bucket_website_configuration" "default" {
  bucket = aws_s3_bucket.main.id

  index_document {
    suffix = "index.html"
  }
}

data "aws_iam_policy_document" "default" {
  statement {
    sid = "Allow all HTTP traffic from internet"
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject"
    ]
    resources = [
      "${aws_s3_bucket.main.arn}/*"
    ]
    effect = "Allow"
  }
}
