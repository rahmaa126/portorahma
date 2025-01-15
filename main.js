/*====================
1. INISIALISASI VARIABEL
====================*/
// Variabel untuk Navigasi
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

// Variabel untuk Animasi Mengetik
const texts = ['Akuntan'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

/*====================
2. FUNGSI NAVIGASI
====================*/
// Fungsi Efek Scroll Header
function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Fungsi Toggle Menu Mobile
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
}

// Fungsi Menutup Menu Mobile
function closeMenuOutsideClick(e) {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
    }
}

// Fungsi Mengatur Tautan Aktif
function handleNavLinkClick() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    navToggle.classList.remove('active');
    nav.classList.remove('active');
}

/*====================
3. FUNGSI SCROLL
====================*/
// Fungsi Scroll Halus
function smoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/*====================
4. FUNGSI ANIMASI
====================*/
// Fungsi Animasi Mengetik
function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    document.querySelector('.typing-text span').textContent = letter;
    
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

/*====================
5. OBSERVER SECTIONS
====================*/
// Pengaturan Observer
const observerOptions = {
    rootMargin: '-20% 0px -70% 0px'
};

// Fungsi Callback Observer
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
};

// Inisialisasi Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);
const sections = document.querySelectorAll('section[id]');
sections.forEach(section => observer.observe(section));

/*====================
6. EVENT LISTENERS
====================*/
// Event Listeners untuk Scroll
window.addEventListener('scroll', handleScroll);

// Event Listeners untuk Navigasi
navToggle.addEventListener('click', toggleMobileMenu);
document.addEventListener('click', closeMenuOutsideClick);
navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));

// Event Listeners untuk Scroll Halus
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});

// Event Listener untuk Animasi Mengetik
window.addEventListener('load', () => {
    setTimeout(type, 1500);
});

/*====================
7. FORM HANDLING
====================*/
// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        try {
            submitBtn.innerHTML = 'Mengirim... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Here you would typically send the form data to your backend
            // For now, we'll just simulate a success response
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            alert('Pesan berhasil terkirim! Terima kasih telah menghubungi saya.');
            contactForm.reset();
        } catch (error) {
            alert('Maaf, terjadi kesalahan. Silakan coba lagi nanti.');
        } finally {
            submitBtn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }
    });
}

/*====================
8. PROJECT FILTERING
====================*/
// Project Filtering (if needed in the future)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const tags = project.querySelector('.project-tags').textContent.toLowerCase();
        const shouldShow = category === 'all' || tags.includes(category.toLowerCase());
        project.style.display = shouldShow ? 'block' : 'none';
    });
}
