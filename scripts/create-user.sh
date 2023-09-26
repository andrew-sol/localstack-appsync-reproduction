#!/bin/bash

set -e

export AWS_DEFAULT_REGION=eu-west-1

# Check if the email parameter is provided and not empty
if [ -z "$1" ]; then
  echo "Error: Please provide an email address."
  exit 1
fi

password="12345678Aa!"

echo "Email: $1"
echo "Password: $password"

source ./init.sh

awslocal cognito-idp sign-up \
  --client-id $cid \
  --username $1 \
  --password $password \
  --user-attributes Name=name,Value=John

#awslocal cognito-idp confirm-sign-up \
#  --client-id $cid \
#  --username $1 \
#  --confirmation-code 829538
