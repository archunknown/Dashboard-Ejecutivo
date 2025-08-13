// ArchEducation Email Generator
class EmailGenerator {
    constructor() {
        this.modal = document.getElementById('emailModal');
        this.generateBtn = document.getElementById('generateBtn');
        this.generateEmailsBtn = document.getElementById('generateEmailsBtn');
        this.closeBtn = document.querySelector('.close');
        this.domainInput = document.getElementById('domain');
        this.emailCountInput = document.getElementById('emailCount');
        this.generatedEmailsDiv = document.getElementById('generatedEmails');
        this.emailsListDiv = document.querySelector('.emails-list');
        this.downloadBtn = document.getElementById('downloadEmails');
        
        // Nombres y apellidos peruanos comunes para generar correos ficticios
        this.nombres = [
            'María', 'José', 'Ana', 'Carlos', 'Rosa', 'Luis', 'Carmen', 'Miguel', 'Elena', 'Jorge',
            'Patricia', 'Roberto', 'Lucía', 'Fernando', 'Isabel', 'Ricardo', 'Gloria', 'Alberto',
            'Teresa', 'Manuel', 'Silvia', 'Francisco', 'Mónica', 'Antonio', 'Beatriz', 'Raúl',
            'Claudia', 'Víctor', 'Pilar', 'Sergio', 'Alejandra', 'Andrés', 'Cristina', 'Diego',
            'Natalia', 'Javier', 'Verónica', 'Óscar', 'Adriana', 'Gonzalo', 'Paola', 'Rodrigo',
            'Vanessa', 'Martín', 'Daniela', 'Iván', 'Lorena', 'Rubén', 'Cecilia', 'Emilio'
        ];
        
        this.apellidos = [
            'García', 'González', 'Rodríguez', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez',
            'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Muñoz',
            'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez',
            'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Suárez', 'Molina', 'Morales',
            'Ortega', 'Delgado', 'Castro', 'Ortiz', 'Rubio', 'Marín', 'Sanz', 'Iglesias',
            'Medina', 'Garrido', 'Cortés', 'Castillo', 'Santos', 'Lozano', 'Guerrero', 'Cano',
            'Prieto', 'Méndez', 'Cruz', 'Flores', 'Herrera', 'Peña', 'León', 'Marquez',
            'Cabrera', 'Gallego', 'Calvo', 'Vidal', 'Campos', 'Reyes', 'Vega', 'Fuentes',
            'Carrasco', 'Diez', 'Caballero', 'Nieto', 'Aguilar', 'Pascual', 'Santamaría', 'Vargas',
            'Giménez', 'Montero', 'Ibáñez', 'Ferrer', 'Arias', 'Mora', 'Carmona', 'Vicente',
            'Rojas', 'Soto', 'Crespo', 'Román', 'Pastor', 'Sáez', 'Lorenzo', 'Montoya',
            'Quispe', 'Huamán', 'Ccahuana', 'Mamani', 'Condori', 'Apaza', 'Choque', 'Flores'
        ];
        
        this.generatedEmails = [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Open modal
        if (this.generateEmailsBtn) {
            this.generateEmailsBtn.addEventListener('click', () => {
                this.openModal();
            });
        }
        
        // Close modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
        
        // Generate emails
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => {
                this.generateEmails();
            });
        }
        
