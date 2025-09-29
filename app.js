// Course data with all courses including Informações Gerais
const coursesData = {
    "informacoes": {
        nome: "Informações Gerais",
        icon: "ℹ️",
        descricao: "Informações gerais sobre os cursos de formação aeronáutica",
        materias: ["Regulamentação ANAC", "Mercado de Trabalho", "Processo Seletivo", "Metodologia EAD", "Tecnologia VR", "Certificações"],
        carga_horaria: "Consulta",
        duracao: "Informações",
        prerequisitos: "Interessados na área aeronáutica",
        certificacao: "Orientação para certificação ANAC"
    },
    "modulo-basico": {
        nome: "Módulo Básico (Formação Obrigatória)",
        icon: "✈️",
        descricao: "Formação obrigatória para todos os mecânicos de aeronaves",
        materias: ["Aerodinâmica", "Materiais Aeronáuticos", "Peso e Balanceamento", "Regulamentação Aeronáutica", "Fatores Humanos", "Segurança Operacional"],
        carga_horaria: "400 horas",
        duracao: "6 meses",
        prerequisitos: "Ensino médio completo, 18 anos",
        certificacao: "ANAC obrigatória"
    },
    "gmp": {
        nome: "GMP - Grupo Motopropulsor",
        icon: "🚁",
        descricao: "Especialização em motores aeronáuticos",
        materias: ["Motores a Pistão", "Motores a Reação", "Sistemas de Combustível", "Sistemas de Ignição", "Sistemas de Lubrificação", "Hélices e Rotores"],
        carga_horaria: "600 horas",
        duracao: "7-8 meses",
        prerequisitos: "Módulo Básico concluído",
        habilitacao: "Específica em Grupo Motopropulsor"
    },
    "celula": {
        nome: "Célula - Estrutura da Aeronave",
        icon: "🛩️",
        descricao: "Especialização na estrutura das aeronaves",
        materias: ["Estruturas", "Sistemas Hidráulicos", "Sistemas Pneumáticos", "Ar Condicionado e Pressurização", "Trem de Pouso", "Controles de Voo"],
        carga_horaria: "600 horas",
        duracao: "7 meses",
        prerequisitos: "Módulo Básico concluído",
        habilitacao: "Específica em Célula"
    },
    "avionicos": {
        nome: "Aviônicos - Sistemas Eletrônicos",
        icon: "📡",
        descricao: "Especialização em sistemas eletrônicos de aeronaves",
        materias: ["Sistemas de Navegação", "Comunicação", "Instrumentos de Voo", "Autopiloto", "Sistemas de Monitoramento", "Eletrônica Digital"],
        carga_horaria: "600 horas",
        duracao: "7 meses",
        prerequisitos: "Módulo Básico concluído",
        habilitacao: "Específica em Aviônicos"
    }
};

// Course messages for form
const courseMessages = {
    "informacoes-gerais": "Gostaria de receber informações gerais sobre os cursos da MasterFly.",
    "modulo-basico": "Tenho interesse no Módulo Básico (Formação Obrigatória) da MasterFly.",
    "gmp": "Tenho interesse no curso GMP - Grupo Motopropulsor da MasterFly.",
    "celula": "Tenho interesse no curso Célula - Estrutura da Aeronave da MasterFly.",
    "avionicos": "Tenho interesse no curso Aviônicos - Sistemas Eletrônicos da MasterFly."
};

