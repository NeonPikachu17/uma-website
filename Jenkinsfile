pipeline {
    agent any
    
    environment {
        // Replace with your actual storage account name
        AZ_ACCOUNT = 'neonstorage67' 
        AZ_SHARE = 'webcontent'
    }
    
    stages {
        stage('Checkout') { 
            steps { 
                checkout scm 
            } 
        }
        
        stage('Install Dependencies') {
            steps {
                // Installs the React/Vite packages defined in package.json
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                // Compiles the React app. Vite defaults the output to a 'dist' folder
                sh 'npm run build'
            }
        }
        
        stage('Deploy to ACI (file share)') {
            steps {
                withCredentials([string(credentialsId: 'azure-storage-key', variable: 'AZ_KEY')]) {
                    // Uploads the entire contents of the 'dist' folder
                    sh '''
                        az storage file upload-batch \
                          --account-name "$AZ_ACCOUNT" \
                          --account-key "$AZ_KEY" \
                          --destination "$AZ_SHARE" \
                          --source dist \
                          --pattern "*" \
                          --no-progress
                    '''
                }
            }
        }
    }
}
