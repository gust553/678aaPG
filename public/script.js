// cards
const data=[
{cat:'v1',img:'https://picsum.photos/300/600?1'},
{cat:'v1',img:'https://picsum.photos/300/600?2'},
{cat:'v2',img:'https://picsum.photos/300/600?3'},
{cat:'v2',img:'https://picsum.photos/300/600?4'},
{cat:'v3',img:'https://picsum.photos/300/600?5'},
{cat:'v3',img:'https://picsum.photos/300/600?6'},
];
const grid=document.getElementById('grid');
function render(list){grid.innerHTML='';list.forEach(c=>{
grid.innerHTML+=`<div class="card ${c.cat}"><img src="${c.img}"></div>`})}
render(data);
function filterCards(cat){if(cat==='all')render(data);else render(data.filter(x=>x.cat===cat))}

// particles
const canvas=document.getElementById('bg');const ctx=canvas.getContext('2d');
canvas.width=innerWidth;canvas.height=innerHeight;
let pts=Array.from({length:80},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5),vy:(Math.random()-0.5)}));
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);
pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;
ctx.fillStyle="#fff";ctx.fillRect(p.x,p.y,2,2);});
requestAnimationFrame(draw)}draw();
