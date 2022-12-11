OLD_TASK_IDS=$(aws ecs list-tasks --cluster contact-app-cluster --desired-status RUNNING --family contact-app-task | egrep "task/" | sed -E "s/.*task\/(.*)\"/\1/" | sed -z 's/\n/ /g')
IFS=', ' read -r -a array <<< "$OLD_TASK_IDS"
for element in "${array[@]}"
do
    aws ecs stop-task --cluster contact-app-cluster --task ${element}
done