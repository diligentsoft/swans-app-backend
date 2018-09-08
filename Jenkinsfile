pipeline {
    agent {
        docker {
            image 'amaysim/serverless:1.27.1'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm build'
            }
        }
        stage('Deploy - Dev') {
            steps {
                withAWS(credentials:'diligentsoft') {
                    sh 'npm install serverless-offline --save-dev'
                    sh 'sls deploy --stage dev'
                }
            }
        }
        stage('Sanity check') {
            steps {
                input "Does the dev environment look ok? Deploy to prod?"
            }
        }
        stage('Deploy - Prod') {
            steps {
                withAWS(credentials:'diligentsoft') {
                    sh 'sls deploy --stage prod'
                }
            }
        }
    }
}
