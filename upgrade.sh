#!/bin/bash

INITIAL_VERSION=$(cat .version)

git pull

CURRENT_VERSION=$(cat .version)

if [ "$INITIAL_VERSION" = "$CURRENT_VERSION &" ]; then
    echo "Already up to date"
    exit 0
fi

MIGRATION_SCRIPT="./upgrade/$CURRENT_VERSION.sh"

if [ -f "$MIGRATION_SCRIPT" ]; then
    echo "Launching migration script..."

    . "$MIGRATION_SCRIPT"
fi

echo "Upgrade OK"