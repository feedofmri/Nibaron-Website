#!/bin/bash
set -e

echo "Starting Apache web server..."

# Just start Apache - no Laravel setup for now
exec apache2-foreground
