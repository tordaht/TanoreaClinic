// Apply saved content to index and blog pages
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const heroData = JSON.parse(localStorage.getItem('heroData'));
        if (heroData) {
            const h1 = document.querySelector('.hero-content h1');
            const p = document.querySelector('.hero-content p');
            const img = document.querySelector('.hero-image img');
            if (h1) h1.textContent = heroData.title;
            if (p) p.textContent = heroData.text;
            if (img) img.src = heroData.image;

        }

        const aboutData = JSON.parse(localStorage.getItem('aboutData'));
        if (aboutData) {
            const img = document.querySelector('#hakkimizda .image-content img');
            const subtitle = document.querySelector('#hakkimizda .text-content .subtitle');
            const title = document.querySelector('#hakkimizda .text-content h2');
            const ps = document.querySelectorAll('#hakkimizda .text-content p');
            if (img) img.src = aboutData.image;
            if (subtitle) subtitle.textContent = aboutData.subtitle;
            if (title) title.textContent = aboutData.title;
            ps.forEach((el, idx) => {
                if (aboutData['text' + (idx + 1)]) el.textContent = aboutData['text' + (idx + 1)];
            });

        }

        const posts = JSON.parse(localStorage.getItem('blogPosts'));
        const grid = document.querySelector('.blog-grid');
        if (posts && grid) {
            grid.innerHTML = '';
            posts.forEach(post => {
                const div = document.createElement('div');
                div.className = 'blog-post';
                div.innerHTML = `<img src="${post.image}" alt="${post.title}"><h4>${post.title}</h4><p>${post.text}</p>`;
                grid.appendChild(div);
            });
        }
    });
})();
