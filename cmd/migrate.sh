#!/usr/bin/env sh
echo "Migrating prisma schema"
npx prisma migrate dev --name init
