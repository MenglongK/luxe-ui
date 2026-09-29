#!/bin/bash

# Define Bold Green and Reset color codes
BOLD_GREEN=$'\033[1;32m'
RESET=$'\033[0m'

git add .

read -p "Enter commit message: " msg
git commit -m "$msg"

# List all local branches with the current branch in BOLD GREEN
echo -e "\nAvailable branches:"
git -c color.branch=always -c color.branch.current="bold green" branch
echo ""

# Get the current branch name
current_branch=$(git branch --show-current)

# Show current branch in BOLD GREEN; press Enter to use it as default
read -p "Enter branch (current: ${BOLD_GREEN}${current_branch}${RESET}): " branch
branch=${branch:-$current_branch}

git push -u origin "$branch"