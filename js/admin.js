(function() {
    const defaultHero = {
        title: 'Tanorea ile Aynadaki Sen, Daha Güçlü.',
        text: 'İstanbul Çekmeköy\'de, sağlığınızı ve doğallığınızı önceliklendiren uzman dokunuşlarla güzelliğinizi yeniden keşfedin.',
        image: 'images/tanorea-clinic-cekmekoy-guzellik-merkezi.jpg'
    };
    const defaultAbout = {
        subtitle: 'Biz Kimiz?',
        title: 'Tanorea Clinic Güzellik Merkezi',
        text1: 'Tanorea, 2025 yılında İstanbul Çekmeköy\'de kurulmuş; medikal estetik, cilt ve saç tedavileri, kalıcı makyaj, medikal manikür & pedikür, iğneli epilasyon ve estetik cerrahi danışmanlığı gibi alanlarda hizmet veren, uzman kadrosuyla fark yaratan bir medikal güzellik merkezidir.',
        text2: 'Doğallığı ve sağlığı ön planda tutarak danışanlarımıza bilimsel temelli, etkili ve güvenilir çözümler sunuyoruz. Cilt ve saç sağlığınıza yönelik kişiselleştirilmiş bakım protokollerimizle, ihtiyaçlarınıza özel uygulamalar gerçekleştiriyoruz.',
        text3: 'Amacımız; güzelliğinize profesyonel dokunuşlarla değer katmak, doğal ve sağlıklı bir görünümü sürdürülebilir kılmaktır. Güzellik burada başlar.',
        image: 'images/tanorea-clinic-uzman-kadro-cekmekoy.jpg'
    };
    const defaultPosts = [
        {title: 'Cilt Bakımı İpuçları', text: 'Sağlıklı ve parlak bir cilt için evde uygulayabileceğiniz profesyonel ipuçları...', image: 'images/blog-cilt-bakimi-ipuclari.jpg'},
        {title: 'Medikal Estetikte Yenilikler', text: 'Ameliyatsız gençleşme ve en yeni teknolojilerle tanışın. Sizin için en uygun tedavi hangisi?', image: 'images/blog-medikal-estetik-yenilikler.jpg'},
        {title: 'Kalıcı Makyajda Son Trendler', text: 'Dudak renklendirme, microblading ve daha fazlası... 2025\'in öne çıkan kalıcı makyaj trendleri.', image: 'images/blog-kalici-makyaj-trendleri.jpg'}
    ];

    const heroData = JSON.parse(localStorage.getItem('heroData')) || defaultHero;
    const aboutData = JSON.parse(localStorage.getItem('aboutData')) || defaultAbout;
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || defaultPosts;

    const heroForm = document.getElementById('heroForm');
    const aboutForm = document.getElementById('aboutForm');
    const postsContainer = document.getElementById('postsContainer');
    const addPostBtn = document.getElementById('addPost');
    const saveBtn = document.getElementById('saveAll');
    const dropzones = document.querySelectorAll('.dropzone');

    function readFile(file, cb) {
        const reader = new FileReader();
        reader.onload = () => cb(reader.result);
        reader.readAsDataURL(file);
    }

    function setupDropzone(zone) {
        const input = zone.querySelector('input[type="file"]');
        zone.addEventListener('click', () => input.click());
        zone.addEventListener('dragover', e => {
            e.preventDefault();
            zone.classList.add('drag');
        });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
        zone.addEventListener('drop', e => {
            e.preventDefault();
            zone.classList.remove('drag');
            const file = e.dataTransfer.files[0];
            if (file) {
                readFile(file, data => {
                    zone.dataset.image = data;
                });
            }
        });
        input.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                readFile(file, data => {
                    zone.dataset.image = data;
                });
            }
        });
    }

    dropzones.forEach(setupDropzone);

    function fillForms() {
        heroForm.title.value = heroData.title;
        heroForm.text.value = heroData.text;
        heroForm.image.value = heroData.image;
        const heroZone = heroForm.querySelector('.dropzone');
        if (heroZone) heroZone.dataset.image = heroData.image;

        aboutForm.subtitle.value = aboutData.subtitle;
        aboutForm.title.value = aboutData.title;
        aboutForm.text1.value = aboutData.text1;
        aboutForm.text2.value = aboutData.text2;
        aboutForm.text3.value = aboutData.text3;
        aboutForm.image.value = aboutData.image;
        const aboutZone = aboutForm.querySelector('.dropzone');
        if (aboutZone) aboutZone.dataset.image = aboutData.image;

        renderPosts();
    }

    function renderPosts() {
        postsContainer.innerHTML = '';
        blogPosts.forEach((post, idx) => {
            const div = document.createElement('div');
            div.className = 'post-item';
            div.innerHTML = `
                <label>Başlık <input type="text" class="post-title" data-idx="${idx}" value="${post.title}"></label>
                <label>Görsel URL <input type="text" class="post-image" data-idx="${idx}" value="${post.image}"></label>
                <div class="dropzone" data-idx="${idx}" data-image="${post.image}">Görseli buraya sürükleyin veya tıklayın
                    <input type="file" accept="image/*" class="d-none post-file" data-idx="${idx}">
                </div>
                <label>Metin <textarea class="post-text" data-idx="${idx}">${post.text}</textarea></label>
                <button type="button" class="remove" data-idx="${idx}">Sil</button>
            `;
            postsContainer.appendChild(div);
        });
    }

    addPostBtn.addEventListener('click', function() {
        blogPosts.push({title: '', text: '', image: ''});
        renderPosts();
    });

    postsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove')) {
            const i = parseInt(e.target.dataset.idx);
            blogPosts.splice(i, 1);
            renderPosts();
        }
    });

    postsContainer.addEventListener('input', function(e) {
        const idx = parseInt(e.target.dataset.idx);
        if (e.target.classList.contains('post-title')) blogPosts[idx].title = e.target.value;
        if (e.target.classList.contains('post-image')) blogPosts[idx].image = e.target.value;
        if (e.target.classList.contains('post-text')) blogPosts[idx].text = e.target.value;
    });

    postsContainer.addEventListener('change', function(e) {
        const idx = parseInt(e.target.dataset.idx);
        if (e.target.classList.contains('post-file')) {
            const file = e.target.files[0];
            if (file) {
                readFile(file, data => {
                    blogPosts[idx].image = data;
                });
            }
        }
    });

    postsContainer.addEventListener('drop', function(e) {
        if (e.target.classList.contains('dropzone')) {
            const idx = parseInt(e.target.dataset.idx);
            const file = e.dataTransfer.files[0];
            if (file) {
                readFile(file, data => {
                    blogPosts[idx].image = data;
                    e.target.dataset.image = data;
                });
            }
        }
    });

    saveBtn.addEventListener('click', function() {
        const newHero = {
            title: heroForm.title.value,
            text: heroForm.text.value,
            image: heroForm.image.value
        };
        const heroZone = heroForm.querySelector('.dropzone');
        if (heroZone && heroZone.dataset.image) newHero.image = heroZone.dataset.image;
        const newAbout = {
            subtitle: aboutForm.subtitle.value,
            title: aboutForm.title.value,
            text1: aboutForm.text1.value,
            text2: aboutForm.text2.value,
            text3: aboutForm.text3.value,
            image: aboutForm.image.value
        };
        const aboutZone = aboutForm.querySelector('.dropzone');
        if (aboutZone && aboutZone.dataset.image) newAbout.image = aboutZone.dataset.image;
        postsContainer.querySelectorAll('.dropzone').forEach(zone => {
            const i = parseInt(zone.dataset.idx);
            if (!isNaN(i) && zone.dataset.image) {
                blogPosts[i].image = zone.dataset.image;
            }
        });

        localStorage.setItem('heroData', JSON.stringify(newHero));
        localStorage.setItem('aboutData', JSON.stringify(newAbout));
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        alert('Kaydedildi');
    });

    fillForms();
})();
