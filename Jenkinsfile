pipeline {
    agent any

    environment {
        // Set environment variables for your DockerHub credentials (if needed)
        DOCKER_HUB_USERNAME = 'your-docker-hub-username'
        DOCKER_HUB_PASSWORD = 'your-docker-hub-password'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the code from GitHub..."
                git 'https://github.com/Vansh-13/Foodzone2.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building backend, frontend, and admin Docker images..."
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    echo "Pushing Docker images to Docker Hub..."

                    // Login to DockerHub
                    sh "echo $DOCKER_HUB_PASSWORD | docker login --username $DOCKER_HUB_USERNAME --password-stdin"
                    
                    // Push backend image
                    sh 'docker push vansh967/backend2'
                    
                    // Push frontend image
                    sh 'docker push vansh967/frontend2'
                    
                    // Push admin image
                    sh 'docker push vansh967/admin2'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    echo "Deploying services with Docker Compose..."
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }

        failure {
            echo "Deployment failed. Please check the logs for more details."
        }
    }
}
