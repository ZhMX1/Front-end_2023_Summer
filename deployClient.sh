#!/bin/bash

remote_host="10.251.253.227"
remote_user="buaa"
remote_script="/home/buaa/2023Summer/deployServer.sh"
param="frontend"

ssh -o StrictHostKeyChecking=no $remote_user@$remote_host $remote_script $param