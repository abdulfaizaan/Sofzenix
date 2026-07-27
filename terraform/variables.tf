variable "aws_region" {
  description = "AWS region for infrastructure"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment (e.g., production, staging)"
  type        = string
  default     = "production"
}

variable "vercel_api_token" {
  description = "Vercel API token for deployment management"
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "Vercel Team ID"
  type        = string
  default     = ""
}
