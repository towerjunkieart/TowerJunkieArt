document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector("#about");
    const aboutBg = document.querySelector(".about-bg");


    if (aboutSection && aboutBg) {
        let lastScrollY = window.scrollY;
        let isCentered = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const currentScrollY = window.scrollY;

                
                if (entry.isIntersecting && currentScrollY > lastScrollY) {
                    aboutBg.classList.add("center");
                    isCentered = true;
                }

                
                if (!entry.isIntersecting && currentScrollY < lastScrollY && isCentered) {
                    aboutBg.classList.remove("center");
                    isCentered = false;
                }

                lastScrollY = currentScrollY;
            },
            {
                threshold: 0.5
            }
        );

        observer.observe(aboutSection);
    }

  
    const portfolioHeading = document.querySelector('.portfolio-heading');
    const portfolioBg = portfolioHeading ? portfolioHeading.querySelector('.about-bg') : null;
    if (portfolioHeading && portfolioBg) {
        let lastScrollY_port = window.scrollY;
        let isCentered_port = false;
        const portObserver = new IntersectionObserver(([entry]) => {
            const currentScrollY = window.scrollY;
            if (entry.isIntersecting && currentScrollY > lastScrollY_port) {
                portfolioBg.classList.add('center');
                isCentered_port = true;
            }
            if (!entry.isIntersecting && currentScrollY < lastScrollY_port && isCentered_port) {
                portfolioBg.classList.remove('center');
                isCentered_port = false;
            }
            lastScrollY_port = currentScrollY;
        }, { threshold: 0.5 });
        portObserver.observe(portfolioHeading);
    }

   
    const servicesSection = document.querySelector('.services');
    const servicesBg = servicesSection ? servicesSection.querySelector('.about-bg') : null;
    if (servicesSection && servicesBg) {
        let lastScrollY_services = window.scrollY;
        let isCentered_services = false;
        const servicesObserver = new IntersectionObserver(([entry]) => {
            const currentScrollY = window.scrollY;
            if (entry.isIntersecting && currentScrollY > lastScrollY_services) {
                servicesBg.classList.add('center');
                isCentered_services = true;
            }
            if (!entry.isIntersecting && currentScrollY < lastScrollY_services && isCentered_services) {
                servicesBg.classList.remove('center');
                isCentered_services = false;
            }
            lastScrollY_services = currentScrollY;
        }, { threshold: 0.5 });
        servicesObserver.observe(servicesSection);
    }


    
    const hero = document.querySelector('.hero');

    let ticking = false;

    function updateCover() {
        if (!hero) return; 
        const heroRect = hero.getBoundingClientRect();
        const scrolled = Math.min(Math.max(-heroRect.top, 0), heroRect.height);
        const progress = heroRect.height ? scrolled / heroRect.height : 0;
        if (aboutSection) aboutSection.style.setProperty('--cover-progress', String(progress));
    }

    if (hero) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateCover();
                    ticking = false;
                });
                ticking = true;
            }
        });

        window.addEventListener('resize', updateCover);


        updateCover();
    }

    function debugCenterOverlay() {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const elems = Array.from(document.querySelectorAll('body *'));
        let found = false;
        elems.forEach(el => {
            const st = window.getComputedStyle(el);
            if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) return;
            if (st.position === 'fixed' || st.position === 'absolute' || st.position === 'sticky') {
                const r = el.getBoundingClientRect();
                if (r.width > 12 && r.height > 12 && r.left <= cx && r.right >= cx && r.top <= cy && r.bottom >= cy) {
                    found = true;
        
                    el.style.outline = '3px solid rgba(255,0,0,0.95)';
                    el.style.zIndex = '999999';
                    console.log('CENTER OVERLAY FOUND:', el, r, st);
                }
            }
        });
        if (!found) console.log('No fixed/absolute element covering center detected.');
    }

    
    setTimeout(debugCenterOverlay, 300);
    setTimeout(debugCenterOverlay, 1500);


const contactSection = document.querySelector('.contact');
const contactBg = contactSection ? contactSection.querySelector('.about-bg') : null;

if (contactSection && contactBg) {
    let lastScrollY_contact = window.scrollY;
    let isCentered_contact = false;

    const contactObserver = new IntersectionObserver(
        ([entry]) => {
            const currentScrollY = window.scrollY;

            if (entry.isIntersecting && currentScrollY > lastScrollY_contact) {
                contactBg.classList.add('center');
                isCentered_contact = true;
            }

            if (!entry.isIntersecting && currentScrollY < lastScrollY_contact && isCentered_contact) {
                contactBg.classList.remove('center');
                isCentered_contact = false;
            }

            lastScrollY_contact = currentScrollY;
        },
        { threshold: 0.5 }
    );

    contactObserver.observe(contactSection);
}

