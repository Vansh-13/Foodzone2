pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vansh967/frontend2'  // Docker image ka naam
        TAG = 'v1'  // Docker image ka tag
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'  // Docker Hub credentials ID
    }

    stages {
        // Stage to clone the repository
        stage('Clone Repo') {
            steps {
                echo 'Cloning the repository...'
                git 'https://github.com/Vansh-13/Foodzone2.git'  // Aapka repository URL
            }
        }

        // Stage to build the Docker image for frontend
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building frontend Docker image...'
                    bat "docker build -t ${IMAGE_NAME}:${TAG} ./frontend"  // Image ko frontend folder se build karna
                }
            }
        }

        // Stage to push the Docker image to DockerHub
        stage('Push to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        echo 'Pushing Docker image to DockerHub...'
                        bat "docker tag ${IMAGE_NAME}:${TAG} ${DOCKER_USER}/${IMAGE_NAME}:${TAG}"  // Tagging the image with Docker Hub username
                        bat "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"  // Login to Docker Hub
                        bat "docker push ${DOCKER_USER}/${IMAGE_NAME}:${TAG}"  // Image ko push karna Docker Hub pe
                    }
                }
            }
        }

        // Stage to deploy the frontend using Docker Compose (Optional)
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo 'Deploying with Docker Compose...'
                    bat "docker-compose -f docker-compose.yml up -d"  // Docker Compose se container start karna
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
