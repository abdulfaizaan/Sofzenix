# SOFZENIX IT Solutions LLP - Database Backup Strategy

Since the application uses PostgreSQL (hosted on Neon or a similar provider), a robust backup strategy is critical to prevent data loss and ensure disaster recovery capability.

## 1. Automated Managed Backups (Recommended)

If using a managed PostgreSQL provider like Neon, AWS RDS, or Vercel Postgres, leverage their built-in backup and Point-in-Time Recovery (PITR) features.

- **Neon:** Neon automatically retains history based on the plan (e.g., 7 days on free/launch, more on pro). You can branch the database to any point in time within the retention period.
- **AWS RDS:** Enable Automated Backups with a retention period of at least 7-30 days.
- **Vercel Postgres:** Uses Neon under the hood. Relies on point-in-time recovery via branching.

## 2. Logical Backups (pg_dump)

For an additional layer of security or if self-hosting, configure a cron job to run `pg_dump` daily and upload the backup to cloud storage (e.g., AWS S3).

### Example Backup Script (`backup.sh`)
```bash
#!/bin/bash
# A simple script to backup the PostgreSQL database

DB_URL=$DATABASE_URL
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="backup_${TIMESTAMP}.sql"

echo "Starting backup to ${BACKUP_FILE}..."
pg_dump $DB_URL > $BACKUP_FILE

# Compress the backup
gzip $BACKUP_FILE

# (Optional) Upload to S3
# aws s3 cp ${BACKUP_FILE}.gz s3://sofzenix-db-backups/

echo "Backup completed successfully."
```

## 3. Disaster Recovery Plan

1. **Recovery Point Objective (RPO):** Maximum of 24 hours (with daily logical backups) or 5 minutes (with PITR).
2. **Recovery Time Objective (RTO):** Under 2 hours.
3. **Procedure:**
   - In case of data corruption, use the managed provider's PITR feature to restore the database to the moment before the corruption occurred.
   - If the entire database instance is lost, spin up a new instance and restore from the latest `pg_dump` logical backup stored in S3.
