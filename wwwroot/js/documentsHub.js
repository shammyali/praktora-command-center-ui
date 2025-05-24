
// Documents Hub functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const documentGrid = document.getElementById('documentGrid');
    const documentList = document.getElementById('documentList');
    const uploadDocumentBtn = document.getElementById('uploadDocumentBtn');
    const emptyStateUploadBtn = document.getElementById('emptyStateUploadBtn');
    const uploadContainer = document.getElementById('uploadContainer');
    const documentDropZone = document.getElementById('documentDropZone');
    const documentFileInput = document.getElementById('documentFileInput');
    const documentUploadModal = document.getElementById('documentUploadModal');
    const modalUploadZone = document.getElementById('modalUploadZone');
    const modalFileInput = document.getElementById('modalFileInput');
    const modalFileList = document.getElementById('modalFileList');
    const modalUploadFilesButton = document.getElementById('modalUploadFilesButton');
    const closeDetailsPanelBtn = document.getElementById('closeDetailsPanelBtn');
    const documentDetailsPanel = document.getElementById('documentDetailsPanel');
    
    // View toggle
    gridViewBtn.addEventListener('click', function() {
        documentGrid.style.display = 'grid';
        documentList.style.display = 'none';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', function() {
        documentGrid.style.display = 'none';
        documentList.style.display = 'block';
        gridViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
    });
    
    // Upload button
    uploadDocumentBtn.addEventListener('click', function() {
        const documentUploadModalInstance = new bootstrap.Modal(documentUploadModal);
        documentUploadModalInstance.show();
    });
    
    // Empty state upload button
    if (emptyStateUploadBtn) {
        emptyStateUploadBtn.addEventListener('click', function() {
            const documentUploadModalInstance = new bootstrap.Modal(documentUploadModal);
            documentUploadModalInstance.show();
        });
    }
    
    // Document drop zone
    if (documentDropZone) {
        documentDropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        documentDropZone.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        documentDropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
            }
        });
        
        documentDropZone.addEventListener('click', function() {
            documentFileInput.click();
        });
        
        documentFileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFiles(this.files);
            }
        });
    }
    
    // Modal upload zone
    modalUploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    modalUploadZone.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    modalUploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length > 0) {
            handleModalFiles(e.dataTransfer.files);
        }
    });
    
    modalUploadZone.addEventListener('click', function() {
        modalFileInput.click();
    });
    
    modalFileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleModalFiles(this.files);
        }
    });
    
    // Close details panel
    if (closeDetailsPanelBtn) {
        closeDetailsPanelBtn.addEventListener('click', function() {
            documentDetailsPanel.style.display = 'none';
        });
    }
    
    // Helper functions
    function handleFiles(files) {
        // Clear empty state
        const emptyState = documentGrid.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Process each file and add to the document grid
        Array.from(files).forEach(file => {
            createDocumentCard(file);
        });
        
        // Hide upload container
        uploadContainer.style.display = 'none';
    }
    
    function handleModalFiles(files) {
        // Clear file list
        modalFileList.innerHTML = '';
        
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
                checkModalFilesExist();
            });
            
            fileActions.appendChild(removeButton);
            
            fileItem.appendChild(fileIcon);
            fileItem.appendChild(fileInfo);
            fileItem.appendChild(fileActions);
            
            modalFileList.appendChild(fileItem);
        });
        
        // Enable upload button if files exist
        checkModalFilesExist();
    }
    
    function checkModalFilesExist() {
        modalUploadFilesButton.disabled = modalFileList.children.length === 0;
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
    
    // Upload files from modal
    modalUploadFilesButton.addEventListener('click', function() {
        // Simulate upload progress
        const fileItems = modalFileList.querySelectorAll('.file-item');
        
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
                    
                    // Create document card
                    const fileOriginal = modalFileInput.files[index];
                    if (fileOriginal) {
                        createDocumentCard(fileOriginal);
                    }
                    
                    // Close modal if all uploads complete
                    if (Array.from(fileItems).every(item => {
                        const progressBar = item.querySelector('.progress-bar');
                        return progressBar && progressBar.style.width === '100%';
                    })) {
                        setTimeout(() => {
                            const documentUploadModalInstance = bootstrap.Modal.getInstance(documentUploadModal);
                            documentUploadModalInstance.hide();
                            showToast('Documents uploaded successfully', 'success');
                        }, 1000);
                    }
                }
                progressIndicator.style.width = progress + '%';
            }, 200);
        });
    });
    
    function createDocumentCard(file) {
        // Create document card
        const card = document.createElement('div');
        card.className = 'document-card';
        
        const preview = document.createElement('div');
        preview.className = 'document-card-preview';
        
        // Handle preview based on file type
        if (file.type.startsWith('image/')) {
            // Create image preview for images
            const img = document.createElement('img');
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
            preview.appendChild(img);
        } else {
            // Use icon for non-image files
            let iconClass = 'bi-file-earmark-text';
            if (file.type === 'application/pdf') {
                iconClass = 'bi-file-earmark-pdf';
            } else if (file.type.includes('word') || file.type.includes('document')) {
                iconClass = 'bi-file-earmark-word';
            } else if (file.type.includes('excel') || file.type.includes('sheet')) {
                iconClass = 'bi-file-earmark-excel';
            }
            
            const icon = document.createElement('i');
            icon.className = `bi ${iconClass}`;
            preview.appendChild(icon);
        }
        
        const info = document.createElement('div');
        info.className = 'document-card-info';
        
        const title = document.createElement('h4');
        title.className = 'document-card-title';
        title.textContent = file.name;
        
        const meta = document.createElement('div');
        meta.className = 'document-card-meta';
        
        const type = document.createElement('span');
        type.textContent = file.type.split('/')[1] || 'document';
        
        const size = document.createElement('span');
        size.textContent = formatFileSize(file.size);
        
        meta.appendChild(type);
        meta.appendChild(size);
        
        info.appendChild(title);
        info.appendChild(meta);
        
        card.appendChild(preview);
        card.appendChild(info);
        
        // Add click event to show details
        card.addEventListener('click', function() {
            showDocumentDetails(file);
        });
        
        // Add to grid
        documentGrid.appendChild(card);
        
        // Also add to list view
        addDocumentToList(file);
    }
    
    function addDocumentToList(file) {
        // Get table body
        const tbody = documentList.querySelector('tbody');
        if (!tbody) return;
        
        // Create row
        const row = document.createElement('tr');
        
        // Create checkbox cell
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkboxCell.appendChild(checkbox);
        
        // Create name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = file.name;
        
        // Create type cell
        const typeCell = document.createElement('td');
        typeCell.textContent = file.type.split('/')[1] || 'document';
        
        // Create size cell
        const sizeCell = document.createElement('td');
        sizeCell.textContent = formatFileSize(file.size);
        
        // Create date cell
        const dateCell = document.createElement('td');
        dateCell.textContent = new Date().toLocaleDateString();
        
        // Create status cell
        const statusCell = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.className = 'badge bg-success';
        statusBadge.textContent = 'Uploaded';
        statusCell.appendChild(statusBadge);
        
        // Create actions cell
        const actionsCell = document.createElement('td');
        const viewButton = document.createElement('button');
        viewButton.className = 'btn btn-sm btn-outline-primary me-1';
        viewButton.innerHTML = '<i class="bi bi-eye"></i>';
        viewButton.addEventListener('click', function() {
            showDocumentDetails(file);
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-outline-danger';
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('Are you sure you want to delete this document?')) {
                row.remove();
            }
        });
        
        actionsCell.appendChild(viewButton);
        actionsCell.appendChild(deleteButton);
        
        // Add all cells to row
        row.appendChild(checkboxCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(sizeCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);
        
        // Add row to table
        tbody.appendChild(row);
        
        // Click on row to show details
        row.addEventListener('click', function() {
            showDocumentDetails(file);
        });
    }
    
    function showDocumentDetails(file) {
        // Show details panel
        documentDetailsPanel.style.display = 'block';
        
        // Get panel content
        const panelContent = documentDetailsPanel.querySelector('.panel-content');
        if (!panelContent) return;
        
        // Generate preview
        let preview = '';
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview = `<div class="text-center mb-4"><img src="${e.target.result}" alt="${file.name}" style="max-width: 100%; max-height: 300px;"></div>`;
                renderDetailsContent();
            };
            reader.readAsDataURL(file);
        } else {
            let iconClass = 'bi-file-earmark-text';
            if (file.type === 'application/pdf') {
                iconClass = 'bi-file-earmark-pdf';
            } else if (file.type.includes('word') || file.type.includes('document')) {
                iconClass = 'bi-file-earmark-word';
            } else if (file.type.includes('excel') || file.type.includes('sheet')) {
                iconClass = 'bi-file-earmark-excel';
            }
            
            preview = `
                <div class="text-center mb-4">
                    <i class="bi ${iconClass}" style="font-size: 5rem; color: #6c757d;"></i>
                </div>
            `;
            renderDetailsContent();
        }
        
        function renderDetailsContent() {
            panelContent.innerHTML = `
                ${preview}
                
                <div class="mb-4">
                    <h4 class="mb-3">Document Information</h4>
                    <table class="table table-sm">
                        <tr>
                            <th>Name</th>
                            <td>${file.name}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>${file.type || 'Unknown'}</td>
                        </tr>
                        <tr>
                            <th>Size</th>
                            <td>${formatFileSize(file.size)}</td>
                        </tr>
                        <tr>
                            <th>Uploaded</th>
                            <td>${new Date().toLocaleString()}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td><span class="badge bg-success">Uploaded</span></td>
                        </tr>
                    </table>
                </div>
                
                <div class="mb-4">
                    <h4 class="mb-3">Actions</h4>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-primary">
                            <i class="bi bi-download me-1"></i> Download
                        </button>
                        <button class="btn btn-sm btn-outline-secondary">
                            <i class="bi bi-pencil me-1"></i> Rename
                        </button>
                        <button class="btn btn-sm btn-outline-danger">
                            <i class="bi bi-trash me-1"></i> Delete
                        </button>
                    </div>
                </div>
            `;
        }
    }
});
