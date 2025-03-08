#!/bin/sh
# Wait for PostgreSQL to be ready
until pg_isready -h db -U pgdb -d certificate_db; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done
echo "PostgreSQL is ready!"

# Start the NestJS application
exec npm run start:dev