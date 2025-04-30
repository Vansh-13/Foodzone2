pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vansh967/frontend2'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'  // Replace with your DockerHub credentials
    }

    stages {
        // Stage to clone the repository (if applicable)
        stage('Clone Repo') {
            steps {
                echo 'Cloning the repository...'
                git 'https://github.com/Vansh-13/Foodzone2.git'  // Update with the actual repository URL if needed
            }
        }

        // Stage to build the Docker image from frontend directory
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t ${IMAGE_NAME} ./frontened'  // Building Docker image from the frontend folder
            }
        }

        // Stage to push the Docker image to DockerHub
        stage('Push to DockerHub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: DOCKER_CREDENTIALS_ID, url: 'https://index.docker.io/v1/') {
                        echo 'Pushing Docker image to DockerHub...'
                        bat 'docker push ${IMAGE_NAME}'  // Push the Docker image to DockerHub
                    }
                }
            }
        }

        // Stage to deploy using Docker Compose
        stage('Deploy with Docker Compose') {
            steps {
                echo 'Deploying with Docker Compose...'
                bat '''
                    docker-compose -f C:/Users/Vansh Madaan/Desktop/QuickPick/docker-compose.yml down
                    docker-compose -f C:/Users/Vansh Madaan/Desktop/QuickPick/docker-compose.yml up -d
                '''
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
