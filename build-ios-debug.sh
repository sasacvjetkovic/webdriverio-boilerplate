#!/bin/bash
BUILD_PATH='/Users/'$USER'/Documents/tmp_build'
APP_PATH='/builds/ios'
APP_NAME='reactDemo'
DEVICE_UUID=$(xcrun simctl list devices|grep "iPhone 11"|grep -Eo "[0-9A-F\-]{36}"|head -n 1)
OS=$( xcrun simctl list devices|grep "iOS"|grep -Eo "[0-9\.]{4}"|head -n 1)

echo 'create builds/ios folders if they do not exist'
mkdir -p .$APP_PATH

echo 'Remove old app version if exists in /builds/ios'
rm -rf .$APP_PATH/*

echo 'Create temporary folder where ios build will be generated.'
mkdir -p $BUILD_PATH

echo 'Enter into ios folder'
cd ios

echo 'Remove old pods'
rm -rf Pods

# not used locally
# echo 'Install cocoapods'
# install cocoapods

echo 'Install pod'
pod install

echo 'Build .app'
xcodebuild -workspace "$APP_NAME.xcworkspace" -scheme $APP_NAME -configuration "Debug" -destination "platform=iOS Simulator,OS=$OS,id=$DEVICE_UUID" -derivedDataPath $BUILD_PATH

echo 'Copy generated .app file into project structure'
cp -R $BUILD_PATH'/Build/Products/Debug-iphonesimulator/'$APP_NAME'.app' ../$APP_PATH

echo 'Remove temporary folder'
rm -rf $BUILD_PATH