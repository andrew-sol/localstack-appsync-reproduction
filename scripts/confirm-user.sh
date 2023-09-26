#!/bin/bash

set -e

export AWS_DEFAULT_REGION=eu-west-1

if [ -z "$1" ]; then
  echo "Error: Please provide user email as the first arg."
  exit 1
fi

if [ -z "$2" ]; then
  echo "Error: Please provide confirmation code as the second arg."
  exit 1
fi

password="12345678Aa!"

echo "Email: $1"
echo "Confirmation code: $2"

source ./init.sh

awslocal cognito-idp confirm-sign-up \
  --client-id $cid \
  --username $1 \
  --confirmation-code $2
