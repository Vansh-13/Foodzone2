pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'vansh967/backend2'
        FRONTEND_IMAGE = 'vansh967/frontend2'
        ADMIN_IMAGE = 'vansh967/admin2'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Vansh-13/Foodzone2.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    docker.build(env.BACKEND_IMAGE, './backened')
                    docker.build(env.FRONTEND_IMAGE, './frontened')
                    docker.build(env.ADMIN_IMAGE, './admin')
                }
            }
        }

        stage('Login to DockerHub and Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    script {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh "docker push ${BACKEND_IMAGE}"
                        sh "docker push ${FRONTEND_IMAGE}"
                        sh "docker push ${ADMIN_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful from Foodzone2!'
        }
        failure {
            echo '❌ Deployment failed. Check the logs.'
        }
    }
}
