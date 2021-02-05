pipeline {
    agent any 
    stages {
        stage('1st stage') {
            stage('Stage inside 1st stage') {
                steps {
                    echo 'I am echo inside nested stage'
                }
            }
            steps {
                echo 'I am echo from 1st stage'
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
            post {
                always {
                    script {
                        allure([
                            includeProperties: false,
                            jdk: '',
                            properties: [],
                            reportBuildPolicy: 'ALWAYS',
                            results: [[path: 'test/report/allure-results']]
                        ])
                    }
                }
            }
        }
    }
}