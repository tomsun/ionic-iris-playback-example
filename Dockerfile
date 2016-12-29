FROM node:6

RUN set -ex \
	&& echo 'deb http://ftp.debian.org/debian jessie-backports main' > /etc/apt/sources.list.d/jessie-backports.list \
	&& apt-get update \
	&& apt-get -t jessie-backports install -y \
		openjdk-8-jdk

# ---8<-------------------------------------------------------------------------
# Android SDK - based on:
# https://github.com/gfx/docker-android-project/blob/48422d32ab8208520a04b247d2085cdc23b82954/Dockerfile
# ------------------------------------------------------------------------------
# Install dependencies
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -yq libc6:i386 libstdc++6:i386 zlib1g:i386 libncurses5:i386 --no-install-recommends && \
    apt-get clean

# Download and untar SDK
ENV ANDROID_SDK_URL http://dl.google.com/android/android-sdk_r24.4.1-linux.tgz
RUN curl -L "${ANDROID_SDK_URL}" | tar --no-same-owner -xz -C /usr/local
ENV ANDROID_HOME /usr/local/android-sdk-linux
ENV ANDROID_SDK /usr/local/android-sdk-linux
ENV PATH ${ANDROID_HOME}/tools:$ANDROID_HOME/platform-tools:$PATH

# Install Android SDK components

# License Id: android-sdk-license-ed0d0a5b
ENV ANDROID_COMPONENTS platform-tools,build-tools-23.0.3,build-tools-24.0.0,build-tools-24.0.2,android-23,android-24
# License Id: android-sdk-license-5be876d5
ENV GOOGLE_COMPONENTS extra-android-m2repository,extra-google-m2repository

RUN echo y | android update sdk --no-ui --all --filter "${ANDROID_COMPONENTS}" ; \
    echo y | android update sdk --no-ui --all --filter "${GOOGLE_COMPONENTS}"
# ------------------------------------------------------------------------->8---

RUN set -ex \
	&& npm install -g \
		cordova \
		ionic

ARG workdir
WORKDIR $workdir