const termsSection = document.querySelector('#terms');
const termsBg = termsSection ? termsSection.querySelector('.about-bg') : null;

if (termsSection && termsBg) {
    let lastScrollY_terms = window.scrollY;
    let isCentered_terms = false;

    const termsObserver = new IntersectionObserver(([entry]) => {
        const currentScrollY = window.scrollY;

        if (entry.isIntersecting && currentScrollY > lastScrollY_terms) {
            termsBg.classList.add('center');
            isCentered_terms = true;
        }

        if (!entry.isIntersecting && currentScrollY < lastScrollY_terms && isCentered_terms) {
            termsBg.classList.remove('center');
            isCentered_terms = false;
        }

        lastScrollY_terms = currentScrollY;
    }, { threshold: 0.5 });

    termsObserver.observe(termsSection);
}



    /* ===== PORTFOLIO FILTERS & LIGHTBOX ===== */
    (function setupGallery(){
        const gallery = document.getElementById('gallery');
        if (!gallery) return;

        const filters = Array.from(document.querySelectorAll('.filter'));
        const items = Array.from(gallery.querySelectorAll('.gallery-item'));
        const noItems = document.createElement('div');
        noItems.className = 'no-items';
        noItems.textContent = 'No items in this category.';

        function applyFilter(name){
            let visible = 0;
            items.forEach(it => {
                const cat = it.getAttribute('data-category');
                if (cat === name) {
                    it.style.display = '';
                    visible++;
                } else {
                    it.style.display = 'none';
                }
            });
            if (visible === 0) {
                if (!gallery.contains(noItems)) gallery.appendChild(noItems);
            } else {
                if (gallery.contains(noItems)) gallery.removeChild(noItems);
            }
        
            items.forEach(it => it.classList.remove('in-view'));
        }

        
        applyFilter('Environment Concept Art');

        filters.forEach(btn => btn.addEventListener('click', () => {
            filters.forEach(f=>f.classList.remove('active'));
            btn.classList.add('active');
            const name = btn.getAttribute('data-filter');
            applyFilter(name);
        }));

        // Lightbox
        const lightbox = document.getElementById('lightbox');
        const lbImage = lightbox ? lightbox.querySelector('.lb-image') : null;
        const lbClose = lightbox ? lightbox.querySelector('.lb-close') : null;
        const lbNext = lightbox ? lightbox.querySelector('.lb-next') : null;
        const lbPrev = lightbox ? lightbox.querySelector('.lb-prev') : null;

        let currentIndex = -1;
        let currentList = items; 

        function openLightbox(idx){
            const link = currentList[idx].querySelector('.thumb');
            if (!link) return;
            lbImage.src = link.href;
            lbImage.alt = link.querySelector('img')?.alt || '';
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            currentIndex = idx;
        }
        function closeLightbox(){
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
            lbImage.src = '';
            currentIndex = -1;
        }
        function prev(){ if (currentIndex > 0) openLightbox(currentIndex-1); }
        function next(){ if (currentIndex < currentList.length-1) openLightbox(currentIndex+1); }

        items.forEach((it, i) => {
            const link = it.querySelector('.thumb');
            if (!link) return;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const visibleItems = Array.from(gallery.querySelectorAll('.gallery-item')).filter(el => el.style.display !== 'none');
                const idx = visibleItems.indexOf(it);
                currentList = visibleItems;
                openLightbox(idx);
            });
        });

        if (lbClose) lbClose.addEventListener('click', closeLightbox);
        if (lbNext) lbNext.addEventListener('click', next);
        if (lbPrev) lbPrev.addEventListener('click', prev);

        document.addEventListener('keydown', (e) => {
            if (lightbox && lightbox.classList.contains('open')){
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') prev();
            }
        });

        
        if (lightbox) lightbox.addEventListener('click', (e)=>{
            if (e.target === lightbox) closeLightbox();
        });

    })();

});
window.addEventListener("load", () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: "auto" });
            }, 50);
        }
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const headings = document.querySelectorAll(".about-heading");

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-heading");
                    obs.unobserve(entry.target); 
                }
            });
        },
        { threshold: 0.3 }
    );

    headings.forEach(h => observer.observe(h));
});

// LOADER
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500); 
    }
});


const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('active');
});



const mobileLinks = document.querySelectorAll('.mobile-menu a');

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {

    mobileMenu.classList.remove('active');
    hamburger.classList.remove('open');
  });
});

document.addEventListener('contextmenu', e => e.preventDefault());


document.addEventListener('DOMContentLoaded', () => {
    const btt = document.getElementById("backToTop");

    if (btt) {
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                btt.classList.add("show");
            } else {
                btt.classList.remove("show");
            }
        });

       
        btt.addEventListener("click", (e) => {
            e.preventDefault(); 
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    } else {
        console.error("Dugme backToTop nije pronađeno u HTML-u!");
    }
});
