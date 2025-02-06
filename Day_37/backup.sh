#!/bin/bash

# Source directory (change this to the folder you want to back up)
SOURCE_DIR="$HOME/Documents"

# Destination directory
BACKUP_DIR="$HOME/Backups"

# Create backup folder if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Generate filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

# Create backup
tar -czf "$BACKUP_FILE" "$SOURCE_DIR"

# Confirmation message
echo "✅ Backup completed: $BACKUP_FILE"
