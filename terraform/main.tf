# -----------------------------------------------------------------------------
# AWS Infrastructure (S3 Backups)
# -----------------------------------------------------------------------------

resource "aws_s3_bucket" "db_backups" {
  bucket = "sofzenix-db-backups-${var.environment}"
}

resource "aws_s3_bucket_lifecycle_configuration" "backup_lifecycle" {
  bucket = aws_s3_bucket.db_backups.id

  rule {
    id     = "expire_old_backups"
    status = "Enabled"

    expiration {
      days = 30
    }
  }
}

resource "aws_s3_bucket_public_access_block" "db_backups_block" {
  bucket = aws_s3_bucket.db_backups.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# -----------------------------------------------------------------------------
# Vercel Configuration
# -----------------------------------------------------------------------------

resource "vercel_project" "sofzenix_frontend" {
  name      = "sofzenix-frontend-${var.environment}"
  framework = "nextjs"
  team_id   = var.vercel_team_id != "" ? var.vercel_team_id : null

  git_repository = {
    type = "github"
    repo = "sofzenix/monorepo"
  }

  build_command = "npm run build --workspace=frontend"
  root_directory = "frontend"
}

resource "vercel_project" "sofzenix_backend" {
  name      = "sofzenix-backend-${var.environment}"
  framework = "nextjs"
  team_id   = var.vercel_team_id != "" ? var.vercel_team_id : null

  git_repository = {
    type = "github"
    repo = "sofzenix/monorepo"
  }

  build_command = "npm run build --workspace=backend"
  root_directory = "backend"
}
