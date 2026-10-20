'use strict';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const products = [
  { id:'01', name:'Solarette blinds', category:'interior', label:'LAYERED LIGHT / INSIDE LIVING', image:'assets/solarette-blinds.jpg', alt:'Bright coastal living room with pale layered window shades', style:'layered', line:'A softer view. A beautiful balance.', description:'Explore layered textures and a lighter outlook. Start with the atmosphere you want, then confirm fabric and operation with your supplier.', mood:'Light & layered', space:'Living spaces' },
  { id:'02', name:'Wooden blinds', category:'interior', label:'NATURAL WARMTH / INSIDE LIVING', image:'assets/wooden-blinds.png', alt:'Warm wooden slat blinds in a light-filled home office', style:'wooden', line:'Natural character, in every line.', description:'Warm timber tones bring rhythm and character to the room. Explore a natural palette and discuss slat finishes and suitability with your supplier.', mood:'Warm & architectural', space:'Considered interiors' },
  { id:'03', name:'Smart curtains', category:'smart', label:'SOFT MOVEMENT / SMART LIVING', image:'assets/smart-curtains-img.jpg', alt:'Soft grey curtain panels in a contemporary living room', style:'curtain', line:'Let your room find its own rhythm.', description:'Soft folds create a quieter backdrop. Explore the curtain direction, then ask your supplier about fabrics, controls and motorisation options.', mood:'Soft & flowing', space:'Living & sleeping' },
  { id:'04', name:'Roller blinds', category:'outdoor', label:'AN OPEN OUTLOOK / OUTSIDE LIVING', image:'assets/roller-blinds.jpg', alt:'Outdoor roller shades around a planted pergola and seating area', style:'roller', line:'A little shade. A whole new perspective.', description:'A clean roller direction for an open-air setting. Discuss the right product, fixing and fabric for your site before choosing an outdoor system.', mood:'Clean & understated', space:'Outdoor inspiration' }
];

const colourNames = { ivory:'Warm ivory', taupe:'Soft taupe', rose:'Clay rose', olive:'Olive linen', walnut:'Natural walnut' };
const colourHex = { ivory:'#d9c9ad', taupe:'#a99a86', rose:'#b98778', olive:'#838875', walnut:'#946943' };
const styleNames = { roller:'Roller blinds', layered:'Layered blinds', wooden:'Wooden blinds', curtain:'Smart curtains' };
const sampleQuestions = {
  layered:'Fabric opacity, band alignment and privacy',
  wooden:'Material, slat size and room suitability',
  curtain:'Lining, motor controls and fitting',
  roller:'Indoor/outdoor rating, opacity and fixing'
};
const studio = { style:'layered', colour:'ivory', opening:45, time:'morning' };
let activeProduct = products[0];

