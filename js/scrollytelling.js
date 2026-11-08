/* Progressive scroll-driven industrial presentation; lightweight, accessible fallback. */
(()=>{'use strict';const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero=document.querySelector('.hero-section');if(!hero||reduced)return;
const canvasWrap=hero.querySelector('.canvas-3d-wrapper');const targets=[...document.querySelectorAll('.service-card,.portfolio-card,.rmf-partner-card,.section-title,.section-subtitle')];
const io=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('rmf-in-view');io.unobserve(e.target)}}},{threshold:.09,rootMargin:'0px 0px -25px 0px'});
for(const el of targets){el.classList.add('rmf-scroll-reveal');io.observe(el)}
let queued=false;function scrollFrame(){queued=false;const box=hero.getBoundingClientRect();const range=Math.max(1,hero.offsetHeight+innerHeight);const t=Math.max(0,Math.min(1,(innerHeight-box.top)/range));hero.style.setProperty('--rmf-scroll',t.toFixed(4));if(canvasWrap)canvasWrap.style.setProperty('--rmf-depth',((t-.3)*26).toFixed(2)+'px')}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scrollFrame)}},{passive:true});addEventListener('resize',scrollFrame,{passive:true});scrollFrame();
})();