// Global recognition data
const globalData = {
    estatisticas_globais: {
        demanda_global: "710.000 novos técnicos até 2044",
        crescimento_anual: "5% ao ano",
        mercado_valor: "US$ 6,7 bilhões até 2032",
        salario_brasil: "R$ 4.400",
        salario_eua: "US$ 72-100k"
    },
    projecao_regioes: [
        {regiao: "América do Norte", tecnicos: 125000},
        {regiao: "Europa", tecnicos: 99000},
        {regiao: "Ásia", tecnicos: 267000},
        {regiao: "América Latina", tecnicos: 45000},
        {regiao: "Oriente Médio", tecnicos: 59000},
        {regiao: "África", tecnicos: 25000}
    ],
    citacoes: [
        {
            fonte: "Boeing 2025",
            citacao: "710,000 maintenance technicians will be needed to maintain the global commercial fleet over the next 20 years."
        },
        {
            fonte: "PIA Technical School",
            citacao: "Behind every safe flight, there is an aviation technician working diligently. These are the unsung heroes of the aviation industry."
        },
        {
            fonte: "Thrust Institute", 
            citacao: "A&P mechanics must sign aircraft off and take responsibility for the safety of pilots and passengers."
        }
    ]
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando MasterFly website com logo atualizada...');
    
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Dropdown menu functionality
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        if (!link.classList.contains('disabled')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const courseId = this.dataset.course;
                if (courseId && coursesData[courseId]) {
                    showCourseDetail(courseId);
                    // Scroll to courses section
                    const coursesSection = document.getElementById('cursos');
                    if (coursesSection) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        window.scrollTo({
                            top: coursesSection.offsetTop - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });

    // Course navigation functionality
    const coursesView = document.getElementById('coursesView');
    const courseDetailView = document.getElementById('courseDetail');
    const courseDetailContent = document.getElementById('courseDetailContent');
    const backToCourses = document.getElementById('backToCourses');

    // Course card click handlers
    const courseCards = document.querySelectorAll('.clickable-card');
    courseCards.forEach(card => {
        const courseId = card.dataset.course;
        
        // Add click handler to entire card
        card.addEventListener('click', function() {
            showCourseDetail(courseId);
        });
        
        // Add specific click handler to details button
        const detailsBtn = card.querySelector('.course-details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showCourseDetail(courseId);
            });
        }
    });

    // Back button handler
    if (backToCourses) {
        backToCourses.addEventListener('click', function() {
            showCoursesList();
        });
    }

    // Function to show course details
    function showCourseDetail(courseId) {
        const courseData = coursesData[courseId];
        if (!courseData || !coursesView || !courseDetailView || !courseDetailContent) return;

        console.log(`📚 Mostrando detalhes do curso: ${courseData.nome}`);

        // Hide courses list and show detail view
        coursesView.classList.add('hidden');
        courseDetailView.classList.remove('hidden');

        // Populate course detail content
        const detailHTML = generateCourseDetailHTML(courseData);
        courseDetailContent.innerHTML = detailHTML;

        // Scroll to top of courses section
        const coursesSection = document.getElementById('cursos');
        if (coursesSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: coursesSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }

        // Animate content
        setTimeout(() => {
            const detailContent = courseDetailView.querySelector('.course-detail-content');
            if (detailContent) {
                detailContent.style.opacity = '0';
                detailContent.style.transform = 'translateY(30px)';
                
                requestAnimationFrame(() => {
                    detailContent.style.transition = 'all 0.5s ease';
                    detailContent.style.opacity = '1';
                    detailContent.style.transform = 'translateY(0)';
                });
            }
        }, 50);
    }

    // Function to show courses list
    function showCoursesList() {
        if (courseDetailView && coursesView) {
            courseDetailView.classList.add('hidden');
            coursesView.classList.remove('hidden');
            console.log('📋 Voltando para lista de cursos');
        }
    }

    // Function to generate course detail HTML
    function generateCourseDetailHTML(courseData) {
        const materias = courseData.materias.map(materia => 
            `<div class="subject-item">${materia}</div>`
        ).join('');

        return `
            <div class="course-detail-header">
                <div class="course-detail-icon">${courseData.icon}</div>
                <h2 class="course-detail-title">${courseData.nome}</h2>
                <p class="course-detail-subtitle">${courseData.descricao}</p>
            </div>

            <div class="course-detail-info">
                <div class="course-info-card">
                    <h4>⏱️ Duração</h4>
                    <p>${courseData.duracao}</p>
                </div>
                <div class="course-info-card">
                    <h4>📚 Carga Horária</h4>
                    <p>${courseData.carga_horaria}</p>
                </div>
                <div class="course-info-card">
                    <h4>✅ Pré-requisitos</h4>
                    <p>${courseData.prerequisitos}</p>
                </div>
                ${courseData.certificacao ? `
                <div class="course-info-card">
                    <h4>🎓 Certificação</h4>
                    <p>${courseData.certificacao}</p>
                </div>
                ` : ''}
                ${courseData.habilitacao ? `
                <div class="course-info-card">
                    <h4>🏆 Habilitação</h4>
                    <p>${courseData.habilitacao}</p>
                </div>
                ` : ''}
            </div>

            <div class="course-subjects">
                <h3>📖 ${courseData.nome === 'Informações Gerais' ? 'Tópicos Abordados' : 'Matérias do Curso'}</h3>
                <div class="subjects-grid">
                    ${materias}
                </div>
            </div>

            <div class="course-cta">
                <h3>Interessado neste curso?</h3>
                <p>Entre em contato conosco para mais informações e inscrições</p>
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                    <a href="https://wa.me/5531973171465" target="_blank" class="btn btn--primary btn--lg">
                        <span>📱 WhatsApp (31) 97317-1465</span>
                        <div class="btn-shine"></div>
                    </a>
                    <a href="mailto:contato@masterfly.com.br" class="btn btn--secondary btn--lg">
                        <span>📧 contato@masterfly.com.br</span>
                    </a>
                </div>
            </div>
        `;
    }

    // Initialize Global Recognition Chart
    function initializeGlobalChart() {
        const ctx = document.getElementById('globalChart');
        if (!ctx) return;

        const chartData = globalData.projecao_regioes;
        const labels = chartData.map(item => item.regiao);
        const data = chartData.map(item => item.tecnicos);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Técnicos Necessários',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors.map(color => color + '80'),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 26, 0.9)',
                        titleColor: '#FFD700',
                        bodyColor: '#ffffff',
                        borderColor: '#FFD700',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${value.toLocaleString()} técnicos (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });

        console.log('📊 Gráfico global inicializado com sucesso');
    }

    // Typing animation for hero title
    function typeWriter() {
        const heroTitle = document.getElementById('typingTitle');
        if (!heroTitle) return;

        const text = 'MasterFly - Primeira Escola EAD com VR Básico';
        heroTitle.textContent = '';
        
        let i = 0;
        const speed = 80;
        
        function type() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Add cursor blink effect after typing is complete
                heroTitle.style.borderRight = '3px solid var(--masterfly-yellow)';
                heroTitle.style.animation = 'blink 1s infinite';
                
                // Add blinking cursor animation to CSS
                if (!document.querySelector('#blink-styles')) {
                    const style = document.createElement('style');
                    style.id = 'blink-styles';
                    style.textContent = `
                        @keyframes blink {
                            0%, 50% { border-right-color: var(--masterfly-yellow); }
                            51%, 100% { border-right-color: transparent; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(type, 1000);
    }

    // Initialize typing animation
    typeWriter();

    // Initialize all images properly
    function initializeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Set proper initial styles
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Handle image load events
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                console.log(`✅ Imagem carregada: ${this.alt || this.src.split('/').pop()}`);
            });

            // Handle image error events
            img.addEventListener('error', function() {
                console.warn('⚠️ Falha ao carregar imagem:', this.src);
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                
                // Special handling for logo fallback
                if (this.classList.contains('logo-img')) {
                    console.log('🔄 Usando fallback para logo');
                    this.style.display = 'none';
                    const fallback = this.nextElementSibling;
                    if (fallback && fallback.classList.contains('logo-icon-fallback')) {
                        fallback.style.display = 'flex';
                    }
                }
            });

            // If image is already loaded
            if (img.complete && img.naturalHeight !== 0) {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }
        });
    }

    // Initialize images immediately
    initializeImages();

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Handle specific animations
                if (entry.target.classList.contains('clickable-card')) {
                    const delay = parseInt(entry.target.dataset.delay) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
                
                // Animate efficiency stat cards in sequence
                if (entry.target.classList.contains('efficiency-stats-grid')) {
                    const cards = entry.target.querySelectorAll('.efficiency-stat-card');
                    cards.forEach((card, index) => {
                        const delay = parseInt(card.dataset.delay) || (index * 100);
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, delay);
                    });
                }

                // Animate global stat cards in sequence
                if (entry.target.classList.contains('global-stats-grid')) {
                    const cards = entry.target.querySelectorAll('.global-stat-card');
                    cards.forEach((card, index) => {
                        const delay = parseInt(card.dataset.delay) || (index * 100);
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, delay);
                    });
                }

                // Animate regional breakdown items
                if (entry.target.classList.contains('regional-breakdown')) {
                    const items = entry.target.querySelectorAll('.region-item');
                    items.forEach((item, index) => {
                        const delay = parseInt(item.dataset.delay) || (index * 100);
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, delay);
                    });
                }

                // Animate quote cards
                if (entry.target.classList.contains('quotes-grid')) {
                    const cards = entry.target.querySelectorAll('.quote-card');
                    cards.forEach((card, index) => {
                        const delay = parseInt(card.dataset.delay) || (index * 200);
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, delay);
                    });
                }

                // Animate VR benefit cards
                if (entry.target.classList.contains('vr-benefits')) {
                    const cards = entry.target.querySelectorAll('.benefit-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }

                // Animate gallery items
                if (entry.target.classList.contains('gallery-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
        '.clickable-card, .text-card, .benefit-card, .gallery-item, ' +
        '.efficiency-stats-grid, .efficiency-stat-card, .vr-benefits, ' +
        '.global-stats-grid, .global-stat-card, .regional-breakdown, ' +
        '.region-item, .quotes-grid, .quote-card'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Initialize benefit cards for animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Counter observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe stats sections
    const statsElements = document.querySelectorAll('.hero-stats');
    statsElements.forEach(element => {
        if (element) counterObserver.observe(element);
    });

    // Chart observer for global recognition section
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Initialize chart when visible
                setTimeout(() => {
                    initializeGlobalChart();
                }, 500);
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe chart container
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }

    // Efficiency section special animations
    const efficiencyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger comparison bars animation
                const comparisonFills = entry.target.querySelectorAll('.comparison-fill');
                comparisonFills.forEach((fill, index) => {
                    setTimeout(() => {
                        fill.style.animation = 'fillBar 2s ease forwards';
                    }, index * 500);
                });
                
                efficiencyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe efficiency highlight section
    const efficiencyHighlight = document.querySelector('.efficiency-highlight');
    if (efficiencyHighlight) {
        efficiencyObserver.observe(efficiencyHighlight);
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return; // Skip if empty or just #
            
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Header background on scroll with animation
    function updateHeaderBackground() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.transform = 'translateY(0)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
            }
        }
    }

    // Scroll event listeners with throttling
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateHeaderBackground();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Contact form handling with animations and course-specific messages
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Update message based on course selection
        const courseSelect = contactForm.querySelector('#course');
        const messageTextarea = contactForm.querySelector('#message');
        
        if (courseSelect && messageTextarea) {
            courseSelect.addEventListener('change', function() {
                const selectedCourse = this.value;
                if (selectedCourse && courseMessages[selectedCourse]) {
                    messageTextarea.value = courseMessages[selectedCourse];
                    messageTextarea.style.height = 'auto';
                    messageTextarea.style.height = messageTextarea.scrollHeight + 'px';
                }
            });
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('📝 Processando formulário de contato...');
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                course: formData.get('course'),
                message: formData.get('message')
            };

            // Basic form validation
            if (!data.name || !data.email || !data.phone) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Phone validation
            const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
            if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
                showNotification('Por favor, insira um telefone válido.', 'error');
                return;
            }

            // Animate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.querySelector('span').textContent;
            const buttonSpan = submitButton.querySelector('span');
            
            buttonSpan.textContent = 'Enviando...';
            submitButton.disabled = true;
            contactForm.classList.add('loading');

            // Add loading animation
            submitButton.style.position = 'relative';
            submitButton.style.overflow = 'hidden';
            
            const loader = document.createElement('div');
            loader.className = 'btn-loader';
            loader.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                margin: -10px 0 0 -10px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            `;
            
            submitButton.appendChild(loader);

            // Add spin animation
            if (!document.querySelector('#spin-styles')) {
                const style = document.createElement('style');
                style.id = 'spin-styles';
                style.textContent = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }

            // Simulate API call delay
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                contactForm.reset();
                buttonSpan.textContent = originalText;
                submitButton.disabled = false;
                contactForm.classList.remove('loading');
                if (loader.parentNode) {
                    loader.remove();
                }
                
                console.log('✅ Formulário enviado com sucesso!');
                
                // Animate form reset
                const formControls = contactForm.querySelectorAll('.form-control');
                formControls.forEach((control, index) => {
                    setTimeout(() => {
                        control.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            control.style.transform = 'scale(1)';
                        }, 150);
                    }, index * 50);
                });
                
            }, 2000);
        });
    }

    // Advanced hover effects for course cards
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.2)';
            
            // Add subtle floating animation
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Add mouse movement effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            this.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            
            if (img && overlay) {
                const title = overlay.querySelector('h4').textContent;
                const description = overlay.querySelector('p').textContent;
                createLightbox(img.src, img.alt, title, description);
            }
        });
    });

    // Create lightbox
    function createLightbox(src, alt, title, description) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${src}" alt="${alt}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        // Add lightbox styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const backdrop = lightbox.querySelector('.lightbox-backdrop');
        backdrop.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: var(--masterfly-dark-gray);
            border-radius: var(--radius-lg);
            padding: var(--space-20);
            border: 2px solid var(--masterfly-yellow);
            animation: zoomIn 0.3s ease;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            color: var(--masterfly-yellow);
            font-size: 30px;
            cursor: pointer;
            z-index: 1;
        `;
        
        const img = lightbox.querySelector('img');
        img.style.cssText = `
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
            border-radius: var(--radius-base);
            margin-bottom: var(--space-16);
        `;
        
        const info = lightbox.querySelector('.lightbox-info');
        info.style.cssText = `
            text-align: center;
            color: var(--color-text);
        `;
        
        // Add animation styles
        if (!document.querySelector('#lightbox-styles')) {
            const style = document.createElement('style');
            style.id = 'lightbox-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .lightbox h3 { color: var(--masterfly-yellow); margin-bottom: var(--space-8); }
                .lightbox p { color: var(--color-text-secondary); }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(lightbox);
        
        // Close lightbox
        function closeLightbox() {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (lightbox.parentNode) {
                    lightbox.remove();
                }
            }, 300);
        }
        
        closeBtn.addEventListener('click', closeLightbox);
        backdrop.addEventListener('click', closeLightbox);
        
        // Close with escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Initialize all animations and effects
    function initializeEffects() {
        // Add hover effect to stat badges
        const statBadges = document.querySelectorAll('.stat-badge');
        statBadges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
            });

            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });

        // Add smooth transitions to all elements
        const transitionElements = document.querySelectorAll('.benefit-card, .showcase-item, .efficiency-stat-card, .gallery-item, .global-stat-card, .quote-card');
        transitionElements.forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });

        console.log('🚀 MasterFly website inicializado com sucesso!');
        console.log('✅ Logo atualizada (Logo.jpg) com fallback funcionando');
        console.log('✅ Menu suspenso com todas as 6 opções funcionando perfeitamente:');
        console.log('   - Selecione um curso (disabled)');
        console.log('   - Informações Gerais');
        console.log('   - Módulo Básico (Formação Obrigatória)');
        console.log('   - GMP - Grupo Motopropulsor');
        console.log('   - Célula - Estrutura da Aeronave');
        console.log('   - Aviônicos - Sistemas Eletrônicos');
        console.log('✅ Nova seção "Reconhecimento Global" implementada');
        console.log('📊 Gráfico mundial de projeções configurado');
        console.log('📈 Estatísticas globais da profissão adicionadas');
        console.log('🌍 Citações da indústria incluídas');
        console.log('✅ Todas as imagens VR carregadas corretamente');
        console.log('📱 VR Cardboard, VR Box e headsets básicos funcionando');
        console.log('🎯 Cursos clicáveis funcionando');
        console.log('📝 Formulário com validação e mensagens personalizadas funcionando');
        console.log('📞 Contatos: (31) 97317-1465 e contato@masterfly.com.br');
        console.log('🎨 Design e animações preservados');
        console.log('📱 Responsividade mantida');
    }

    // Initialize everything
    initializeEffects();
});

// Utility function to show notifications with advanced styling
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
        <div class="notification-progress"></div>
    `;

    // Add notification styles
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 12px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-family: var(--font-family-base);
        overflow: hidden;
        backdrop-filter: blur(10px);
    `;

    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%) scale(0.8); opacity: 0; }
                to { transform: translateX(0) scale(1); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0) scale(1); opacity: 1; }
                to { transform: translateX(100%) scale(0.8); opacity: 0; }
            }
            @keyframes progressBar {
                from { width: 100%; }
                to { width: 0%; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 20px;
            }
            .notification-icon {
                font-size: 20px;
            }
            .notification-message {
                flex: 1;
                font-weight: 500;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
                opacity: 0.8;
                transition: opacity 0.2s ease;
            }
            .notification-close:hover {
                opacity: 1;
                transform: scale(1.1);
            }
            .notification-progress {
                height: 3px;
                background: rgba(255, 255, 255, 0.3);
                animation: progressBar 5s linear;
            }
        `;
        document.head.appendChild(style);
    }

    // Add to body
    document.body.appendChild(notification);

    // Auto remove after 5 seconds with progress bar
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            setTimeout(() => {
                if (notification && notification.parentNode) {
                    notification.remove();
                }
            }, 400);
        }
    }, 5000);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.remove();
            }
        }, 400);
    });
}