// GitHub push -> webhook -> Jenkins -> Build (Vite) -> SSH/rsync -> Apache servers (/var/www/html)

pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        // Target server IPs
        WEB_SERVERS   = '20.83.153.128 172.208.67.151' 
        DOCROOT       = '/var/www/html'
        
        // Point APP_SRC to dist/ where Vite outputs built static assets
        APP_SRC       = 'dist/'
        
        // Jenkins Credential ID for Password Auth
        CREDENTIAL_ID = 'webservers-ssh-password'
    }

    stages {

        stage('Checkout') {
            steps { 
                checkout scm 
            }
        }

        stage('Build & Test') {
            steps {
                // Install dependencies and build static production assets into dist/
                sh '''
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.CREDENTIAL_ID, usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
                    sh '''
                        set -eu
                        SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
                        
                        for SERVER in ${WEB_SERVERS}; do
                            TARGET="${SSH_USER}@${SERVER}"
                            echo "=== Deploying built dist/ to ${TARGET}:${DOCROOT} ==="
                            
                            # Note the trailing slash on ${APP_SRC} to copy contents of dist/ into /var/www/html/
                            rsync -az --delete \
                                -e "sshpass -p '${SSH_PASS}' ssh ${SSH_OPTS}" \
                                --rsync-path="sudo rsync" \
                                "${APP_SRC}" "${TARGET}:${DOCROOT}/"
                            
                            sshpass -p "${SSH_PASS}" ssh ${SSH_OPTS} "${TARGET}" "sudo systemctl reload apache2"
                            
                            echo "=== ${TARGET} updated successfully ==="
                        done
                    '''
                }
            }
        }
    }
}