        // Download emails
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => {
                this.downloadEmailsList();
            });
        }
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }
    
    openModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Reset form
            this.resetForm();
            
            // Focus on email count input
            if (this.emailCountInput) {
                setTimeout(() => {
                    this.emailCountInput.focus();
                }, 100);
            }
        }
    }
    
    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    resetForm() {
        if (this.emailCountInput) {
            this.emailCountInput.value = '10';
        }
        
        if (this.generatedEmailsDiv) {
            this.generatedEmailsDiv.style.display = 'none';
        }
        
        if (this.emailsListDiv) {
            this.emailsListDiv.innerHTML = '';
        }
        
        this.generatedEmails = [];
    }
    
    generateEmails() {
        const count = parseInt(this.emailCountInput.value) || 10;
        const domain = this.domainInput.value || 'jfsanchezcarrion.edu.pe';
        
        // Validate count
        if (count < 1 || count > 100) {
            this.showNotification('Por favor, ingrese un número entre 1 y 100', 'error');
            return;
        }
        
        // Clear previous results
        this.generatedEmails = [];
        this.emailsListDiv.innerHTML = '';
        
        // Show loading state
        this.generateBtn.disabled = true;
        this.generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
        
        // Simulate generation delay
        setTimeout(() => {
            this.createEmailList(count, domain);
            this.displayGeneratedEmails();
            this.showGeneratedSection();
            
            // Reset button
            this.generateBtn.disabled = false;
            this.generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generar Correos';
            
            this.showNotification(`${count} correos generados exitosamente`, 'success');
        }, 1500);
    }
    
    createEmailList(count, domain) {
        const usedCombinations = new Set();
        
        for (let i = 0; i < count; i++) {
            let nombre, apellido, email, username;
            let attempts = 0;
            
            // Generate unique email
            do {
                nombre = this.getRandomItem(this.nombres);
                apellido = this.getRandomItem(this.apellidos);
                username = this.createUsername(nombre, apellido);
                email = `${username}@${domain}`;
                attempts++;
                
                // Prevent infinite loop
                if (attempts > 50) {
                    username = `${username}${Math.floor(Math.random() * 999) + 1}`;
                    email = `${username}@${domain}`;
                    break;
                }
            } while (usedCombinations.has(email));
            
            usedCombinations.add(email);
            
            // Generate temporary password
            const password = this.generatePassword();
            
            this.generatedEmails.push({
                nombre: nombre,
                apellido: apellido,
                email: email,
                password: password,
                username: username
            });
        }
    }
    
    createUsername(nombre, apellido) {
        // Remove accents and convert to lowercase
        const cleanNombre = this.removeAccents(nombre.toLowerCase());
        const cleanApellido = this.removeAccents(apellido.toLowerCase());
        
        return `${cleanNombre}.${cleanApellido}`;
    }
    
    removeAccents(str) {
        return str.normalize('NFD')
                 .replace(/[\u0300-\u036f]/g, '')
                 .replace(/[^a-z0-9]/g, '');
    }
    
    generatePassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return password;
    }
    
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    displayGeneratedEmails() {
        this.emailsListDiv.innerHTML = '';
        
        this.generatedEmails.forEach((emailData, index) => {
            const emailItem = document.createElement('div');
            emailItem.className = 'email-item';
            emailItem.innerHTML = `
                <div class="email-info">
                    <strong>${emailData.nombre} ${emailData.apellido}</strong>
                    <div class="email-address">${emailData.email}</div>
                </div>
                <div class="email-credentials">
                    <small>Usuario: ${emailData.username}</small><br>
                    <small>Contraseña: ${emailData.password}</small>
                </div>
            `;
            
            this.emailsListDiv.appendChild(emailItem);
        });
    }
    
    showGeneratedSection() {
        if (this.generatedEmailsDiv) {
            this.generatedEmailsDiv.style.display = 'block';
            
            // Scroll to generated emails
            this.generatedEmailsDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }
    }
    
    downloadEmailsList() {
        if (this.generatedEmails.length === 0) {
            this.showNotification('No hay correos para descargar', 'error');
            return;
        }
        
        // Create CSV content
        let csvContent = 'Nombre,Apellido,Correo Electrónico,Usuario,Contraseña\n';
        
        this.generatedEmails.forEach(emailData => {
            csvContent += `"${emailData.nombre}","${emailData.apellido}","${emailData.email}","${emailData.username}","${emailData.password}"\n`;
        });
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `correos_institucionales_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification('Lista de correos descargada exitosamente', 'success');
        } else {
            this.showNotification('Su navegador no soporta la descarga automática', 'error');
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
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
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
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

// Initialize email generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmailGenerator();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailGenerator;
}
