// ============================================
// KONFIGURASI GALERI - DAFTAR GAMBAR BY VINZXS
// ============================================

const galleryImages = [
    'img2.png',
    'img3.png',
    'img4.png',
    'img5.png',
    'img1.png',
    'img.png'
    // Tambahkan lebih banyak gambar di sini
    // Format: 'namafile.ekstensi'
];

// ============================================
// FUNGSI LOAD GALERI
// ============================================
function loadGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    
    // Kosongkan container terlebih dahulu
    galleryContainer.innerHTML = '';
    
    // Loop untuk setiap gambar
    galleryImages.forEach((imageName, index) => {
        const galleryCard = document.createElement('div');
        galleryCard.className = 'gallery-card';
        galleryCard.onclick = function() { openImageModal(this); };
        
        const img = document.createElement('img');
        img.src = `foto/${imageName}`;
        img.alt = `Gallery Image ${index + 1}`;
        img.className = 'gallery-content';
        
        // Error handling jika gambar tidak ditemukan
        img.onerror = function() {
            this.style.display = 'none';
            const errorDiv = document.createElement('div');
            errorDiv.className = 'gallery-content';
            errorDiv.style.display = 'flex';
            errorDiv.style.alignItems = 'center';
            errorDiv.style.justifyContent = 'center';
            errorDiv.style.fontSize = '14px';
            errorDiv.style.color = 'var(--neon-red)';
            errorDiv.innerHTML = '🖼️<br>Image not found';
            galleryCard.appendChild(errorDiv);
        };
        
        galleryCard.appendChild(img);
        galleryContainer.appendChild(galleryCard);
    });
    
    // Tambahkan observer untuk animasi
    const galleryCards = document.querySelectorAll('#galleryContainer .gallery-card');
    galleryCards.forEach(card => {
        observer.observe(card);
    });
}

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        const colors = ['var(--neon-red)', 'var(--blood-red)', 'var(--dark-red)', 'var(--crimson)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        particlesContainer.appendChild(particle);
    }
}

// Navigation
function showSection(sectionId) {
    // Loading animation
    const loadingBar = document.getElementById('loadingBar');
    loadingBar.classList.add('active');

    setTimeout(() => {
        loadingBar.classList.remove('active');
    }, 500);

    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active from buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Image Modal Functions
function openImageModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Get the image from the clicked card
    const img = element.querySelector('img');
    if (img) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        
        // Reset image style untuk ukuran asli
        modalImage.style.width = 'auto';
        modalImage.style.height = 'auto';
        modalImage.style.maxWidth = '90vw';
        modalImage.style.maxHeight = '90vh';
        modalImage.style.objectFit = 'contain';
    }
    
    // Show modal with animation
    modal.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Intersection Observer for member cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 30);
        }
    });
}, observerOptions);

// Observe member cards
document.querySelectorAll('.member-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.9)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// Mouse parallax effect for orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        orb.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// Initialize
window.addEventListener('load', () => {
    createParticles();
    loadGallery(); // Load gallery images
    
    // Trigger animations on load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .stat-item');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});