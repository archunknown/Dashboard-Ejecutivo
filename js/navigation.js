// ArchEducation Dashboard Navigation
class DashboardNavigation {
    constructor() {
        this.currentSection = 'dashboard';
        this.navItems = document.querySelectorAll('.nav-item');
        this.contentSections = document.querySelectorAll('.content-section');
        this.mobileMenuBtn = null;
        this.sidebar = document.querySelector('.sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.dashboardContainer = document.querySelector('.dashboard-container');
        this.isCollapsed = false;
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupSidebarToggle();
        this.loadSidebarState();
        this.setupMobileMenu();
        this.setupTabNavigation();
        this.setupFilters();
        this.setupSearch();
    }
    
    setupSidebarToggle() {
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }
    
    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            this.sidebar.classList.add('collapsed');
            this.dashboardContainer.classList.add('sidebar-collapsed');
        } else {
            this.sidebar.classList.remove('collapsed');
            this.dashboardContainer.classList.remove('sidebar-collapsed');
        }
        
        // Save state to localStorage
        localStorage.setItem('sidebarCollapsed', this.isCollapsed);
    }
    
    loadSidebarState() {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            this.isCollapsed = true;
            this.sidebar.classList.add('collapsed');
            this.dashboardContainer.classList.add('sidebar-collapsed');
        }
    }
    
    setupNavigation() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('data-section');
                this.navigateToSection(section);
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });
    }
    
    setupMobileMenu() {
        // Create mobile menu button if it doesn't exist
        if (window.innerWidth <= 768 && !this.mobileMenuBtn) {
            this.createMobileMenuButton();
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && !this.mobileMenuBtn) {
                this.createMobileMenuButton();
            } else if (window.innerWidth > 768 && this.mobileMenuBtn) {
                this.removeMobileMenuButton();
            }
        });
    }
    
    createMobileMenuButton() {
        this.mobileMenuBtn = document.createElement('button');
        this.mobileMenuBtn.className = 'mobile-menu-btn';
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        const headerLeft = document.querySelector('.header-left');
        headerLeft.insertBefore(this.mobileMenuBtn, headerLeft.firstChild);
        
        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.sidebar.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    removeMobileMenuButton() {
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.remove();
            this.mobileMenuBtn = null;
        }
    }
    
    toggleMobileMenu() {
        this.sidebar.classList.toggle('mobile-active');
        const icon = this.mobileMenuBtn.querySelector('i');
        
        if (this.sidebar.classList.contains('mobile-active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    }
    
    closeMobileMenu() {
        this.sidebar.classList.remove('mobile-active');
        if (this.mobileMenuBtn) {
            const icon = this.mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    }
    
    navigateToSection(sectionId) {
        // Update active nav item
        this.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            }
        });
        
        // Update active content section
        this.contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
        
        this.currentSection = sectionId;
        
        // Trigger section-specific initialization
        this.initializeSection(sectionId);
    }
    
    initializeSection(sectionId) {
        switch(sectionId) {
            case 'usuarios':
                this.initializeUsersSection();
                break;
            case 'repositorios':
                this.initializeRepositoriesSection();
                break;
            case 'biblioteca':
                this.initializeLibrarySection();
                break;
            case 'mensajes':
                this.initializeMessagesSection();
                break;
        }
    }
    
    setupTabNavigation() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.getAttribute('data-tab');
                this.switchTab(tabName, btn);
            });
        });
    }
    
    switchTab(tabName, activeBtn) {
        // Update active tab button
        const tabBtns = activeBtn.parentElement.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        
        // Show/hide content based on tab
        if (tabName === 'estudiantes') {
            this.showStudentsList();
        } else {
            this.showTeachersList();
        }
    }
    
    showTeachersList() {
        const usersList = document.getElementById('docentes-list');
        if (usersList) {
            usersList.style.display = 'flex';
        }
        
        // Hide students list if it exists
        const studentsList = document.getElementById('estudiantes-list');
        if (studentsList) {
            studentsList.style.display = 'none';
        }
    }
    
    showStudentsList() {
        // Create students list if it doesn't exist
        let studentsList = document.getElementById('estudiantes-list');
        if (!studentsList) {
            studentsList = this.createStudentsList();
        }
        
        // Hide teachers list
        const teachersList = document.getElementById('docentes-list');
        if (teachersList) {
            teachersList.style.display = 'none';
        }
        
        studentsList.style.display = 'flex';
    }
    
    createStudentsList() {
        const studentsData = [
            {
                name: 'Ana María Quispe Huamán',
                grade: '3° Secundaria - Sección A',
                email: 'ana.quispe@jfsanchezcarrion.edu.pe',
                status: 'active',
                avatar: 'AQ'
            },
            {
                name: 'Carlos Eduardo Mendoza Silva',
                grade: '4° Secundaria - Sección B',
                email: 'carlos.mendoza@jfsanchezcarrion.edu.pe',
                status: 'active',
                avatar: 'CM'
            },
            {
                name: 'María Fernanda López Vargas',
                grade: '2° Secundaria - Sección A',
                email: 'maria.lopez@jfsanchezcarrion.edu.pe',
                status: 'active',
                avatar: 'ML'
            },
            {
                name: 'José Antonio Ramírez Ccahuana',
                grade: '5° Secundaria - Sección C',
                email: 'jose.ramirez@jfsanchezcarrion.edu.pe',
                status: 'inactive',
                avatar: 'JR'
            }
        ];
        
        const studentsList = document.createElement('div');
        studentsList.id = 'estudiantes-list';
        studentsList.className = 'users-list';
        studentsList.style.display = 'none';
        
        studentsData.forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = 'user-card';
            studentCard.innerHTML = `
                <div class="user-avatar">
                    <img src="https://via.placeholder.com/50x50/0085ff/ffffff?text=${student.avatar}" alt="${student.name}">
                </div>
                <div class="user-info">
                    <h4>${student.name}</h4>
                    <p>${student.grade}</p>
                    <span class="user-email">${student.email}</span>
                </div>
                <div class="user-status ${student.status}">${student.status === 'active' ? 'Activo' : 'Inactivo'}</div>
            `;
            studentsList.appendChild(studentCard);
        });
        
        const usersContainer = document.querySelector('.users-container');
        usersContainer.appendChild(studentsList);
        
        return studentsList;
    }
    
    setupFilters() {
        // Repository filters
        const subjectFilter = document.getElementById('subject-filter');
        const gradeFilter = document.getElementById('grade-filter');
        
        if (subjectFilter) {
            subjectFilter.addEventListener('change', () => {
                this.filterRepositories();
            });
        }
        
        if (gradeFilter) {
            gradeFilter.addEventListener('change', () => {
                this.filterRepositories();
            });
        }
        
        // Library filters
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.filterLibrary();
            });
        }
    }
    
    setupSearch() {
        // Repository search
        const repoSearch = document.getElementById('repo-search');
        if (repoSearch) {
            repoSearch.addEventListener('input', (e) => {
                this.searchRepositories(e.target.value);
            });
        }
        
        // Library search
        const librarySearch = document.getElementById('library-search');
        if (librarySearch) {
            librarySearch.addEventListener('input', (e) => {
                this.searchLibrary(e.target.value);
            });
        }
        
        // Users search
        const usersSearch = document.querySelector('.users-container .search-box input');
        if (usersSearch) {
            usersSearch.addEventListener('input', (e) => {
                this.searchUsers(e.target.value);
            });
        }
    }
    
    filterRepositories() {
        const subjectFilter = document.getElementById('subject-filter');
        const gradeFilter = document.getElementById('grade-filter');
        const repoCards = document.querySelectorAll('.repo-card');
        
        const selectedSubject = subjectFilter ? subjectFilter.value : '';
        const selectedGrade = gradeFilter ? gradeFilter.value : '';
        
        repoCards.forEach(card => {
            const cardSubject = card.getAttribute('data-subject');
            const cardGrade = card.getAttribute('data-grade');
            
            const subjectMatch = !selectedSubject || cardSubject === selectedSubject;
            const gradeMatch = !selectedGrade || cardGrade === selectedGrade;
            
            if (subjectMatch && gradeMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    filterLibrary() {
        const categoryFilter = document.getElementById('category-filter');
        const bookCards = document.querySelectorAll('.book-card');
        
        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        
        bookCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (!selectedCategory || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchRepositories(query) {
        const repoCards = document.querySelectorAll('.repo-card');
        const searchTerm = query.toLowerCase();
        
        repoCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const author = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchLibrary(query) {
        const bookCards = document.querySelectorAll('.book-card');
        const searchTerm = query.toLowerCase();
        
        bookCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const author = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchUsers(query) {
        const userCards = document.querySelectorAll('.user-card');
        const searchTerm = query.toLowerCase();
        
        userCards.forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            const subject = card.querySelector('p').textContent.toLowerCase();
            const email = card.querySelector('.user-email').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || subject.includes(searchTerm) || email.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    initializeUsersSection() {
        // Reset filters and search
        const usersSearch = document.querySelector('.users-container .search-box input');
        if (usersSearch) {
            usersSearch.value = '';
        }
        
        // Show all user cards
        const userCards = document.querySelectorAll('.user-card');
        userCards.forEach(card => {
            card.style.display = 'flex';
        });
    }
    
    initializeRepositoriesSection() {
        // Reset filters and search
        const subjectFilter = document.getElementById('subject-filter');
        const gradeFilter = document.getElementById('grade-filter');
        const repoSearch = document.getElementById('repo-search');
        
        if (subjectFilter) subjectFilter.value = '';
        if (gradeFilter) gradeFilter.value = '';
        if (repoSearch) repoSearch.value = '';
        
        // Show all repository cards
        const repoCards = document.querySelectorAll('.repo-card');
        repoCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    
    initializeLibrarySection() {
        // Reset filters and search
        const categoryFilter = document.getElementById('category-filter');
        const librarySearch = document.getElementById('library-search');
        
        if (categoryFilter) categoryFilter.value = '';
        if (librarySearch) librarySearch.value = '';
        
        // Show all book cards
        const bookCards = document.querySelectorAll('.book-card');
        bookCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    
    initializeMessagesSection() {
        // Mark messages as read when section is opened
        const unreadMessages = document.querySelectorAll('.message-item.unread');
        setTimeout(() => {
            unreadMessages.forEach(message => {
                message.classList.remove('unread');
            });
            
            // Update message badge
            const messageBadge = document.querySelector('.message-badge');
            if (messageBadge) {
                messageBadge.style.display = 'none';
            }
        }, 1000);
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardNavigation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardNavigation;
}
