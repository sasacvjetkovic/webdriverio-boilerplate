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
        stage('Run Android E2E tests on SauceLabs') {
            steps {
                sh 'yarn android-saucelabs'
            }
        }
    }
}