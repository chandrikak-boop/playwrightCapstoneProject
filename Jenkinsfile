pipeline {
    agent any

    tools {
        nodejs 'node20'   // Jenkins NodeJS tool name
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    npx playwright test ./tests/sauce_labs.spec.ts
                    npx playwright test ./tests/login_negativeTesting.spec.ts
                    npx playwright test ./tests/flipkart_flights.spec.ts
                    TEST_ENV=api npx playwright test ./tests/apitesting_restful.spec.ts
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        failure {
            echo 'Playwright tests failed'
        }
        success {
            echo 'Playwright tests passed'
        }
    }
}