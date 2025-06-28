// 1. GREETING WITH LIVE DATE & TIME
function getGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting;
  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";
  return greeting;
}
function pad2(n){ return (n<10?'0':'')+n; }
function updateGreeting() {
  const now = new Date();
  const greeting = getGreeting();
  const dateTime = `${now.toLocaleDateString()} ${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
  const greetingContainer = document.getElementById('greeting-container');
  if (greetingContainer) {
    greetingContainer.innerText = `${greeting}, Visitor! Today is ${dateTime}`;
  }
}
setInterval(updateGreeting, 1000);
updateGreeting();

// 2. CONTACT FORM WITH CONFETTI
function confetti() {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  const colors = ['#f9d423','#ff4e50','#1e90ff','#76ff03','#ffb300'];
  const particles = Array.from({length: 150}, () => ({
    x: Math.random()*canvas.width,
    y: Math.random()*-canvas.height,
    r: Math.random()*6+4,
    d: Math.random()*Math.PI*2,
    c: colors[Math.floor(Math.random()*colors.length)],
    s: Math.random()*2+1
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
      ctx.fillStyle = p.c;
      ctx.fill();
      p.y += p.s+Math.sin(frame/10+p.d)*0.5;
      p.x += Math.sin(frame/20+p.d)*2;
      if(p.y>canvas.height) p.y = Math.random()*-canvas.height;
      if(p.x>canvas.width) p.x = 0;
      if(p.x<0) p.x = canvas.width;
    });
    frame++;
    if(frame<120) requestAnimationFrame(draw);
    else canvas.style.display = 'none';
  }
  draw();
}

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.onsubmit = function(e){
      e.preventDefault();
      contactForm.style.display = 'none';
      document.getElementById('form-thankyou').style.display = 'block';
      confetti();
      setTimeout(()=>{
        document.getElementById('form-thankyou').style.display = 'none';
        contactForm.reset();
        contactForm.style.display = '';
      }, 3500);
    };
  }
});
