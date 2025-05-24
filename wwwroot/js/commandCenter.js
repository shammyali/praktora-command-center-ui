
// Command Center functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const apiProviderSelect = document.getElementById('apiProviderSelect');
    const apiKeyButton = document.getElementById('apiKeyButton');
    const apiKeyModal = document.getElementById('apiKeyModal');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const rememberKeyCheck = document.getElementById('rememberKeyCheck');
    const saveApiKeyButton = document.getElementById('saveApiKeyButton');
    const commandTextarea = document.getElementById('commandTextarea');
    const characterCount = document.querySelector('.character-count');
    const messagesContainer = document.getElementById('messagesContainer');
    const suggestionsDisplay = document.getElementById('suggestionsDisplay');
    const executeButton = document.getElementById('executeButton');
    const apiStatus = document.querySelector('.api-status .status-text');
    const attachButton = document.getElementById('attachButton');
    const documentUploadModal = document.getElementById('documentUploadModal');
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const uploadFilesButton = document.getElementById('uploadFilesButton');
    const documentAttachments = document.getElementById('documentAttachments');
    
    // Initialize resizable panels
    const messagesPanel = document.getElementById('messagesPanel');
    const commandPanel = document.getElementById('commandPanel');
    const resizerHandle = document.getElementById('resizerHandle');
    
    let isResizing = false;
    
    resizerHandle.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.body.style.cursor = 'row-resize';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });
    
    function handleMouseMove(e) {
        if (!isResizing) return;
        
        const containerRect = messagesPanel.parentElement.getBoundingClientRect();
        const containerHeight = containerRect.height;
        const y = e.clientY - containerRect.top;
        
        // Calculate percentages
        const messagesPanelPercentage = (y / containerHeight) * 100;
        const commandPanelPercentage = 100 - messagesPanelPercentage;
        
        // Set min heights
        if (messagesPanelPercentage < 30 || commandPanelPercentage < 20) return;
        
        messagesPanel.style.flex = `${messagesPanelPercentage}`;
        commandPanel.style.flex = `${commandPanelPercentage}`;
    }
    
    function stopResize() {
        isResizing = false;
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', handleMouseMove);
    }
    
    // API Provider selection
    apiProviderSelect.addEventListener('change', function() {
        const provider = this.value;
        apiStatus.textContent = `Using ${provider === 'mistral' ? 'Mistral LLM' : 'OpenAI'}`;
        
        // Show API key button for OpenAI
        if (provider === 'openai') {
            apiKeyButton.style.display = 'block';
            
            // Check if API key is already set
            const apiKey = getOpenAiApiKey();
            if (!apiKey) {
                // Show API key modal if not set
                const apiKeyModalInstance = new bootstrap.Modal(apiKeyModal);
                apiKeyModalInstance.show();
            }
        } else {
            apiKeyButton.style.display = 'none';
        }
    });
    
    // API Key button
    apiKeyButton.addEventListener('click', function() {
        const apiKeyModalInstance = new bootstrap.Modal(apiKeyModal);
        apiKeyModalInstance.show();
    });
    
    // Save API Key
    saveApiKeyButton.addEventListener('click', function() {
        const apiKey = apiKeyInput.value.trim();
        
        if (!apiKey) {
            showToast('Please enter a valid API key', 'warning');
            return;
        }
        
        // Save API key
        if (rememberKeyCheck.checked) {
            localStorage.setItem('p2ra_openai_api_key', apiKey);
        } else {
            sessionStorage.setItem('openai_temp_key', apiKey);
        }
        
        // Close modal
        const apiKeyModalInstance = bootstrap.Modal.getInstance(apiKeyModal);
        apiKeyModalInstance.hide();
        
        showToast('API key saved successfully', 'success');
    });
    
    // Character count
    commandTextarea.addEventListener('input', function() {
        const count = this.value.length;
        characterCount.textContent = `${count}/2000`;
        
        if (count > 1900) {
            characterCount.classList.add('text-danger');
        } else {
            characterCount.classList.remove('text-danger');
        }
    });
    
    // Command execution
    executeButton.addEventListener('click', function() {
        executeCommand();
    });
    
    // Suggestion buttons
    document.querySelectorAll('.suggestion-button').forEach(button => {
        button.addEventListener('click', function() {
            const suggestionText = this.previousElementSibling.textContent;
            commandTextarea.value = suggestionText.replace(/"/g, '');
            commandTextarea.dispatchEvent(new Event('input'));
            commandTextarea.focus();
        });
    });
    
    // Attach button
    attachButton.addEventListener('click', function() {
        const documentUploadModalInstance = new bootstrap.Modal(documentUploadModal);
        documentUploadModalInstance.show();
    });
    
    // Upload zone drag and drop
    uploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    uploadZone.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    uploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    uploadZone.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFiles(this.files);
        }
    });
    
    // Helper Functions
    function handleFiles(files) {
        // Clear existing file list
        fileList.innerHTML = '';
        
        // Create file items
        Array.from(files).forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileIcon = document.createElement('div');
            fileIcon.className = 'file-item-icon';
            
            // Set icon based on file type
            let iconClass = 'bi-file-earmark';
            if (file.type.startsWith('image/')) {
                iconClass = 'bi-file-earmark-image';
            } else if (file.type === 'application/pdf') {
                iconClass = 'bi-file-earmark-pdf';
            } else if (file.type.includes('word') || file.type.includes('document')) {
                iconClass = 'bi-file-earmark-word';
            } else if (file.type.includes('excel') || file.type.includes('sheet')) {
                iconClass = 'bi-file-earmark-excel';
            } else if (file.type.includes('text')) {
                iconClass = 'bi-file-earmark-text';
            }
            
            fileIcon.innerHTML = `<i class="bi ${iconClass}"></i>`;
            
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-item-info';
            
            const fileName = document.createElement('p');
            fileName.className = 'file-item-name';
            fileName.textContent = file.name;
            
            const fileSize = document.createElement('p');
            fileSize.className = 'file-item-size';
            fileSize.textContent = formatFileSize(file.size);
            
            fileInfo.appendChild(fileName);
            fileInfo.appendChild(fileSize);
            
            const fileActions = document.createElement('div');
            fileActions.className = 'file-item-actions';
            
            const removeButton = document.createElement('button');
            removeButton.className = 'btn btn-sm btn-link text-danger';
            removeButton.innerHTML = '<i class="bi bi-x"></i>';
            removeButton.addEventListener('click', function() {
                fileItem.remove();
                checkFilesExist();
            });
            
            fileActions.appendChild(removeButton);
            
            fileItem.appendChild(fileIcon);
            fileItem.appendChild(fileInfo);
            fileItem.appendChild(fileActions);
            
            fileList.appendChild(fileItem);
        });
        
        // Enable upload button if files exist
        checkFilesExist();
    }
    
    function checkFilesExist() {
        uploadFilesButton.disabled = fileList.children.length === 0;
    }
    
    function formatFileSize(size) {
        if (size < 1024) {
            return size + ' B';
        } else if (size < 1024 * 1024) {
            return (size / 1024).toFixed(1) + ' KB';
        } else {
            return (size / (1024 * 1024)).toFixed(1) + ' MB';
        }
    }
    
    // Upload files
    uploadFilesButton.addEventListener('click', function() {
        // Simulate upload progress
        const fileItems = fileList.querySelectorAll('.file-item');
        
        fileItems.forEach((fileItem, index) => {
            // Create progress element
            const progressContainer = document.createElement('div');
            progressContainer.className = 'file-item-progress';
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress';
            progressBar.style.height = '4px';
            
            const progressIndicator = document.createElement('div');
            progressIndicator.className = 'progress-bar';
            progressIndicator.style.width = '0%';
            progressIndicator.setAttribute('role', 'progressbar');
            
            progressBar.appendChild(progressIndicator);
            progressContainer.appendChild(progressBar);
            
            const fileInfo = fileItem.querySelector('.file-item-info');
            fileInfo.appendChild(progressContainer);
            
            // Simulate progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 10) + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Show complete status
                    const completeStatus = document.createElement('div');
                    completeStatus.className = 'text-success d-flex align-items-center mt-1';
                    completeStatus.style.fontSize = '0.75rem';
                    completeStatus.innerHTML = '<i class="bi bi-check2 me-1"></i> Upload complete';
                    progressContainer.appendChild(completeStatus);
                    
                    // Add to document attachments
                    const fileOriginal = fileInput.files[index];
                    if (fileOriginal) {
                        addDocumentAttachment(fileOriginal);
                    }
                    
                    // Close modal if all uploads complete
                    if (Array.from(fileItems).every(item => {
                        const progressBar = item.querySelector('.progress-bar');
                        return progressBar && progressBar.style.width === '100%';
                    })) {
                        setTimeout(() => {
                            const documentUploadModalInstance = bootstrap.Modal.getInstance(documentUploadModal);
                            documentUploadModalInstance.hide();
                            showToast('Documents attached successfully', 'success');
                        }, 1000);
                    }
                }
                progressIndicator.style.width = progress + '%';
            }, 200);
        });
    });
    
    function addDocumentAttachment(file) {
        const attachment = document.createElement('div');
        attachment.className = 'd-flex align-items-center bg-light rounded p-1 pe-2';
        attachment.style.fontSize = '0.8rem';
        
        let iconClass = 'bi-file-earmark-text';
        if (file.type.startsWith('image/')) {
            iconClass = 'bi-file-earmark-image';
        } else if (file.type === 'application/pdf') {
            iconClass = 'bi-file-earmark-pdf';
        }
        
        attachment.innerHTML = `
            <i class="bi ${iconClass} me-1 text-secondary"></i>
            <span class="text-truncate" style="max-width: 100px;">${file.name}</span>
            <button class="btn btn-sm p-0 ms-1 remove-attachment">
                <i class="bi bi-x"></i>
            </button>
        `;
        
        attachment.querySelector('.remove-attachment').addEventListener('click', function() {
            attachment.remove();
        });
        
        documentAttachments.appendChild(attachment);
    }
    
    // Get API key helper function
    function getOpenAiApiKey() {
        // First check session storage (temporary key)
        const tempKey = sessionStorage.getItem('openai_temp_key');
        if (tempKey) {
            return tempKey;
        }
        
        // Then check localStorage
        return localStorage.getItem('p2ra_openai_api_key');
    }
    
    // Execute command
    function executeCommand() {
        const command = commandTextarea.value.trim();
        
        if (!command) {
            showToast('Please enter a command to execute', 'warning');
            return;
        }
        
        // Hide suggestions
        suggestionsDisplay.style.display = 'none';
        
        // Get attached documents
        const attachedDocs = Array.from(documentAttachments.children).map(attachment => {
            return {
                name: attachment.querySelector('span').textContent
            };
        });
        
        // Create user message
        addUserMessage(command, attachedDocs);
        
        // Disable execute button and show loading state
        executeButton.disabled = true;
        executeButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        
        // Get API provider
        const apiProvider = apiProviderSelect.value;
        
        // Simulate API call
        setTimeout(() => {
            // Create assistant message
            const response = generateMockResponse(command, apiProvider);
            addAssistantMessage(response);
            
            // Clear command and attachments
            commandTextarea.value = '';
            commandTextarea.dispatchEvent(new Event('input'));
            documentAttachments.innerHTML = '';
            
            // Re-enable execute button
            executeButton.disabled = false;
            executeButton.innerHTML = 'Execute Command';
        }, 2000);
    }
    
    function addUserMessage(content, attachments = []) {
        const messageElem = document.createElement('div');
        messageElem.className = 'message user-message';
        
        // If there are attachments, show them
        if (attachments.length > 0) {
            const attachmentsElem = document.createElement('div');
            attachmentsElem.className = 'd-flex gap-2 mb-2 bg-white/80 p-2 rounded align-items-center';
            attachmentsElem.style.fontSize = '0.8rem';
            
            const icon = document.createElement('i');
            icon.className = 'bi bi-paperclip text-secondary';
            
            const text = document.createElement('span');
            text.className = 'text-secondary';
            text.textContent = `${attachments.length} ${attachments.length === 1 ? 'document' : 'documents'} attached`;
            
            attachmentsElem.appendChild(icon);
            attachmentsElem.appendChild(text);
            messageElem.appendChild(attachmentsElem);
        }
        
        const contentElem = document.createElement('p');
        contentElem.textContent = content;
        messageElem.appendChild(contentElem);
        
        messagesContainer.appendChild(messageElem);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function addAssistantMessage(content) {
        const messageElem = document.createElement('div');
        messageElem.className = 'message assistant-message';
        
        const contentElem = document.createElement('p');
        contentElem.textContent = content;
        messageElem.appendChild(contentElem);
        
        messagesContainer.appendChild(messageElem);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function generateMockResponse(command, provider) {
        const responses = {
            'analyze risk profile for client xyz corp': 'Based on the data available for XYZ Corp, I\'ve analyzed their risk profile and found several areas of concern:\n\n1. Industry risk: Medium-high due to volatile market conditions\n2. Financial stability: Strong with consistent growth over 3 years\n3. Claim history: 3 minor claims in the past 24 months\n4. Compliance status: All requirements up to date\n\nOverall risk assessment: MEDIUM\n\nRecommendation: Consider adjusting premium by +5-8% and require quarterly compliance reviews.',
            'summarize policy #12345 coverage details': 'Policy #12345 - Commercial Property Insurance\n\nCoverage summary:\n- Building coverage: $2,500,000 (Replacement cost)\n- Business personal property: $750,000\n- Business interruption: $500,000 (12-month period)\n- Deductible: $10,000 per occurrence\n\nKey exclusions:\n- Flood damage (separate policy recommended)\n- Earthquake damage\n- Wear and tear/gradual deterioration\n\nPolicy is active until December 31, 2025. Premium payments are current.',
            'start claim process for customer john doe': 'I\'ve initiated the claims process for John Doe.\n\nClaim reference number: CL-2023-4872\n\nRequired documentation:\n1. Completed claim form (sent to customer\'s email)\n2. Photos of damage/incident\n3. Police report (if applicable)\n4. Repair estimates\n\nJohn\'s agent (Sarah Johnson) has been notified and will contact him within 24 hours. The customer can upload documents directly through the client portal using the claim reference number.',
        };
        
        const lowercaseCommand = command.toLowerCase();
        
        for (const [key, value] of Object.entries(responses)) {
            if (lowercaseCommand.includes(key)) {
                return value;
            }
        }
        
        // Default response
        if (provider === 'mistral') {
            return `I've processed your request regarding "${command}". Based on the available data, I can provide assistance with this query. Please let me know if you need more specific information or if there's anything else I can help with.`;
        } else {
            return `Thank you for your query about "${command}". I've analyzed the information in our database and can help you with this request. What additional details would you like me to explore?`;
        }
    }
    
    // Initialize API provider button visibility
    if (apiProviderSelect.value === 'openai') {
        apiKeyButton.style.display = 'block';
    } else {
        apiKeyButton.style.display = 'none';
    }
});
