// ArchEducation Dashboard Main Controller
class ArchEducationDashboard {
    constructor() {
        this.currentUser = {
            name: 'Juan Carlos Pérez Mendoza',
            role: 'Ejecutivo',
            institution: 'I.E. José Faustino Sánchez Carrión',
            email: 'juan.perez@educacion.gob.pe',
            phone: '+51 987 654 321',
            modularCode: '0123456'
        };
        
        this.notifications = [
            {
                id: 1,
                type: 'info',
                title: 'Actualización del Sistema',
                message: 'Nueva funcionalidad de generación de correos disponible',
                time: '2 horas',
                read: false
            },
            {
                id: 2,
                type: 'success',
                title: 'Capacitación Programada',
                message: 'Capacitación sobre repositorios el viernes 3:00 PM',
                time: '1 día',
                read: false
            },
            {
                id: 3,
                type: 'warning',
                title: 'Recordatorio',
                message: 'Actualizar información de docentes pendiente',
                time: '3 días',
                read: true
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.loadUserData();
        this.setupNotifications();
        this.setupLibraryUpload();
        this.setupSettingsToggles();
        this.setupMessageComposer();
        this.startRealTimeUpdates();
    }
    
    setupEventListeners() {
        // Window load event
        window.addEventListener('load', () => {
            this.hideLoadingScreen();
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.section) {
                this.navigateToSection(e.state.section);
            }
        });
        
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => {
            this.showConnectionStatus('online');
        });
        
        window.addEventListener('offline', () => {
            this.showConnectionStatus('offline');
        });
    }
    
    initializeComponents() {
        // Initialize tooltips
        this.initializeTooltips();
        
        // Initialize animations
        this.initializeAnimations();
        
        // Initialize lazy loading for images
        this.initializeLazyLoading();
        
        // Initialize accessibility features
        this.initializeAccessibility();
    }
    
    loadUserData() {
        // Update user profile in header
        const userName = document.querySelector('.user-name');
        const userRole = document.querySelector('.user-role');
        
        if (userName) {
            userName.textContent = this.currentUser.name.split(' ').slice(0, 2).join(' ');
        }
        
        if (userRole) {
            userRole.textContent = `${this.currentUser.role} - ${this.currentUser.institution}`;
        }
        
        // Update settings form
        this.populateSettingsForm();
    }
    
    populateSettingsForm() {
        const settingsForm = document.querySelector('.settings-form');
        if (!settingsForm) return;
        
        const inputs = settingsForm.querySelectorAll('input');
        inputs.forEach(input => {
            const label = input.previousElementSibling?.textContent.toLowerCase();
            
            switch(true) {
                case label?.includes('nombres'):
                    input.value = this.currentUser.name.split(' ').slice(0, 2).join(' ');
                    break;
                case label?.includes('apellidos'):
                    input.value = this.currentUser.name.split(' ').slice(2).join(' ');
                    break;
                case label?.includes('correo'):
                    input.value = this.currentUser.email;
                    break;
                case label?.includes('teléfono'):
                    input.value = this.currentUser.phone;
                    break;
                case label?.includes('centro educativo'):
                    input.value = this.currentUser.institution;
                    break;
                case label?.includes('código'):
                    input.value = this.currentUser.modularCode;
                    break;
            }
        });
    }
    
