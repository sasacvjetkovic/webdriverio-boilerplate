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
                sh 'apt-get update'
                sh 'apt-get -y upgrade'
                sh 'apt-get dist-upgrade'
                sh 'apt-get -y install build-essential'
                sh 'apt-get install sudo'
                sh 'curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -'
                sh 'sudo apt-get install -y nodejs'
                sh 'apt-get install npm'
                sh 'npm -v'
                sh 'sudo apt remove cmdtest -y'
                sh 'sudo apt remove yarn -y'
                sh 'curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -'
                sh 'echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list'
                sh 'sudo apt-get update'
                sh 'sudo apt-get install yarn -y'
                sh 'yarn --version'*/
                sh 'yarn install'
            }
        }
        stage('Run iOS E2E tests on SauceLabs') {
            steps {
                sh 'yarn ios-saucelabs'
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