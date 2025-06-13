document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior: 'smooth'});
            }
        });
    });

    // Navbar shrink and active state on scroll
    const onScroll = () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const id = section.getAttribute('id');
            if (rect.top <= 100 && rect.bottom >= 100) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`a[href="#${id}"]`);
                if (active) active.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            if (!data.fullName || !data.email || !data.phone || !data.message) {
                alert('Lütfen tüm alanları doldurun.');
                return;
            }
            try {
                const res = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });
                if (res.ok) {
                    contactForm.innerHTML = '<p class="text-success">Teşekkürler, mesajınız alınmıştır.</p>';
                } else {
                    throw new Error();
                }
            } catch {
                contactForm.insertAdjacentHTML('beforeend', '<p class="text-danger mt-2">Bir hata oluştu, lütfen tekrar deneyin.</p>');
            }
        });
    }
});
