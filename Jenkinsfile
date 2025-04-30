pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vansh967/frontend2'  // Updated image name
        TAG = 'v1'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'  // Your Docker Hub credentials
    }

    stages {
        // Stage to clone the repository
        stage('Clone Repo') {
            steps {
                echo 'Cloning the repository...'
                git 'https://github.com/Vansh-13/Foodzone2.git'  // Update with your actual repository
            }
        }

        // Stage to build the Docker image for frontend
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building frontend Docker image...'
                    bat "docker build -t ${IMAGE_NAME}:${TAG} ./frontend"  // Build the image from the frontend directory
                }
            }
        }

        // Stage to push the Docker image to DockerHub
        stage('Push to DockerHub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: 'https://index.docker.io/v1/') {
                        echo 'Pushing Docker image to DockerHub...'
                        bat "docker push ${IMAGE_NAME}:${TAG}"  // Push the built image to Docker Hub
                    }
                }
            }
        }

        // Stage to deploy the frontend using Docker Compose (Optional)
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo 'Deploying with Docker Compose...'
                    bat "docker-compose -f docker-compose.yml up -d"  // Start the frontend container with Docker Compose
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
