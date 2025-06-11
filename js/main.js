document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // --- Mobil Menü İşlevselliği ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Olayın yayılmasını durdur
            toggleMenu();
        });

        // Menü dışına tıklayınca kapat
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    function toggleMenu() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Hamburger ikonunu da değiştirmek için (örn: X ikonu)
        body.classList.toggle('no-scroll'); // Arka plan kaymasını engelle
    }
    
    // Menüdeki bir linke tıklayınca menüyü kapat
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Ekran boyutu değiştiğinde menüyü resetle
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // --- Akordeon İşlevselliği ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const activeItem = document.querySelector('.accordion-item.active');
                const clickedItem = header.parentElement;

                // Eğer tıklanan zaten açıksa, kapat
                if (activeItem && activeItem === clickedItem) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.accordion-content').style.maxHeight = null;
                } else {
                    // Değilse, önce açık olanı kapat
                    if (activeItem) {
                        activeItem.classList.remove('active');
                        activeItem.querySelector('.accordion-content').style.maxHeight = null;
                    }
                    // Sonra yenisini aç
                    clickedItem.classList.add('active');
                    const content = clickedItem.querySelector('.accordion-content');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }

    // --- Fiyat Tablosu (Eski Kod - Artık Kullanılmıyor, Güvenlik için kaldırıldı) ---
    // Yeni kart yapısı bu koda ihtiyaç duymaz.

}); 