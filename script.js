document.addEventListener('DOMContentLoaded', () => {
    
    // ===========================================
    // 1. Scroll Animations (Intersection Observer)
    // ===========================================
    
    // Використовуємо Intersection Observer для плавного появи елементів при прокрутці
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Опціонально: зупинити спостереження після першого появи
                // observer.unobserve(entry.target); 
            } else {
                // Якщо елемент виходить з зони видимості, повертаємо його в прихований стан
                // Це створює "багаторазову" анімацію
                entry.target.classList.remove('show');
            }
        });
    }, {
        // threshold 0.1 означає, що анімація почнеться, коли 10% елемента буде видно
        rootMargin: '0px 0px -10% 0px', // Змінюємо зону видимості
        threshold: 0.01 
    });

    const hiddenElements = document.querySelectorAll('.hidden, .fade-in-left, .fade-in-right');
    hiddenElements.forEach((el) => observer.observe(el));

    // ===========================================
    // 2. Smooth Scroll
    // ===========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ===========================================
    // 3. Form handler (симуляція)
    // ===========================================
    
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'ЗАЯВКА ВІДПРАВЛЕНА! Очікуйте дзвінка';
            btn.style.background = '#00ff88'; 
            btn.style.color = '#000';
            btn.style.clipPath = 'none'; 
            
            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                // Восстановление стилей
                btn.style.background = 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))';
                btn.style.color = '#fff';
                btn.style.clipPath = 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)';
            }, 3000);
        });
    }

    // ===========================================
    // 4. MODAL WINDOW LOGIC
    // ===========================================

    const modalOverlay = document.getElementById('bikeModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const modalTitle = document.getElementById('modalTitle');
    const modalSpecs = document.getElementById('modalSpecs');
    
    const randomDescriptions = [
        "Цей байк оснащено новітньою системою контролю тяги та посиленою алюмінієвою рамою. Ідеальний баланс між вагою та потужністю дозволяє виконувати найскладніші трюки. Швидка зарядка за 2 години до 80%. Вологозахист стандарту IP67.",
        "Ексклюзивна прошивка контролера FOC забезпечує неймовірно плавне прискорення та ефективне рекуперативне гальмування. Повна підвіска Fox/Ohlins (залежно від комплектації) готова до будь-якого рельєфу.",
        "Модель має інтелектуальну систему управління батареєю (BMS), яка подовжує термін служби акумулятора та оптимізує його роботу. Цифровий дисплей відображає всі ключові параметри в реальному часі."
    ];

    const openModal = (bikeCard) => {
        const bikeName = bikeCard.querySelector('.model-name').innerText;
        const bikeSpecsHTML = bikeCard.querySelector('.specs-data').innerHTML;
        const randomDesc = randomDescriptions[Math.floor(Math.random() * randomDescriptions.length)];

        modalTitle.innerText = bikeName;
        modalSpecs.innerHTML = `<div class="specs-data">${bikeSpecsHTML}</div>`;
        document.getElementById('modalDescriptionText').innerText = randomDesc; 

        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentCard = e.target.closest('.model-card');
            openModal(currentCard);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            closeModal();
        }
    });


    // ===========================================
    // 5. FAQ TOGGLE LOGIC (Аккордеон)
    // ===========================================

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            
            // Закриваємо інші відкриті відповіді
            faqQuestions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });

            // Відкриваємо/закриваємо поточну відповідь
            if (answer.style.maxHeight) {
                question.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});