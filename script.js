// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('.section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 200;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== FADE UP ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => fadeObserver.observe(el));

// ===== TYPING ANIMATION =====
const typingEl = document.getElementById('typing-text');
if (typingEl) {
  const words = ['design', 'creativity', 'empathy', 'research'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  function type() {
    const current = words[wordIndex];
    typingEl.textContent = current.substring(0, charIndex);
    if (!isDeleting && charIndex < current.length) {
      charIndex++;
      setTimeout(type, 80);
    } else if (!isDeleting) {
      setTimeout(() => { isDeleting = true; type(); }, 1800);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 40);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 400);
    }
  }
  type();
}

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ===== PROJECT MODAL =====
const modalOverlay = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const projectData = {
  moco: {
    title: 'Moco — Money Control',
    desc: 'Aplikasi manajemen keuangan personal yang membantu mahasiswa melacak dan mengontrol pengeluaran harian mereka.',
    bg: 'thumb-moco',
    logo: 'assets/logo-moco.png',
    problem: 'Mahasiswa sering kesulitan melacak pengeluaran harian dan tidak memiliki kesadaran terhadap pola pengeluaran mereka, menyebabkan keuangan tidak terkelola dengan baik.',
    role: 'Bertanggung jawab penuh atas proses UI/UX Design dari tahap riset, wireframing, prototyping, hingga desain final. Berkolaborasi dengan tim developer untuk memastikan implementasi sesuai desain.',
    tools: ['Figma', 'FigJam', 'Google Forms', 'Flutter'],
    highlights: [
      'Dashboard visual dengan pie chart interaktif untuk kategori pengeluaran',
      'Sistem kode warna untuk memudahkan identifikasi jenis pengeluaran',
      'Alur onboarding yang simpel hanya 3 langkah',
      'Navigasi berbasis gesture untuk input pengeluaran cepat'
    ],
    link: 'https://www.figma.com/design/30ldiMLjhY0QcMzsmPaArQ/MOCO?t=6mAdfsr0xgx0bBkX-0'
  },
  pulmocare: {
    title: 'PulmoCare',
    desc: 'Platform edukasi dan pemantauan mandiri kesehatan paru-paru yang mudah diakses untuk masyarakat umum.',
    bg: 'thumb-pulmo',
    logo: 'assets/logo-pulmocare.png',
    problem: 'Kurangnya kesadaran masyarakat tentang kesehatan paru-paru dan minimnya alat pemantauan mandiri yang mudah diakses serta mudah dipahami oleh non-medis.',
    role: 'UI/UX Designer — melakukan riset pengguna, membuat user persona & peta perjalanan, wireframing, prototyping, dan uji kegunaan untuk memastikan informasi medis tersaji dengan cara yang mudah dipahami.',
    tools: ['Figma', 'FigJam', 'Miro', 'Maze'],
    highlights: [
      'Ilustrasi medis yang ramah dan tidak menakutkan',
      'Pengungkapan bertahap untuk menyajikan informasi medis kompleks secara bertahap',
      'Pendekatan aksesibilitas utama dengan kontras warna yang memenuhi standar WCAG',
      'Palet warna menenangkan (biru & hijau) untuk mengurangi kecemasan kesehatan'
    ],
    link: 'https://www.figma.com/design/rFMJRcW720sMUySgq7PDLz/apk-tbc?node-id=152-71&t=yNnZ8RCAeI2e5BdV-0'
  },
  cloudmart: {
    title: 'CloudMart',
    desc: 'Platform e-commerce berbasis cloud yang dirancang khusus untuk kemudahan UMKM dalam berjualan online.',
    bg: 'thumb-cloud',
    logo: 'assets/logo-cloudmart.png',
    problem: 'UMKM membutuhkan platform jualan online yang mudah digunakan tanpa keahlian teknis, namun tetap memiliki fitur lengkap untuk mengelola produk dan pesanan.',
    role: 'UI/UX Designer — bertanggung jawab atas arsitektur informasi, sistem desain visual, desain interaksi, dan optimasi alur pengguna untuk meningkatkan tingkat konversi.',
    tools: ['Figma', 'Whimsical', 'Hotjar', 'React', 'Tailwind CSS'],
    highlights: [
      'Alur checkout yang dioptimasi dari 5 langkah menjadi hanya 3 langkah',
      'Pencarian cerdas dengan saran otomatis dan fuzzy matching',
      'Grid produk responsif yang adaptif untuk berbagai ukuran thumbnail',
      'Mikro-interaksi pada tombol tambah ke keranjang untuk umpan balik visual yang memuaskan'
    ],
    link: 'https://www.figma.com/design/x0FKUbJKW3Osea3GNFzqtR/Cloudmart?node-id=1-138&t=Z5izlg4ZHJzg8yTD-0'
  },
  epustaka: {
    title: 'E-Pustaka',
    desc: 'Sistem manajemen perpustakaan digital modern yang mempermudah proses pencarian, peminjaman, dan pengelolaan buku.',
    bg: 'thumb-pustaka',
    logo: 'assets/logo-epustaka.png',
    problem: 'Sistem perpustakaan konvensional tidak efisien — pencarian buku dilakukan manual, antrian panjang saat peminjaman, dan pelacakan status buku yang rumit bagi petugas.',
    role: 'UI/UX Designer — mendesain dashboard admin dan antarmuka pengguna, mengoptimasi alur pengguna untuk pencarian dan peminjaman, serta membangun sistem desain visual yang konsisten.',
    tools: ['Figma', 'FigJam', 'React', 'Laravel', 'MySQL'],
    highlights: [
      'Dashboard admin dengan visualisasi data yang jelas dan dapat ditindaklanjuti',
      'Sistem pencarian dengan filter multi-kategori (genre, tahun, ketersediaan)',
      'Pelacak progres membaca untuk memotivasi kebiasaan membaca',
      'Sistem penanda & daftar keinginan dengan organisasi seret dan lepas'
    ],
    link: 'https://www.figma.com/design/jDBdSAR0YFDIwxeAU3PtF6/Untitled?node-id=0-1&p=f&t=kv2Z88qJGpPKerYO-0'
  }
};

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.project;
    const data = projectData[key];
    if (!data) return;
    document.querySelector('.modal-thumb-placeholder').className = `modal-thumb-placeholder ${data.bg}`;
    document.getElementById('modal-logo-img').src = data.logo;
    document.getElementById('modal-logo-img').alt = data.title + ' Logo';
    document.querySelector('.modal-body h2').textContent = data.title;
    document.querySelector('.modal-desc').textContent = data.desc;
    document.getElementById('modal-problem').textContent = data.problem;
    document.getElementById('modal-role').textContent = data.role;
    const toolsContainer = document.getElementById('modal-tools');
    toolsContainer.innerHTML = data.tools.map(t => `<span class="modal-tool">${t}</span>`).join('');
    const highlightsList = document.getElementById('modal-highlights');
    highlightsList.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    const linkEl = document.getElementById('modal-link');
    if (data.link) {
      linkEl.href = data.link;
      linkEl.style.display = 'inline-flex';
    } else {
      linkEl.style.display = 'none';
    }
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    btn.textContent = '✓ Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => {
      btn.textContent = 'Kirim Pesan →';
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });
}
