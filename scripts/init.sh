#!/bin/bash

export AWS_DEFAULT_REGION=eu-west-1

export pid=$(awslocal cognito-idp list-user-pools --max-results 1 --region eu-west-1 | jq -rc '.UserPools[0].Id')

export cid=$(awslocal cognito-idp list-user-pool-clients --user-pool-id $pid | jq -rc '.UserPoolClients[0].ClientId')

echo "User Pool Client Id:"
echo $cid
