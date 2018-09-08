pipeline {
    agent {
        docker {
            image 'amaysim/serverless'
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
                sh 'sls deploy --stage dev'
            }
        }
        stage('Sanity check') {
            steps {
                input "Does the dev environment look ok? Deploy to prod?"
            }
        }
        stage('Deploy - Prod') {
            steps {
                sh 'sls deploy --stage prod'
            }
        }
    }
}
