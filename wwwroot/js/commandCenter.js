document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const apiProviderSelect = document.getElementById('apiProviderSelect');
    const apiKeyButton = document.getElementById('apiKeyButton');
    const apiKeyModal = new bootstrap.Modal(document.getElementById('apiKeyModal'), {});
    const saveApiKeyButton = document.getElementById('saveApiKeyButton');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const rememberKeyCheck = document.getElementById('rememberKeyCheck');
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const providerLabel = document.getElementById('apiProviderLabel');

    // Command elements
    const commandTextarea = document.getElementById('commandTextarea');
    const executeButton = document.getElementById('executeButton');
    const attachButton = document.getElementById('attachButton');
    const characterCount = document.querySelector('.character-count');
    const messagesContainer = document.getElementById('messagesContainer');
    const suggestionsDisplay = document.getElementById('suggestionsDisplay');
    const suggestionButtons = document.querySelectorAll('.suggestion-button');
    
    // Document upload elements
    const documentUploadModal = new bootstrap.Modal(document.getElementById('documentUploadModal'), {});
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const uploadFilesButton = document.getElementById('uploadFilesButton');
    
    // Messages array
    let messages = [];
    let uploadedDocuments = [];
    
    // Set up event listeners
    apiProviderSelect.addEventListener('change', updateApiProvider);
    apiKeyButton.addEventListener('click', () => {
        providerLabel.textContent = apiProviderSelect.value === 'mistral' ? 'Mistral API Key' : 'OpenAI API Key';
        apiKeyModal.show();
    });
    saveApiKeyButton.addEventListener('click', saveApiKey);
    
    commandTextarea.addEventListener('input', updateCharacterCount);
    executeButton.addEventListener('click', executeCommand);
    attachButton.addEventListener('click', () => documentUploadModal.show());
    
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestion = this.closest('.suggestion-card').querySelector('p').textContent.replace(/^"(.+)"$/, '$1');
            commandTextarea.value = suggestion;
            updateCharacterCount();
        });
    });
    
    // Initialize character count
    updateCharacterCount();
    
    // Setup file upload
    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', handleDragOver);
    uploadZone.addEventListener('drop', handleFileDrop);
    fileInput.addEventListener('change', handleFileSelect);
    uploadFilesButton.addEventListener('click', uploadFiles);
    
    // Setup resizable panels
    const messagesPanel = document.getElementById('messagesPanel');
    const commandPanel = document.getElementById('commandPanel');
    const resizerHandle = document.getElementById('resizerHandle');
    
    resizerHandle.addEventListener('mousedown', initResize);
    
    // Initialize API provider
    updateApiProvider();
    
    // Functions
    function updateApiProvider() {
        const provider = apiProviderSelect.value;
        
        if (provider === 'mistral') {
            statusText.textContent = 'Using Mistral LLM';
            statusIndicator.className = 'status-indicator mistral-status';
            apiKeyButton.style.display = 'block'; // We want to configure API keys for both providers
        } else {
            statusText.textContent = 'Using OpenAI';
            statusIndicator.className = 'status-indicator openai-status';
            apiKeyButton.style.display = 'block';
        }
    }
    
    function saveApiKey() {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            alert('Please enter a valid API key');
            return;
        }
        
        const provider = apiProviderSelect.value;
        
        // Save API key
        if (rememberKeyCheck.checked) {
            localStorage.setItem(`${provider}_api_key`, apiKey);
        } else {
            sessionStorage.setItem(`${provider}_temp_key`, apiKey);
        }
        
        // Send to server
        fetch('/CommandCenter/SaveApiKey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                apiKey: apiKey,
                provider: provider
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                apiKeyModal.hide();
                alert('API key saved successfully');
            }
        })
        .catch(error => {
            console.error(`Error saving ${provider} API key:`, error);
            alert(`Error saving ${provider} API key`);
        });
    }
    
    function updateCharacterCount() {
        const count = commandTextarea.value.length;
        characterCount.textContent = `${count}/2000`;
        
        if (count > 1900) {
            characterCount.classList.add('text-danger');
        } else {
            characterCount.classList.remove('text-danger');
        }
    }
    
    function executeCommand() {
        const command = commandTextarea.value.trim();
        if (!command) {
            alert('Please enter a command');
            return;
        }
        
        // Check if API key is required but not provided
        const provider = apiProviderSelect.value;
        if ((provider === 'openai' && 
            !localStorage.getItem('openai_api_key') && 
            !sessionStorage.getItem('openai_temp_key')) ||
            (provider === 'mistral' &&
            !localStorage.getItem('mistral_api_key') &&
            !sessionStorage.getItem('mistral_temp_key'))) {
            alert(`Please set your ${provider === 'openai' ? 'OpenAI' : 'Mistral'} API key first`);
            apiKeyModal.show();
            return;
        }
        
        // Show loading state
        executeButton.disabled = true;
        executeButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
        
        // Add user message to UI
        addMessageToUI('user', command);
        
        // Get document attachments if any
        const attachments = uploadedDocuments.map(doc => ({
            id: doc.id,
            name: doc.name
        }));
        
        // Execute command
        fetch('/CommandCenter/ExecuteCommand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                command: command,
                apiProvider: provider,
                attachments: attachments
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Add assistant message to UI
            addMessageToUI('assistant', data.response);
            
            // Update messages array
            messages = data.messages;
            
            // Clear command
            commandTextarea.value = '';
            updateCharacterCount();
        })
        .catch(error => {
            console.error('Error executing command:', error);
            addMessageToUI('system', 'Error executing command. Please try again.');
        })
        .finally(() => {
            // Reset button state
            executeButton.disabled = false;
            executeButton.innerHTML = 'Execute Command';
        });
    }
    
    function addMessageToUI(role, content) {
        // Hide suggestions if this is the first message
        if (suggestionsDisplay && suggestionsDisplay.style.display !== 'none') {
            suggestionsDisplay.style.display = 'none';
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        
        const contentParagraph = document.createElement('p');
        contentParagraph.textContent = content;
        messageDiv.appendChild(contentParagraph);
        
        // Add to container
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // File handling functions
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.add('dragover');
    }
    
    function handleFileDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        processFiles(files);
    }
    
    function handleFileSelect(e) {
        const files = e.target.files;
        processFiles(files);
    }
    
    function processFiles(files) {
        if (files.length === 0) return;
        
        // Clear previous file list
        fileList.innerHTML = '';
        
        // Create file items
        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-icon"><i class="bi bi-file-earmark"></i></div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${formatFileSize(file.size)}</div>
                </div>
                <div class="file-status">Ready</div>
            `;
            fileList.appendChild(fileItem);
        });
        
        // Enable upload button
        uploadFilesButton.disabled = false;
    }
    
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    }
    
    function uploadFiles() {
        const files = fileInput.files;
        if (files.length === 0) return;
        
        // Create FormData
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        
        // Update UI to show uploading
        const fileItems = fileList.querySelectorAll('.file-item');
        fileItems.forEach(item => {
            const statusDiv = item.querySelector('.file-status');
            statusDiv.textContent = 'Uploading...';
            statusDiv.className = 'file-status uploading';
        });
        
        // Disable upload button
        uploadFilesButton.disabled = true;
        
        // Upload files
        fetch('/Documents/UploadMultiple', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Add documents to uploaded documents array
            uploadedDocuments = uploadedDocuments.concat(data);
            
            // Update UI to show success
            fileItems.forEach((item, index) => {
                const statusDiv = item.querySelector('.file-status');
                statusDiv.textContent = 'Uploaded';
                statusDiv.className = 'file-status success';
            });
            
            // Update document attachments UI
            updateDocumentAttachments();
            
            // Close modal after a delay
            setTimeout(() => {
                documentUploadModal.hide();
                // Clear file input
                fileInput.value = '';
            }, 1000);
        })
        .catch(error => {
            console.error('Error uploading files:', error);
            
            // Update UI to show error
            fileItems.forEach(item => {
                const statusDiv = item.querySelector('.file-status');
                statusDiv.textContent = 'Error';
                statusDiv.className = 'file-status error';
            });
            
            // Enable upload button again
            uploadFilesButton.disabled = false;
        });
    }
    
    function updateDocumentAttachments() {
        const attachmentsContainer = document.getElementById('documentAttachments');
        attachmentsContainer.innerHTML = '';
        
        if (uploadedDocuments.length === 0) {
            attachmentsContainer.style.display = 'none';
            return;
        }
        
        attachmentsContainer.style.display = 'block';
        
        uploadedDocuments.forEach(doc => {
            const docItem = document.createElement('div');
            docItem.className = 'document-item';
            docItem.innerHTML = `
                <div class="document-icon"><i class="bi bi-file-earmark"></i></div>
                <div class="document-name">${doc.name}</div>
                <button class="document-remove" data-id="${doc.id}">
                    <i class="bi bi-x"></i>
                </button>
            `;
            attachmentsContainer.appendChild(docItem);
            
            // Add remove event listener
            docItem.querySelector('.document-remove').addEventListener('click', function() {
                const docId = this.getAttribute('data-id');
                uploadedDocuments = uploadedDocuments.filter(d => d.id !== docId);
                updateDocumentAttachments();
            });
        });
    }
    
    // Resizable panels
    function initResize(e) {
        e.preventDefault();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    }
    
    function resize(e) {
        const container = document.querySelector('.resizable-container');
        const containerHeight = container.offsetHeight;
        const y = e.clientY;
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        
        // Calculate position as percentage
        const percentage = ((y - containerTop) / containerHeight) * 100;
        
        // Set min/max
        const clampedPercentage = Math.max(30, Math.min(70, percentage));
        
        // Apply sizes
        messagesPanel.style.height = `${clampedPercentage}%`;
        commandPanel.style.height = `${100 - clampedPercentage}%`;
    }
    
    function stopResize() {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    }
});
