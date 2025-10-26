   
const switcher = document.getElementById('switcher');
const startBtn  = document.getElementById('startBtn');
const introPane = document.getElementById('introPane');
const formPane  = document.getElementById('formPane');
const backBtn   = document.getElementById('backBtn');
const reqForm   = document.getElementById('reqForm');
const moveLeft  = document.getElementById('moveLeft');
const moveRight = document.getElementById('moveRight');

function showForm(){
  switcher.classList.add('show-form');       // الصورة → يمين
  introPane.style.display = 'none';
  formPane.style.display  = 'block';
}
function showIntro(){
  switcher.classList.remove('show-form');    // الصورة → شمال
  formPane.style.display  = 'none';
  introPane.style.display = 'block';
}

startBtn.addEventListener('click', showForm);
backBtn.addEventListener('click', showIntro);

moveLeft.addEventListener('click', ()=>{
  reqForm.classList.remove('to-right');
  reqForm.classList.add('to-left');
  setTimeout(()=>reqForm.classList.remove('to-left'), 420);
});
moveRight.addEventListener('click', ()=>{
  reqForm.classList.remove('to-left');
  reqForm.classList.add('to-right');
  setTimeout(()=>reqForm.classList.remove('to-right'), 420);
});