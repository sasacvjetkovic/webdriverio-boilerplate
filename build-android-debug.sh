#!/bin/bash
APP_PATH='/builds/android'

echo 'create builds/android folders if they do not exist'
mkdir -p .$APP_PATH

echo 'Remove old app version if exists in /builds/android'
rm -rf .$APP_PATH/*

echo 'Enter into android folder'
cd android

echo 'Build android'
./gradlew --refresh-dependencies clean cleanBuildCache assemble

echo 'Copy generated android files into project structure'
cp -R ../android/app/build/outputs/apk/* ../$APP_PATH
