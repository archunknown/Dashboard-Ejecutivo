// ArchEducation Email Generator
class EmailGenerator {
    constructor() {
        this.modal = document.getElementById('emailModal');
        this.generateBtn = document.getElementById('generateBtn');
        this.closeBtn = document.querySelector('.close');
        this.generateEmailsBtn = document.getElementById('generateEmailsBtn');
        this.downloadBtn = document.getElementById('downloadEmails');
        this.generatedEmails = [];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupUserTypeToggle();
    }
    
    setupEventListeners() {
        if (this.generateEmailsBtn) {
            this.generateEmailsBtn.addEventListener('click', () => {
                this.openModal();
            });
        }
        
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => {
                this.createEmail();
            });
        }
        
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        if (this.downloadBtn) {
            this.downloadBtn.addEventListener('click', () => {
                this.downloadEmailList();
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Add input validation
        const dniInput = document.getElementById('dniInput');
        if (dniInput) {
            dniInput.addEventListener('input', (e) => {
                // Only allow numbers
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }
    }
    
    setupUserTypeToggle() {
        const userTypeSelect = document.getElementById('userTypeSelect');
        const gradeSection = document.getElementById('gradeSection');
        const sectionGroup = document.getElementById('sectionGroup');
        
        if (userTypeSelect && gradeSection && sectionGroup) {
            userTypeSelect.addEventListener('change', (e) => {
                if (e.target.value === 'estudiante') {
                    gradeSection.style.display = 'block';
                    sectionGroup.style.display = 'block';
                } else {
                    gradeSection.style.display = 'none';
                    sectionGroup.style.display = 'none';
                    // Clear selections
                    document.getElementById('gradeSelect').value = '';
                    document.getElementById('sectionSelect').value = '';
                }
            });
            
            // Initial state
            if (userTypeSelect.value === 'estudiante') {
                gradeSection.style.display = 'block';
                sectionGroup.style.display = 'block';
            } else {
                gradeSection.style.display = 'none';
                sectionGroup.style.display = 'none';
            }
        }
    }
    
    openModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.resetForm();
        }
    }
    
    resetForm() {
        const dniInput = document.getElementById('dniInput');
        const firstNameInput = document.getElementById('firstNameInput');
        const lastNameInput = document.getElementById('lastNameInput');
        const userTypeSelect = document.getElementById('userTypeSelect');
        const gradeSelect = document.getElementById('gradeSelect');
        const sectionSelect = document.getElementById('sectionSelect');
        
        if (dniInput) dniInput.value = '';
        if (firstNameInput) firstNameInput.value = '';
        if (lastNameInput) lastNameInput.value = '';
        if (userTypeSelect) userTypeSelect.value = 'estudiante';
        if (gradeSelect) gradeSelect.value = '';
        if (sectionSelect) sectionSelect.value = '';
        
        // Reset visibility
        this.setupUserTypeToggle();
    }
    
    createEmail() {
        const dniInput = document.getElementById('dniInput');
        const firstNameInput = document.getElementById('firstNameInput');
        const lastNameInput = document.getElementById('lastNameInput');
        const userTypeSelect = document.getElementById('userTypeSelect');
        const gradeSelect = document.getElementById('gradeSelect');
        const sectionSelect = document.getElementById('sectionSelect');
        const domainInput = document.getElementById('domain');
        const generatedEmailsDiv = document.getElementById('generatedEmails');
        const emailsList = document.querySelector('.emails-list');
        
        if (!dniInput || !firstNameInput || !lastNameInput || !userTypeSelect || !domainInput || !generatedEmailsDiv || !emailsList) {
            console.error('Required elements not found');
            return;
        }
        
        const dni = dniInput.value.trim();
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const userType = userTypeSelect.value;
        const grade = gradeSelect ? gradeSelect.value : '';
        const section = sectionSelect ? sectionSelect.value : '';
        const domain = domainInput.value;
        
        // Validation
        if (!dni || dni.length !== 8) {
            alert('Por favor, ingrese un DNI válido de 8 dígitos');
            dniInput.focus();
            return;
        }
        
        if (!firstName) {
            alert('Por favor, ingrese los nombres');
            firstNameInput.focus();
            return;
        }
        
        if (!lastName) {
            alert('Por favor, ingrese los apellidos');
            lastNameInput.focus();
            return;
        }
        
        // Validate student-specific fields
        if (userType === 'estudiante') {
            if (!grade) {
                alert('Por favor, seleccione el grado');
                gradeSelect.focus();
                return;
            }
            if (!section) {
                alert('Por favor, seleccione la sección');
                sectionSelect.focus();
                return;
            }
        }
        
        // Check if DNI already exists
        if (this.generatedEmails.some(email => email.dni === dni)) {
            alert('Ya existe un correo generado con este DNI');
            return;
        }
        
        // Create email with new format: FirstLetter + DNI + @domain
        const firstLetter = firstName.charAt(0).toLowerCase();
        const email = `${firstLetter}${dni}@${domain}`;
        
        // Generate random password
        const password = this.generateRandomPassword();
        
        // Create user description
        let userDescription = userType === 'docente' ? 'Docente' : `Estudiante - ${this.formatGrade(grade)} Sección ${section}`;
        
        const emailData = {
            dni: dni,
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
            userType: userType,
            grade: grade,
            section: section,
            userDescription: userDescription,
            createdAt: new Date().toLocaleString('es-PE')
        };
        
        this.generatedEmails.push(emailData);
        
        // Add to display
        const emailItem = document.createElement('div');
        emailItem.className = 'email-item';
        emailItem.innerHTML = `
            <div>
                <strong>${emailData.name}</strong>
                <span class="user-type-badge ${userType}">${userDescription}</span><br>
                <span style="color: var(--color1); font-weight: 500;">${emailData.email}</span><br>
                <small style="color: var(--text-light);">DNI: ${emailData.dni} | Creado: ${emailData.createdAt}</small>
            </div>
            <div class="email-credentials">
                <small>Contraseña: <strong style="color: var(--color2);">${emailData.password}</strong></small>
                <button class="btn-remove" onclick="emailGenerator.removeEmail('${emailData.dni}')" style="margin-left: 10px; padding: 4px 8px; font-size: 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        emailsList.appendChild(emailItem);
        generatedEmailsDiv.style.display = 'block';
        
        // Clear form
        this.resetForm();
        
        // Show success message
        this.showSuccessMessage('Correo institucional creado exitosamente');
    }
    
    formatGrade(grade) {
        if (!grade) return '';
        const [number, level] = grade.split('-');
        return `${number}° ${level.charAt(0).toUpperCase() + level.slice(1)}`;
    }
    
    generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 8; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
    
    removeEmail(dni) {
        this.generatedEmails = this.generatedEmails.filter(email => email.dni !== dni);
        this.refreshEmailsList();
        
        if (this.generatedEmails.length === 0) {
            const generatedEmailsDiv = document.getElementById('generatedEmails');
            if (generatedEmailsDiv) {
                generatedEmailsDiv.style.display = 'none';
            }
        }
    }
    
    refreshEmailsList() {
        const emailsList = document.querySelector('.emails-list');
        if (!emailsList) return;
        
        emailsList.innerHTML = '';
        
        this.generatedEmails.forEach(emailData => {
            const emailItem = document.createElement('div');
            emailItem.className = 'email-item';
            emailItem.innerHTML = `
                <div>
                    <strong>${emailData.name}</strong>
                    <span class="user-type-badge ${emailData.userType}">${emailData.userDescription}</span><br>
                    <span style="color: var(--color1); font-weight: 500;">${emailData.email}</span><br>
                    <small style="color: var(--text-light);">DNI: ${emailData.dni} | Creado: ${emailData.createdAt}</small>
                </div>
                <div class="email-credentials">
                    <small>Contraseña: <strong style="color: var(--color2);">${emailData.password}</strong></small>
                    <button class="btn-remove" onclick="emailGenerator.removeEmail('${emailData.dni}')" style="margin-left: 10px; padding: 4px 8px; font-size: 12px; background: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            emailsList.appendChild(emailItem);
        });
    }
    
    showSuccessMessage(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (document.body.contains(successDiv)) {
                    document.body.removeChild(successDiv);
                }
            }, 300);
        }, 3000);
    }
    
    downloadEmailList() {
        if (this.generatedEmails.length === 0) {
            alert('No hay correos generados para descargar');
            return;
        }
        
        let csvContent = 'DNI,Nombre,Tipo,Grado,Sección,Correo Electrónico,Contraseña,Fecha de Creación\n';
        
        this.generatedEmails.forEach(email => {
            const grade = email.grade ? this.formatGrade(email.grade) : 'N/A';
            const section = email.section || 'N/A';
            csvContent += `"${email.dni}","${email.name}","${email.userType}","${grade}","${section}","${email.email}","${email.password}","${email.createdAt}"\n`;
        });
        
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
            
            this.showSuccessMessage('Lista de correos descargada exitosamente');
        }
    }
}

// Global variable for access from HTML onclick
let emailGenerator;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    emailGenerator = new EmailGenerator();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailGenerator;
}
