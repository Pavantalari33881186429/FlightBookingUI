pipeline {
    agent any

    environment {
        NODE_VERSION = '14.x'
    }

    stages {
        stage('Get code from Git'){
       steps{
           
           git branch: 'main', url: 'https://github.com/Pavantalari33881186429/FlightBookingUI.git'
       }
    }

        stage('Install Node.js') {
            steps {
                script {
                    def nodeInstaller = tool name: 'NodeJS', type: 'NodeJSInstallation'
                    env.PATH = "${nodeInstaller}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/**', allowEmptyArchive: false
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