function setPressed(buttons, predicate) {
  buttons.forEach(button => {
    const active = predicate(button);
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

products.forEach(product => {
  const article = document.createElement('article');
  article.className = 'product-card';
  article.dataset.category = product.category;
  // These values come exclusively from the fixed catalogue, never form input.
  article.innerHTML = `<button class="product-open" aria-label="Explore ${product.name}"><div class="product-photo"><img id="product-image-${product.id}" src="${product.image}" width="900" height="680" alt="${product.alt}" loading="lazy"><span class="product-number">${product.id}</span><span class="product-view-note">ROOM INSPIRATION</span><span class="round-arrow" aria-hidden="true">↗</span></div><div class="product-info"><p class="eyebrow">${product.label}</p><h3>${product.name}</h3><p>${product.line}</p><div class="product-features"><span>${product.mood}</span><span>${product.space}</span></div></div></button><div class="product-view-switch" role="group" aria-label="Choose ${product.name} image view"><button class="product-view-button is-active" type="button" data-view="room" aria-pressed="true" aria-controls="product-image-${product.id}">Room</button><button class="product-view-button" type="button" data-view="fabric" aria-pressed="false" aria-controls="product-image-${product.id}">Fabric</button></div>`;
  article.querySelector('.product-open').addEventListener('click', () => showProduct(product));
  article.querySelectorAll('.product-view-button').forEach(button => button.addEventListener('click', () => {
    const fabric = button.dataset.view === 'fabric';
    const image = article.querySelector('.product-photo img');
    image.src = fabric ? `assets/fabric-${product.style}.svg` : product.image;
    image.alt = fabric ? `Original illustrative ${product.name.toLowerCase()} texture; not a manufacturer sample` : product.alt;
    article.querySelector('.product-photo').classList.toggle('is-fabric',fabric);
    article.querySelector('.product-view-note').textContent = fabric ? 'ILLUSTRATIVE MATERIAL STUDY' : 'ROOM INSPIRATION';
    setPressed([...article.querySelectorAll('.product-view-button')],item => item === button);
  }));
  $('#product-grid').append(article);
});

$$('.filter').forEach(button => button.addEventListener('click', () => {
  setPressed($$('.filter'), item => item === button);
  let count = 0;
  $$('.product-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count += 1;
  });
  $('.result-count').textContent = `${String(count).padStart(2,'0')} / ${count === 1 ? 'COLLECTION' : 'COLLECTIONS'}`;
}));

function openDialog(dialog) {
  dialog.showModal();
  document.body.classList.add('modal-open');
}
$$('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (!$('dialog[open]')) document.body.classList.remove('modal-open');
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

function showProduct(product) {
  activeProduct = product;
  $('#dialog-product-image').src = product.image;
  $('#dialog-product-image').alt = product.alt;
  $('#dialog-product-type').textContent = product.label;
  $('#product-dialog-title').textContent = product.name;
  $('#dialog-product-description').textContent = product.description;
  const notes = $('#dialog-product-notes');
  notes.replaceChildren();
  [['Visual direction',product.mood],['Explore for',product.space],['Confirm with your supplier',sampleQuestions[product.style]]].forEach(([name,value]) => {
    const row = document.createElement('div');
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = name; detail.textContent = value;
    row.append(term,detail); notes.append(row);
  });
  openDialog($('#product-dialog'));
}

function updateStudio(changes = {}) {
  Object.assign(studio, changes);
  const scene = $('#room-scene');
  scene.dataset.style = studio.style;
  scene.dataset.time = studio.time;
  scene.style.setProperty('--fabric', colourHex[studio.colour]);
  scene.style.setProperty('--cover', `${100-studio.opening}%`);
  scene.setAttribute('aria-label', `AI-created room with illustrative ${styleNames[studio.style].toLowerCase()}, ${colourNames[studio.colour].toLowerCase()}, ${studio.opening} percent open, ${studio.time} light`);
  $('#opening').value = String(studio.opening);
  $('#opening').setAttribute('aria-valuetext',`${studio.opening} percent open`);
  $('#opening-value').textContent = `${studio.opening}% open`;
  $('#colour-name').textContent = colourNames[studio.colour];
  $('#scene-time').textContent = { morning:'08:00 AM', afternoon:'02:00 PM', evening:'07:00 PM' }[studio.time];
  setPressed($$('.style-option'), button => button.dataset.style === studio.style);
  setPressed($$('.colour-option'), button => button.dataset.colour === studio.colour);
  setPressed($$('.daylight'), button => button.dataset.time === studio.time);
}
$$('.style-option').forEach(button => button.addEventListener('click', () => updateStudio({ style:button.dataset.style })));
$$('.colour-option').forEach(button => button.addEventListener('click', () => updateStudio({ colour:button.dataset.colour })));
$$('.daylight').forEach(button => button.addEventListener('click', () => updateStudio({ time:button.dataset.time })));
$('#opening').addEventListener('input', event => updateStudio({ opening:Number(event.target.value) }));
updateStudio();

function scrollToSection(selector) {
  $(selector).scrollIntoView({ behavior:reducedMotion() ? 'instant' : 'smooth' });
}
$('#try-product').addEventListener('click', () => {
  updateStudio({ style:activeProduct.style, ...(activeProduct.style === 'wooden' ? {colour:'walnut'} : {}) });
  $('#product-dialog').close();
  scrollToSection('#studio');
  $('#opening').focus({preventScroll:true});
});

const heroSlides = [
  { image:'assets/home-banner.jpg', alt:'Warm wood bedroom with expansive pale blinds overlooking a green landscape', caption:'THE SLOW MORNING EDIT' },
  { image:'assets/choose-swiper-right.jpg', alt:'Warm contemporary living room with layered shades and a timber ceiling', caption:'THE NATURAL LIVING EDIT' },
  { image:'assets/home-innovating-image2.jpg', alt:'Cream curtains glowing softly in warm evening light', caption:'THE QUIETER EVENING EDIT' }
];
$$('.hero-slide').forEach(button => button.addEventListener('click', () => {
  const slide = heroSlides[Number(button.dataset.slide)];
  $('#hero-image').src = slide.image;
  $('#hero-image').alt = slide.alt;
  $('#hero-caption').textContent = slide.caption;
  setPressed($$('.hero-slide'), item => item === button);
}));

const finderQuestions = [
  { title:'Which space are we dreaming about?', options:[['living','A room to gather in'],['bedroom','A bedroom to unwind in'],['office','A space to focus in'],['outdoor','An outdoor corner']] },
  { title:'What matters most to you?', options:[['soft','A soft, filtered outlook'],['privacy','A little more privacy'],['easy','An effortless everyday feel']] },
  { title:'Which feeling speaks to you?', options:[['natural','Warm & natural'],['clean','Clean & understated'],['flowing','Soft & flowing']] }
];
let finderStep = 0;
let finderAnswers = [];
let finderProduct = products[0];

function renderFinder() {
  $('#finder-questions').hidden = false;
  $('#finder-result').hidden = true;
  $('#finder-number').textContent = String(finderStep+1).padStart(2,'0');
  $('#finder-question').textContent = finderQuestions[finderStep].title;
  $('#finder-back').hidden = finderStep === 0;
  const answers = $('#finder-answers');
  answers.replaceChildren();
  finderQuestions[finderStep].options.forEach(([value,label]) => {
    const button = document.createElement('button');
    button.className = 'finder-answer';
    button.type = 'button';
    if (finderAnswers[finderStep] === value) button.classList.add('is-selected');
    const text = document.createElement('span');
    text.textContent = '↗'; text.setAttribute('aria-hidden','true');
    button.append(document.createTextNode(label),text);
    button.addEventListener('click', () => {
      finderAnswers[finderStep] = value;
      if (finderStep < 2) { finderStep += 1; renderFinder(); }
      else showFinderResult();
    });
    answers.append(button);
  });
  $('#finder-question').setAttribute('tabindex','-1');
  $('#finder-question').focus({preventScroll:true});
}
function showFinderResult() {
  const [space,priority,feeling] = finderAnswers;
  if (space === 'outdoor') finderProduct = products[3];
  else if (feeling === 'flowing') finderProduct = products[2];
  else if (feeling === 'natural') finderProduct = products[1];
  else if (priority === 'privacy') finderProduct = {...products[3],name:'An indoor roller direction'};
  else finderProduct = products[0];
  $('#finder-questions').hidden = true;
  $('#finder-result').hidden = false;
  $('#finder-result-name').textContent = finderProduct.name;
  const descriptions = {
    layered:'A lighter, layered direction could suit your preference for a soft outlook. Explore the balance of fabric and open space, then confirm options with your supplier.',
    wooden:'A warm wood direction is a good place to explore your natural palette. See samples and discuss the room’s conditions before selecting a finish.',
    curtain:'A soft curtain direction brings the flowing look you chose. Explore fabric, fullness and operation in the room before deciding.',
    roller:space === 'outdoor' ? 'Explore the clean lines of an outdoor roller system. A supplier should confirm the right weather exposure, fixing and fabric for your site.' : 'Explore a simple roller direction with a privacy fabric. Ask your supplier to specify an indoor system for your room and confirm the right opacity with real samples.'
  };
  $('#finder-result-description').textContent = descriptions[finderProduct.style];
  $('#finder-result-name').setAttribute('tabindex','-1');
  $('#finder-result-name').focus({preventScroll:true});
}
function restartFinder() { finderStep=0; finderAnswers=[]; renderFinder(); }
$$('.finder-trigger').forEach(button => button.addEventListener('click', () => { openDialog($('#finder-dialog')); restartFinder(); }));
$('#finder-back').addEventListener('click', () => { if (finderStep>0) { finderStep-=1; renderFinder(); } });
$('#finder-restart').addEventListener('click',restartFinder);
$('#finder-try').addEventListener('click', () => {
  updateStudio({style:finderProduct.style,...(finderProduct.style==='wooden' ? {colour:'walnut'} : {})});
  $('#room').value = {living:'Living room',bedroom:'Bedroom',office:'Home office',outdoor:'Outdoor space'}[finderAnswers[0]];
  $('#finder-dialog').close(); scrollToSection('#studio'); $('#opening').focus({preventScroll:true});
});

const menuToggle = $('.menu-toggle');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Open navigation');
  $('#navigation').classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const active = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded',String(active));
  menuToggle.setAttribute('aria-label',active ? 'Close navigation' : 'Open navigation');
  $('#navigation').classList.toggle('is-open',active);
});
$$('#navigation a').forEach(link => link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event => {
  if (event.key==='Escape' && menuToggle.getAttribute('aria-expanded')==='true') { closeMenu(); menuToggle.focus(); }
});
document.addEventListener('click',event => { if (!$('#navigation').contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });
matchMedia('(min-width:651px)').addEventListener('change',event => { if(event.matches) closeMenu(); });

let formStep = 0;
let briefText = '';
let savedStudioLook = null;
const formSteps = $$('.form-step');
function setFormStep(step,focus=false) {
  formStep=step;
  formSteps.forEach((element,index) => {
    element.hidden=index!==step;
    element.querySelectorAll('input,select,textarea').forEach(field => {field.disabled=index!==step;});
  });
  $$('[data-step-indicator]').forEach((element,index) => {
    element.classList.toggle('is-active',index===step);
    if(index===step) element.setAttribute('aria-current','step');
    else element.removeAttribute('aria-current');
  });
  if(focus) formSteps[step].querySelector('input,select,textarea').focus({preventScroll:true});
}
function validateStep() {
  for(const field of formSteps[formStep].querySelectorAll('input,select,textarea')) {
    if(field.required && field.type!=='email') field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
    if(!field.reportValidity()) return false;
  }
  return true;
}
$$('#brief-form input,#brief-form select,#brief-form textarea').forEach(field => field.addEventListener('input',()=>field.setCustomValidity('')));
$$('.next-step').forEach(button=>button.addEventListener('click',()=>{if(validateStep())setFormStep(formStep+1,true);}));
$$('.back-step').forEach(button=>button.addEventListener('click',()=>setFormStep(formStep-1,true)));
$('#brief-form').addEventListener('submit',event=>{
  event.preventDefault();
  if(!validateStep())return;
  if(formStep<2){setFormStep(formStep+1,true);return;}
  for(let index=0;index<3;index+=1){setFormStep(index);if(!validateStep())return;}
  const value=selector=>$(selector).value.trim();
  const selectedText=selector=>$(selector).selectedOptions[0].textContent;
  briefText=[
    'MY WINDOW DESIGN BRIEF',
    'Created with the independent Adorn website concept by Koushik.',
    'Demo only. No enquiry or booking has been sent.',
    '',
    `Space: ${value('#room')}`,
    `Location: ${value('#city')}`,
    `Style: ${selectedText('#brief-style')}`,
    `Colour direction: ${value('#brief-colour') ? selectedText('#brief-colour') : 'Still exploring'}`,
    ...(savedStudioLook && value('#brief-style') === savedStudioLook.style && value('#brief-colour') === savedStudioLook.colour ? [`Illustrative studio inspiration: ${savedStudioLook.opening}% open, ${savedStudioLook.time} light`] : []),
    ...(value('#client-name') ? [`Name: ${value('#client-name')}`] : []),
    ...(value('#client-email') ? [`Email: ${value('#client-email')}`] : []),
    ...(value('#notes') ? ['',`My ideas: ${value('#notes')}`] : []),
    '',
    'Next step: discuss samples, measurements, product suitability and installation with your supplier.'
  ].join('\n');
  $('#brief-preview').textContent=briefText;
  $('#form-wrap').hidden=true;$('#brief-success').hidden=false;$('#brief-success').focus({preventScroll:true});
});

function resetBrief() {
  $('#brief-form').reset();briefText='';savedStudioLook=null;
  $('#brief-preview').textContent='';$('#copy-status').textContent='';
  $('#form-wrap').hidden=false;$('#brief-success').hidden=true;
  $$('#brief-form input,#brief-form select,#brief-form textarea').forEach(field=>field.setCustomValidity(''));
  setFormStep(0,true);
}
$('#reset-brief').addEventListener('click',resetBrief);
$('#save-look').addEventListener('click',()=>{
  if(!$('#brief-success').hidden)resetBrief();
  savedStudioLook={...studio};
  $('#brief-style').value=studio.style;$('#brief-colour').value=studio.colour;
  setFormStep(0);scrollToSection('#consultation');$('#room').focus({preventScroll:true});
  toast('Your look is added to the design brief.');
});
$$('.journal-card').forEach(card=>card.addEventListener('click',()=>{
  if(!$('#brief-success').hidden)resetBrief();
  $('#room').value=card.dataset.room==='living'?'Living room':'Bedroom';
  setFormStep(0);scrollToSection('#consultation');$('#city').focus({preventScroll:true});
}));
$('#download-brief').addEventListener('click',()=>{
  if(!briefText)return;
  const url=URL.createObjectURL(new Blob([briefText],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='my-window-design-brief.txt';document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('#copy-brief').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(briefText);$('#copy-status').textContent='Copied. Your next conversation starts here.';}
  catch{$('#copy-status').textContent='Copy is unavailable here. Download your brief or select and copy the text above.';}
});
let toastTimer;
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('is-visible'),3200);}
let scrollFrame=false;
function updateMobileBriefLink() {
  const heroBottom = $('.hero').getBoundingClientRect().bottom;
  const briefTop = $('#consultation').getBoundingClientRect().top;
  $('.mobile-brief-link').classList.toggle('is-visible', heroBottom <= $('.site-header').offsetHeight + 24 && briefTop > innerHeight);
}
$$('a[href="#compare"]').forEach(link => link.addEventListener('click', () => { $('#compare').open = true; }));
window.addEventListener('resize', updateMobileBriefLink);
updateMobileBriefLink();
window.addEventListener('scroll',()=>{
  if(scrollFrame)return;scrollFrame=true;
  requestAnimationFrame(()=>{const maximum=document.documentElement.scrollHeight-innerHeight;$('.reading-progress').style.width=`${maximum>0 ? Math.min(100,scrollY/maximum*100) : 0}%`;updateMobileBriefLink();scrollFrame=false;});
},{passive:true});
$('#year').textContent=new Date().getFullYear();
setFormStep(0);

// Motion is optional; content stays visible when JavaScript or motion is off.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
function configureReveals() {
  if (revealObserver) revealObserver.disconnect();
  const targets = $$('.section-heading,.intro-section,.product-card,.approach-copy,.journal-card');
  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    document.documentElement.classList.remove('js-motion');
    targets.forEach(element => element.classList.add('is-visible'));
    return;
  }
  document.documentElement.classList.add('js-motion');
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },{threshold:.08,rootMargin:'0px 0px -18px 0px'});
  targets.forEach(element => {
    element.classList.add('reveal');
    const rect = element.getBoundingClientRect();
    if (rect.top < innerHeight && rect.bottom > 0) element.classList.add('is-visible');
    else revealObserver.observe(element);
  });
}
motionPreference.addEventListener('change',configureReveals);
configureReveals();
