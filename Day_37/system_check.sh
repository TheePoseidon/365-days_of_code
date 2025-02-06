#!/bin/bash

echo "🔍 System Health Check - $(date)"
echo "--------------------------------"

# Check system uptime
echo "⏳ Uptime:"
uptime -p
echo "--------------------------------"

# Check disk usage
echo "💾 Disk Usage:"
df -h | grep '^/dev'
echo "--------------------------------"

# Check CPU load
echo "🔥 CPU Load:"
top -bn1 | grep "load average"
echo "--------------------------------"

# Show running processes (top 5)
echo "🚀 Top 5 Running Processes:"
ps -eo pid,comm,%cpu --sort=-%cpu | head -6
echo "--------------------------------"

echo "✅ Health check complete!"
