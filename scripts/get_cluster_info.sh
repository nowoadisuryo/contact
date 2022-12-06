#!/bin/bash
SERVICES_OBJ=$(aws ecs describe-services --cluster "${ECS_CLUSTER_NAME}" --services "${ECS_SERVICE_NAME}")
VPC_CONF_OBJ=$(echo $SERVICES_OBJ | jq '.services[].networkConfiguration.awsvpcConfiguration')
SUBNET_ONE=$(echo "$VPC_CONF_OBJ" | jq '.subnets[0]')
SUBNET_TWO=$(echo "$VPC_CONF_OBJ" | jq '.subnets[1]')
SECURITY_GROUP_IDS=$(echo "$VPC_CONF_OBJ" | jq '.securityGroups[0]')
CLUSTER_NAME=$(echo "$SERVICES_OBJ" | jq '.services[].clusterArn')
echo "export SUBNET_ONE=$SUBNET_ONE" >>$BASH_ENV
echo "export SUBNET_TWO=$SUBNET_TWO" >>$BASH_ENV
echo "export SECURITY_GROUP_IDS=$SECURITY_GROUP_IDS" >>$BASH_ENV=$SECURITY_GROUP_IDS=$SECURITY_GROUP_IDS" >> $BASH_ENV" >>$BASH_ENV
echo "export CLUSTER_NAME=$CLUSTER_NAME" >>$BASH_ENV