// ============================================
// SCRIPT.JS - Agrinho 2026
// ============================================

// Dados do Quiz
const quizData = [
    {
        question: "Qual é o principal benefício do plantio direto?",
        options: [
            "Reduz erosão e economiza combustível",
            "Aumenta o uso de pesticidas",
            "Diminui a produtividade"
        ],
        correct: 0
    },
    {
        question: "O que é rotação de culturas?",
        options: [
            "Girar as máquinas agrícolas",
            "Alternar diferentes culturas na mesma área para manter a fertilidade",
            "Rotar os trabalhadores da fazenda"
        ],
        correct: 1
    },
    {
        question: "Qual prática ajuda a conservar a água?",
        options: [
            "Deixar a terra seca",
            "Usar irrigação eficiente com sistemas modernos",
            "Não regar as plantas"
        ],
        correct: 1
    },
    {
        question: "Por que proteger a mata ciliar é importante?",
        options: [
            "Para embelezar a propriedade",
            "Protege nascentes, reduz erosão e mantém biodiversidade",
            "Não tem importância"
        ],
        correct: 1
    },
    {
        question: "O que é compostagem?",
        options: [
            "Queimar resíduos",
            "Transformar resíduos em nutrientes valiosos para o solo",
            "Jogar lixo fora"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeQuiz();
    initializeCalculator();
    initializeForm();
    initializeAnimations();
    setupMobileMenu();
});

// ============================================
// NAVEGAÇÃO
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                closeMenuIfOpen();
            }
        });
    });
}

function smoothScroll(targetId) {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// MENU MOBILE
// ============================================

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function closeMenuIfOpen() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}

// ============================================
// QUIZ
// ============================================

function initializeQuiz() {
    loadQuizQuestion();
    
    // Botão para reiniciar quiz
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
}

function loadQuizQuestion() {
    if (currentQuestion < quizData.length) {
        const question = quizData[currentQuestion];
        const questionElement = document.getElementById('quiz-question');
        const optionsElement = document.getElementById('quiz-options');
        const nextBtn = document.getElementById('next-btn');

        // Mostrar número da questão
        questionElement.textContent = `Pergunta ${currentQuestion + 1}/${quizData.length}: ${question.question}`;

        // Limpar opções anteriores
        optionsElement.innerHTML = '';

        // Criar botões de opção
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-button';
            button.addEventListener('click', function() {
                selectOption(index, question.correct);
            });
            optionsElement.appendChild(button);
        });

        nextBtn.style.display = 'none';
    } else {
        showQuizResults();
    }
}

function selectOption(selectedIndex, correctIndex) {
    const optionButtons = document.querySelectorAll('.option-button');
    const nextBtn = document.getElementById('next-btn');

    optionButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add('correct');
        }

        if (index === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add('incorrect');
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        showFeedback('✅ Correto!', true);
    } else {
        showFeedback('❌ Incorreto! Tente a próxima.', false);
    }

    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    loadQuizQuestion();
}

function showQuizResults() {
    const questionElement = document.getElementById('quiz-question');
    const optionsElement = document.getElementById('quiz-options');
    const nextBtn = document.getElementById('next-btn');

    const percentage = ((score / quizData.length) * 100).toFixed(0);

    let message = '';
    let emoji = '';

    if (percentage >= 80) {
        message = `Excelente! Você acertou ${score}/${quizData.length} questões!`;
        emoji = '🌟';
    } else if (percentage >= 60) {
        message = `Bom! Você acertou ${score}/${quizData.length} questões!`;
        emoji = '👍';
    } else {
        message = `Você acertou ${score}/${quizData.length} questões. Continue aprendendo!`;
        emoji = '📚';
    }

    questionElement.innerHTML = `
        <div class="quiz-results">
            <p class="results-emoji">${emoji}</p>
            <p class="results-message">${message}</p>
            <p class="results-percentage">${percentage}% de acerto</p>
        </div>
    `;

    optionsElement.innerHTML = '';
    nextBtn.innerHTML = 'Reiniciar Quiz';
    nextBtn.style.display = 'block';
    nextBtn.onclick = resetQuiz;
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuizQuestion();
}

function showFeedback(message, isCorrect) {
    // Você pode adicionar feedback visual aqui
    console.log(message);
}

// ============================================
// CALCULADORA DE IMPACTO
// ============================================

function initializeCalculator() {
    const areaSlider = document.getElementById('area-slider');
    const areaDisplay = document.getElementById('area-display');
    const carbonResult = document.getElementById('carbon-result');

    if (areaSlider) {
        areaSlider.addEventListener('input', function() {
            const area = this.value;
            const carbonNeutralized = (area * 25).toLocaleString('pt-BR');

            areaDisplay.textContent = `${area} hectares`;
            carbonResult.textContent = `${carbonNeutralized} toneladas/ano`;

            // Animação visual
            carbonResult.style.animation = 'none';
            setTimeout(() => {
                carbonResult.style.animation = 'pulse 0.5s ease-out';
            }, 10);
        });

        // Inicializar com valor padrão
        areaSlider.dispatchEvent(new Event('input'));
    }
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================

function initializeForm() {
    const form = document.getElementById('contato-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simular envio
            feedback.innerHTML = '📤 Enviando mensagem...';
            feedback.classList.add('loading');

            setTimeout(() => {
                feedback.innerHTML = '✅ Mensagem enviada com sucesso! Obrigado por se juntar ao movimento!';
                feedback.classList.remove('loading');
                feedback.classList.add('success');
                form.reset();

                // Limpar feedback após 5 segundos
                setTimeout(() => {
                    feedback.innerHTML = '';
                    feedback.classList.remove('success');
                }, 5000);
            }, 1000);
        });
    }
}

// ============================================
// ANIMAÇÕES
// ============================================

function initializeAnimations() {
    // Observador para animar elementos ao entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Aplicar observador a cards e elementos
    document.querySelectorAll('.tema-card, .pilar-card, .galeria-card, .pratica-item').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// EFEITOS VISUAIS ADICIONAIS
// ============================================

// Efeito de parallax suave no scroll
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
});

// Adicionar classe ativa ao link de navegação durante o scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

// Função para criar efeito de ripple ao clicar
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// Aplicar ripple effect a botões
document.querySelectorAll('button').forEach(button => {
    addRippleEffect(button);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
    // Enter para responder quiz
    if (e.key === 'Enter' && document.getElementById('next-btn').style.display === 'block') {
        document.getElementById('next-btn').click();
    }

    // Tecla de seta para navegar quiz
    if (e.key === 'ArrowLeft') {
        smoothScroll('tema');
    }
    if (e.key === 'ArrowRight') {
        smoothScroll('interativo');
    }
});

console.log('✅ Agrinho 2026 carregado com sucesso!');
