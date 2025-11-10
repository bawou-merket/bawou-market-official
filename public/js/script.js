// Bawou Market — minimal JS
document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if (toggle) {
  toggle.addEventListener('click', ()=>{
    menu.classList.toggle('show');
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id && id.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({behavior:'smooth'});
      menu.classList.remove('show');
    }
  });
});
