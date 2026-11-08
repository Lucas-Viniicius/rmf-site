/* RMF | Real 3D gears, PBR materials, responsive lighting and scroll-driven camera. */
(async()=>{
'use strict';
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
let THREE;
try{THREE=await import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js')}catch(e){console.warn('RMF: WebGL 3D indisponível; mantendo animação Canvas.',e);return}
if(!document.createElement('canvas').getContext('webgl2')&&!document.createElement('canvas').getContext('webgl'))return;
const orange=0xff6900;
function createGear(radius,teeth,depth,material){
  const shape=new THREE.Shape(),outer=radius,inner=radius*.81;
  const steps=teeth*4;
  for(let i=0;i<=steps;i++){
    const a=(i/steps)*Math.PI*2,phase=i%4,r=phase===1||phase===2?outer:inner;
    const x=Math.cos(a)*r,y=Math.sin(a)*r;
    if(i===0)shape.moveTo(x,y);else shape.lineTo(x,y);
  }
  const hole=new THREE.Path();hole.absarc(0,0,radius*.28,0,Math.PI*2,true);shape.holes.push(hole);
  const geometry=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:radius*.022,bevelThickness:radius*.026,curveSegments:24});
  geometry.center();const group=new THREE.Group();const ring=new THREE.Mesh(geometry,material);group.add(ring);
  const hub=new THREE.Mesh(new THREE.TorusGeometry(radius*.28,radius*.055,12,48),new THREE.MeshStandardMaterial({color:0xe6a04e,metalness:.9,roughness:.24}));hub.position.z=depth*.55;group.add(hub);
  const spokeMaterial=new THREE.MeshStandardMaterial({color:0x727d8a,metalness:.9,roughness:.28});
  for(let j=0;j<6;j++){
    const spoke=new THREE.Mesh(new THREE.BoxGeometry(radius*.12,radius*.55,depth*.7),spokeMaterial);
    spoke.position.set(Math.sin(j*Math.PI/3)*radius*.53,Math.cos(j*Math.PI/3)*radius*.53,0);
    spoke.rotation.z=-j*Math.PI/3;group.add(spoke);
  }
  const axle=new THREE.Mesh(new THREE.CylinderGeometry(radius*.13,radius*.13,depth*1.6,32),spokeMaterial);axle.rotation.x=Math.PI/2;group.add(axle);
  return group;
}
function buildScene(canvas,kind){
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.65));renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);
 camera.position.set(0,0,kind==='intro'?15:13);
 const metal=new THREE.MeshStandardMaterial({color:0x8995a3,metalness:.92,roughness:.27,side:THREE.DoubleSide});
 const group=new THREE.Group();scene.add(group);
 const main=createGear(2.4,16,.48,metal),right=createGear(1.25,12,.4,metal),left=createGear(1.04,11,.35,metal);
 main.position.set(0,0,0);right.position.set(3.52,.35,-.8);left.position.set(-3.12,-1.3,-1.2);
 group.add(main,right,left);
 scene.add(new THREE.AmbientLight(0x94a4bc,1.3));
 const key=new THREE.PointLight(orange,90,25);key.position.set(2,3,5);scene.add(key);
 const white=new THREE.PointLight(0xffffff,70,25);white.position.set(-5,-2,6);scene.add(white);
 const rim=new THREE.PointLight(0xff8a00,70,20);rim.position.set(1,-4,-2);scene.add(rim);
 const orbit=new THREE.Mesh(new THREE.TorusGeometry(4.7,.012,6,160),new THREE.MeshBasicMaterial({color:orange,transparent:true,opacity:.45}));orbit.rotation.x=.28;group.add(orbit);
 const grid=new THREE.GridHelper(24,22,0xff6900,0x333d48);grid.rotation.x=Math.PI/2;grid.position.z=-4;grid.material.transparent=true;grid.material.opacity=.16;scene.add(grid);
 let active=true,scroll=0,px=0,py=0,drag=false,lastX=0,lastY=0,dragAngle=0;
 const onMove=e=>{const b=canvas.getBoundingClientRect();px=((e.clientX-b.left)/Math.max(1,b.width)-.5)*2;py=((e.clientY-b.top)/Math.max(1,b.height)-.5)*2;if(drag){dragAngle+=(e.clientX-lastX)*.006;lastX=e.clientX}};
 const onDown=e=>{drag=true;lastX=e.clientX;canvas.setPointerCapture?.(e.pointerId)};
 const onUp=()=>{drag=false};
 canvas.addEventListener('pointermove',onMove,{passive:true});canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointerup',onUp);canvas.addEventListener('pointercancel',onUp);
 function resize(){const rect=canvas.getBoundingClientRect();if(rect.width<1||rect.height<1)return;renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.fov=rect.width<650?48:34;camera.updateProjectionMatrix();group.scale.setScalar(rect.width<650?.67:1)}
 const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
 const clock=new THREE.Clock();let raf=0;
 function draw(){if(!active)return;raf=requestAnimationFrame(draw);if(document.hidden)return;
 const t=clock.getElapsedTime();main.rotation.z=t*.19+dragAngle;right.rotation.z=-t*.36-dragAngle*1.9;left.rotation.z=-t*.42-dragAngle*2.3;
 group.rotation.y+=(px*.16-group.rotation.y)*.04;group.rotation.x+=(-py*.12+scroll*.32-group.rotation.x)*.04;
 group.position.y+=(scroll*.55-group.position.y)*.035;
 camera.position.z+=( (kind==='intro'?15:13)+scroll*2-camera.position.z)*.025;
 orbit.rotation.z=t*.045;key.position.x=2+Math.sin(t*.7)*1.4;
 renderer.render(scene,camera);
 }
 draw();
 return {setScroll:v=>scroll=v,dispose(){active=false;cancelAnimationFrame(raf);observer.disconnect();canvas.removeEventListener('pointermove',onMove);canvas.removeEventListener('pointerdown',onDown);canvas.removeEventListener('pointerup',onUp);canvas.removeEventListener('pointercancel',onUp);scene.traverse(o=>{o.geometry?.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose())}});renderer.dispose()}};
}
let introScene=null,heroScene=null;
try{
 const intro=document.getElementById('introScreen');
 if(intro&&getComputedStyle(intro).display!=='none'){
   const canvas=document.createElement('canvas');canvas.id='rmfWebGLIntro';canvas.className='rmf-webgl-scene';canvas.setAttribute('aria-hidden','true');intro.insertBefore(canvas,intro.firstChild);
   introScene=buildScene(canvas,'intro');window.__rmfThreeIntroReady=true;
   new MutationObserver(()=>{if(!intro.isConnected){introScene?.dispose();introScene=null}}).observe(document.body,{childList:true});
 }
 const heroCanvas=document.getElementById('rmfLogo3DCanvas');
 if(heroCanvas){const newCanvas=document.createElement('canvas');newCanvas.id='rmfHeroWebGL';newCanvas.className='rmf-webgl-hero';newCanvas.setAttribute('aria-label','Engrenagens tridimensionais interativas da RMF');heroCanvas.insertAdjacentElement('afterend',newCanvas);heroScene=buildScene(newCanvas,'hero');heroCanvas.style.display='none';}
 let ticking=false;const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{ticking=false;const hero=document.querySelector('.hero-section');if(!hero)return;const r=hero.getBoundingClientRect(),progress=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height)));heroScene?.setScroll(progress);introScene?.setScroll(progress*.2)})};addEventListener('scroll',onScroll,{passive:true});onScroll();
}catch(e){console.error('RMF: falha na cena 3D',e);introScene?.dispose();heroScene?.dispose();document.getElementById('rmfWebGLIntro')?.remove();document.getElementById('rmfHeroWebGL')?.remove();document.getElementById('rmfLogo3DCanvas')?.style.removeProperty('display')}
})();
