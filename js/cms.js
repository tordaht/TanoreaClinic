// Apply saved content to index and blog pages
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const heroData = JSON.parse(localStorage.getItem('heroData'));
        if (heroData) {
            const h1 = document.querySelector('#home h1');
            const p = document.querySelector('#home h2');
            const section = document.querySelector('#home');
            if (h1) h1.textContent = heroData.title;
            if (p) p.textContent = heroData.text;
            if (section) section.style.backgroundImage = `url('${heroData.image}')`;
        }

        const aboutData = JSON.parse(localStorage.getItem('aboutData'));
        if (aboutData) {
            const img = document.querySelector('#about img');
            const title = document.querySelector('#about h2');
            const pEls = document.querySelectorAll('#about p');
            if (img) img.src = aboutData.image;
            if (title) title.textContent = aboutData.title;
            if (pEls[0]) pEls[0].textContent = aboutData.text1 || aboutData.text;
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
