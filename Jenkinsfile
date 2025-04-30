pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vansh967/frontend2'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the GitHub repository...'
                git 'https://github.com/Vansh-13/Foodzone2.git'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"
                }
            }
        }

        stage('Pull Latest Image') {
            steps {
                echo 'Pulling latest Docker image...'
                bat "docker pull %IMAGE_NAME%"
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo 'Deploying application using Docker Compose...'
                bat '''
                    docker-compose down
                    docker-compose up -d
                '''
            }
        }
    }

    post {
        success {
            echo '🚀 Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed. Please check logs.'
        }
    }
}