    setupNotifications() {
        const notificationBell = document.querySelector('.notifications');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (notificationBell) {
            notificationBell.addEventListener('click', () => {
                this.showNotificationsPanel();
            });
        }
        
        // Update notification count
        const unreadCount = this.notifications.filter(n => !n.read).length;
        if (notificationBadge) {
            notificationBadge.textContent = unreadCount;
            notificationBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    showNotificationsPanel() {
        // Create notifications panel if it doesn't exist
        let panel = document.getElementById('notificationsPanel');
        
        if (!panel) {
            panel = this.createNotificationsPanel();
        }
        
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
    
    createNotificationsPanel() {
        const panel = document.createElement('div');
        panel.id = 'notificationsPanel';
        panel.className = 'notifications-panel';
        panel.innerHTML = `
            <div class="notifications-header">
                <h3>Notificaciones</h3>
                <button class="mark-all-read">Marcar todas como leídas</button>
            </div>
            <div class="notifications-list">
                ${this.notifications.map(notification => `
                    <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
                        <div class="notification-icon ${notification.type}">
                            <i class="fas fa-${this.getNotificationIcon(notification.type)}"></i>
                        </div>
                        <div class="notification-content">
                            <h4>${notification.title}</h4>
                            <p>${notification.message}</p>
                            <span class="notification-time">Hace ${notification.time}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add styles
        panel.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            width: 350px;
            max-height: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            z-index: 2000;
            overflow: hidden;
            display: none;
        `;
        
        // Add event listeners
        const markAllRead = panel.querySelector('.mark-all-read');
        markAllRead.addEventListener('click', () => {
            this.markAllNotificationsRead();
        });
        
        // Position relative to notifications button
        const notificationsBtn = document.querySelector('.notifications');
        notificationsBtn.style.position = 'relative';
        notificationsBtn.appendChild(panel);
        
        return panel;
    }
    
    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'warning': return 'exclamation-triangle';
            case 'error': return 'times-circle';
            default: return 'info-circle';
        }
    }
    
    markAllNotificationsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        
        // Update UI
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge) {
            notificationBadge.style.display = 'none';
        }
        
        // Update panel
        const panel = document.getElementById('notificationsPanel');
        if (panel) {
            const items = panel.querySelectorAll('.notification-item');
            items.forEach(item => {
                item.classList.remove('unread');
                item.classList.add('read');
            });
        }
    }
    
    setupLibraryUpload() {
        const uploadBtn = document.getElementById('uploadBookBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                this.showUploadModal();
            });
        }
    }
    
    showUploadModal() {
        // Create upload modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Subir Libro a la Biblioteca</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form class="upload-form">
                        <div class="form-group">
                            <label>Título del Libro</label>
                            <input type="text" required placeholder="Ingrese el título del libro">
                        </div>
                        <div class="form-group">
                            <label>Autor</label>
                            <input type="text" required placeholder="Nombre del autor">
                        </div>
                        <div class="form-group">
                            <label>Categoría</label>
                            <select required>
                                <option value="">Seleccione una categoría</option>
                                <option value="textos">Textos Escolares</option>
                                <option value="literatura">Literatura</option>
                                <option value="ciencia">Ciencia y Tecnología</option>
                                <option value="historia">Historia y Cultura</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Archivo PDF</label>
                            <input type="file" accept=".pdf" required>
                            <small>Solo se permiten archivos PDF (máx. 50MB)</small>
                        </div>
                        <div class="form-group">
                            <label>Descripción</label>
                            <textarea placeholder="Breve descripción del contenido"></textarea>
                        </div>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-upload"></i>
                            Subir Libro
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        // Setup modal events
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        const form = modal.querySelector('.upload-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.simulateUpload(modal);
        });
    }
    
    simulateUpload(modal) {
        const submitBtn = modal.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
        
        setTimeout(() => {
            this.showNotification('Libro subido exitosamente a la biblioteca', 'success');
            document.body.removeChild(modal);
        }, 2000);
    }
    
    setupSettingsToggles() {
        const toggles = document.querySelectorAll('.switch input');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const setting = e.target.closest('.setting-item').querySelector('span').textContent;
                this.showNotification(`${setting} ${e.target.checked ? 'activado' : 'desactivado'}`, 'info');
            });
        });
    }
    
    setupMessageComposer() {
        const sendBtn = document.querySelector('.btn-send');
        const textarea = document.querySelector('.message-compose textarea');
        
        if (sendBtn && textarea) {
            sendBtn.addEventListener('click', () => {
                const message = textarea.value.trim();
                if (message) {
                    this.sendMessage(message);
                    textarea.value = '';
                }
            });
            
            // Send with Ctrl+Enter
            textarea.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                    const message = textarea.value.trim();
                    if (message) {
                        this.sendMessage(message);
                        textarea.value = '';
                    }
                }
            });
        }
    }
    
    sendMessage(message) {
        // Add message to list
        const messagesList = document.querySelector('.messages-list');
        if (messagesList) {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <strong>Usted</strong>
                        <span class="message-time">Ahora</span>
                    </div>
                    <p>${message}</p>
                </div>
            `;
            
            messagesList.appendChild(messageItem);
            messagesList.scrollTop = messagesList.scrollHeight;
        }
        
        this.showNotification('Mensaje enviado al soporte técnico', 'success');
        
        // Simulate auto-response
        setTimeout(() => {
            this.simulateAutoResponse();
        }, 3000);
    }
    
    simulateAutoResponse() {
        const messagesList = document.querySelector('.messages-list');
        if (messagesList) {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-headset"></i>
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <strong>Soporte Técnico ArchEducation</strong>
                        <span class="message-time">Ahora</span>
                    </div>
                    <p>Gracias por contactarnos. Hemos recibido su mensaje y le responderemos a la brevedad posible.</p>
                </div>
            `;
            
            messagesList.appendChild(messageItem);
            messagesList.scrollTop = messagesList.scrollHeight;
        }
    }
    
    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateStats();
        }, 30000);
        
        // Update time stamps every minute
        setInterval(() => {
            this.updateTimeStamps();
        }, 60000);
    }
    
    updateStats() {
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const number = card.querySelector('h3');
            if (number) {
                const currentValue = parseInt(number.textContent);
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                const newValue = Math.max(0, currentValue + change);
                
                if (change !== 0) {
                    number.textContent = newValue;
                    card.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        });
    }
    
    updateTimeStamps() {
        const timeElements = document.querySelectorAll('.activity-time, .message-time');
        timeElements.forEach(element => {
            // This would normally update based on actual timestamps
            // For demo purposes, we'll leave them as is
        });
    }
    
    handleKeyboardShortcuts(e) {
        // Alt + 1-6 for navigation
        if (e.altKey && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const sections = ['dashboard', 'ajustes', 'mensajes', 'usuarios', 'repositorios', 'biblioteca'];
            const sectionIndex = parseInt(e.key) - 1;
            if (sections[sectionIndex]) {
                // Trigger navigation (this would integrate with the navigation system)
                const navItem = document.querySelector(`[data-section="${sections[sectionIndex]}"]`);
                if (navItem) {
                    navItem.click();
                }
            }
        }
        
        // Ctrl + K for search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-box input:not([style*="display: none"])');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }
    
    initializeTooltips() {
        // Add tooltips to navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const text = item.querySelector('span').textContent;
            item.setAttribute('title', text);
        });
    }
    
    initializeAnimations() {
        // Add intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Observe cards for animation
        const cards = document.querySelectorAll('.stat-card, .user-card, .repo-card, .book-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    initializeLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initializeAccessibility() {
        // Add ARIA labels
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const text = item.querySelector('span').textContent;
            item.setAttribute('aria-label', `Navegar a ${text}`);
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            
            // Add keyboard navigation
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                }
            });
        });
    }
    
    showConnectionStatus(status) {
        const statusBar = document.createElement('div');
        statusBar.className = `connection-status ${status}`;
        statusBar.innerHTML = `
            <i class="fas fa-${status === 'online' ? 'wifi' : 'exclamation-triangle'}"></i>
            <span>${status === 'online' ? 'Conexión restaurada' : 'Sin conexión a internet'}</span>
        `;
        
        statusBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: ${status === 'online' ? '#d4edda' : '#f8d7da'};
            color: ${status === 'online' ? '#155724' : '#721c24'};
            padding: 0.5rem;
            text-align: center;
            z-index: 3000;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(statusBar);
        
        setTimeout(() => {
            statusBar.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            statusBar.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                if (statusBar.parentNode) {
                    statusBar.parentNode.removeChild(statusBar);
                }
            }, 300);
        }, 3000);
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    showNotification(message, type = 'info') {
        // Reuse the notification system from email generator
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
            border-radius: 8px;
            padding: 1rem;
            z-index: 3000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArchEducationDashboard();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchEducationDashboard;
}
