pipeline {
    agent any 
    stages {
        stage('Hello World') {
            steps {
                echo 'Hello world!'
            }
        }
        stage('Yarn install') {
            steps {
                sh 'yarn install'
            }
        }
        /*stage('Run Android E2E tests on SauceLabs') {
            steps {
                sh 'yarn android-saucelabs'
            }
        }
        stage('Run iOs E2E tests on SauceLabs') {
            steps {
                sh 'yarn ios-saucelabs'
            }
        }*/
        stage('Run Android/iOS E2E tests on SauceLabs') {
            steps {
                parallel(
                    android: {
                        sh 'yarn android-saucelabs'
                    },
                    ios: {
                        sh 'yarn ios-saucelabs'
                    }
                )
            }
        }
    }
}