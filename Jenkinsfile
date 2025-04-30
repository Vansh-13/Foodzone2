pipeline {
    agent any

    stages {
        // Stage to clone the repository
        stage('Clone Repo') {
            steps {
                echo 'Cloning repository...'
                git 'https://github.com/Vansh-13/Foodzone2.git'  // Repository URL
            }
        }

        // Stage to build the Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    bat 'docker build -t frontend2 .'  // Build the image without a tag
                }
            }
        }

        // Stage to push the Docker image to DockerHub
        stage('Push to DockerHub') {
            steps {
                script {
                    echo 'Pushing Docker image to DockerHub...'
                    bat 'docker push frontend2'  // Push the image to DockerHub
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed. Check the logs for more details.'
        }
    }
}
