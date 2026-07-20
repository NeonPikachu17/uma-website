// GitHub push -> webhook -> Jenkins -> Vite Build -> SSH/rsync -> Apache servers (/var/www/html)

pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        // Target server IPs
        SERVERS = 'msbernabe@20.83.153.128 msbernabe@172.208.67.151'
        DOCROOT = '/var/www/html'
        APP_SRC = 'dist/'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                sh '''
                    npm ci
                    npm run build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: ['webservers-ssh-key']) {
                    sh '''
                        set -eu
                        SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
                        
                        for HOST in ${SERVERS}; do
                            echo "=== Deploying dist/ to ${HOST}:${DOCROOT} ==="
                            
                            # Sync static dist/ files to Apache docroot
                            rsync -az --delete -e "ssh ${SSH_OPTS}" --rsync-path="sudo rsync" \
                                "${APP_SRC}" "${HOST}:${DOCROOT}/"
                            
                            # Reload Apache
                            ssh ${SSH_OPTS} "${HOST}" "sudo systemctl reload apache2"
                            
                            echo "=== ${HOST} updated successfully ==="
                        done
                    '''
                }
            }
        }
    }
}
