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

nmdir="./example/node_modules"
if [ -d $nmdir ]
then
	echo
	echo "Local node_modules/ directory exists ($nmdir) - using it and assuming it is maintained."
	echo "To instead rely on pre-installed modules in the Docker image, remove directory $nmdir"
	echo "and re-create the Docker container."
	echo
elif [ ! -L $nmdir ]
then
	ln -s /tmp/node_modules $nmdir
fi

docker run \
	-ti \
	-p "7816:7816" \
	-p "7817:7817" \
	-p "7818:7818" \
	-v $(pwd):$workdir \
	-v $(pwd)/android-sdk-config:/root/.android \
	-v $(pwd)/gradle:/root/.gradle \
	--rm \
	$image_id \
	$@ || { cleanup ; exit 1 ; }

cleanup
