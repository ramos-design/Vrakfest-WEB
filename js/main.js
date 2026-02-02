document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. COUNTDOWN TIMER ---
    // Set date 14 days from now for demo purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14); 
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            document.getElementById('countdown').innerText = `${days} DNÍ ${hours} HOD`;
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 2. STICKY HEADER ---
    const header = document.querySelector('.tech-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(17, 17, 17, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(17, 17, 17, 0.8)';
        }
    });

    // --- 3. ACCORDION (RULES) ---
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const item = acc.parentElement;
            
            // Close others (optional, maybe user wants multi-open)
            // document.querySelectorAll('.accordion-item').forEach(i => {
            //     if(i !== item) i.classList.remove('active');
            // });

            item.classList.toggle('active');
        });
    });

    // --- 4. DRIVER MODAL ---
    window.openDriverModal = function(id) {
        const modal = document.getElementById('driverModal');
        const nameEl = document.getElementById('modalName');
        
        // Mock data logic
        const names = {
            1: "JAN NOVÁK",
            2: "PETR SVOBODA",
            3: "MARTIN KOS",
            4: "TOMÁŠ ČERNÝ",
            5: "PETER OREL"
        };
        
        nameEl.innerText = names[id] || "JEZDEC " + id;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('driverModal').classList.remove('open');
        document.body.style.overflow = 'auto';
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('driverModal');
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });

    // --- 5. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 6. FORM STEPS (Simple UI toggle) ---
    const nextBtn = document.querySelector('.form-actions button');
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Just for specific visual feedback in this demo
            const btnSpan = nextBtn.querySelector('span');
            btnSpan.innerText = "ZPRACOVÁNÍ...";
            setTimeout(() => {
                alert("Toto je pouze demo ukázka formuláře.");
                btnSpan.innerText = "DALŠÍ KROK >";
            }, 500);
        });
    }

});
