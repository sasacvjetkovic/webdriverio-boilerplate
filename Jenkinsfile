#!/usr/bin/env groovy
@Library('parsable') _
pod(label: 'react-build-test').container(['node', 'generic', 'sonar']).container([name: 'react-build-test', image: getImageName('android/reactnative-builder:1.1-feature-pe-1046'), command: ['cat'], tty: true]).build {
  container('node') {
    stage("Checkout Code") {
      checkout scm
    }
    stage("yarn install") {
      npmAuth()
      sh "yarn install"
    }
    stage("coverage") {
      sh "yarn test"
      runSonarAnalysis()
    }

   // container("react-build-test") {
      stage('Build apps and upload them to Saucelabs') {
        parallel(
        android: {
          container("react-build-test") {
          sh "mkdir builds && cd builds && mkdir android"
          sh "cd android && ./gradlew --refresh-dependencies clean cleanBuildCache assemble"
          sh "cp -r android/app/build/outputs/apk/* builds/android"

          // upload to saucelabs
          withCredentials([usernamePassword(credentialsId: 'SAUCELAB_CREDENTIALS', passwordVariable: 'SAUCE_PASSWORD', usernameVariable: 'SAUCE_USERNAME')]) {
                stage("Upload To Saucelabs"){
                    sh "cd builds/android/release && ls -la"
                    sh """
                    curl -u ${SAUCE_USERNAME}:${SAUCE_PASSWORD} -X POST -H "Content-Type:application/octet-stream" "https://saucelabs.com/rest/v1/storage/parsableAdmin/reactDemo.apk?overwrite=true" --data-binary @builds/android/release/app-release.apk
                    """
                }
            }
          }
        },
        ios: {
          build job: 'automation/do_not_touch/demoapp/ios_build_reactDemo'
        })
      }

      stage('Run E2E tests') {
        parallel(
        android: {
          sh 'yarn as'
        },
        ios: {
          sh 'yarn is'
        })
      }

      stage('Upload to Artifactory') {
        parallel(
        android: {
          container("react-build-test") {
            def gitProps = getGitProps()
            uploadArtifactoryGeneric(
            repo: 'react-native', target: "${gitProps.gitBranch}", files: 'builds/android/**/*.apk')
          }
        },
        ios: {
          withCredentials([string(credentialsId: 'buddy_build_token', variable: 'TOKEN')]) {
          sh "curl --insecure -X POST -H 'Authorization: Bearer ${TOKEN}' https://api.buddybuild.com/v1/apps/5fd3c351ec6be0000191ff33/builds --data-urlencode 'branch=develop'"
        }
      })
    }
  }
}