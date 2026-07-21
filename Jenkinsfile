pipeline {
    agent any
    
    environment {
        // Make sure to replace this with your actual storage account name ($STG)
        AZ_ACCOUNT = '<youruniquestorage>' 
        AZ_SHARE = 'webcontent'
    }
    
    stages {
        stage('Checkout') { 
            steps { 
                checkout scm 
            } 
        }
        
        stage('Deploy to ACI (file share)') {
            steps {
                withCredentials([string(credentialsId: 'azure-storage-key', variable: 'AZ_KEY')]) {
                    // Using single quotes (''') ensures Bash handles the variable interpolation safely
                    sh '''
                        az storage file upload-batch \
                          --account-name "$AZ_ACCOUNT" \
                          --account-key "$AZ_KEY" \
                          --destination "$AZ_SHARE" \
                          --source . \
                          --pattern "*.html" \
                          --no-progress
                    '''
                }
            }
        }
    }
}
