pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'amaysim/serverless:1.27.1'
                }
            }
            steps {
                sh 'npm build'
            }
        }
        stage('Deploy - Dev') {
            agent {
                docker {
                    image 'amaysim/serverless:1.27.1'
                }
            }
            steps {
                withAWS(credentials:'diligentsoft') {
                    sh 'npm install serverless-offline --save-dev'
                    sh 'sls deploy --stage dev'
                }
            }
        }
        stage('Acceptance Test - Dev') {
            agent {
                docker {
                    image 'ruby:2.5.0-alpine3.7'
                }
            }
            steps {
                dir('acceptance') {
                    sh 'bundle install'
                    sh 'ENVIRONMENT=dev cucumber features/flytipping.feature'
                }
            }
        }
        stage('Sanity check') {
            steps {
                input "Does the dev environment look ok? Deploy to prod?"
            }
        }
        stage('Deploy - Prod') {
            agent {
                docker {
                    image 'amaysim/serverless:1.27.1'
                }
            }
            steps {
                withAWS(credentials:'diligentsoft') {
                    sh 'sls deploy --stage prod'
                }
            }
        }
    }
}
