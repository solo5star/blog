variable "bucket_name" {
  type        = string
  description = "The name of the target bucket where static files will be deployed"
}

variable "domain_name" {
  type        = string
  description = "The domain name that will be connected to CloudFront."
}
