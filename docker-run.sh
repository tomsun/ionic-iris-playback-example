#!/bin/bash

set -e

cd `dirname $0`
project_name=`basename "$PWD"`
image_id="$project_name-$RANDOM"
workdir="/opt/$project_name"

cleanup() {
	docker rmi -f --no-prune $image_id
}

docker build \
	-t $image_id \
	-f ./Dockerfile \
	--build-arg "workdir=$workdir" \
	.

docker run \
	-ti \
	-v $(pwd):$workdir \
	--rm \
	$image_id \
	$@ || { cleanup ; exit 1 ; }

cleanup
