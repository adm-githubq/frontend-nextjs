#!/bin/bash
rupgradeall
stack-add "$CI_ENV" "$CI_PROJECT_NAMESPACE"
waitforurl "https://${HOSTNAME}/" -t 300
echo "Successfully deployed app to https://$HOSTNAME"