const data=[
{cat:'v1',img:'https://picsum.photos/300/600?1',name:'1 - Azul'},
{cat:'v1',img:'https://picsum.photos/300/600?2',name:'1 - Verde'},
{cat:'v2',img:'https://picsum.photos/300/600?3',name:'2 - Dourado'},
{cat:'v2',img:'https://picsum.photos/300/600?4',name:'2 - Azul'},
{cat:'v3',img:'https://picsum.photos/300/600?5',name:'3 - Roxo'},
{cat:'v4',img:'https://picsum.photos/300/600?6',name:'4 - Verde'},
{cat:'v5',img:'https://picsum.photos/300/600?7',name:'5 - Azul'},
{cat:'v12',img:'https://picsum.photos/300/600?8',name:'12 - Verde'},
{cat:'v14',img:'https://picsum.photos/300/600?9',name:'14 - Azul'},
{cat:'v16',img:'https://picsum.photos/300/600?10',name:'16 - Verde'},
{cat:'lottery',img:'https://picsum.photos/300/600?11',name:'Loteria 1'},
{cat:'lottery',img:'https://picsum.photos/300/600?12',name:'Loteria 2'},
];

const grid=document.getElementById('grid');
function render(list){
grid.innerHTML='';
list.forEach(c=>{
grid.innerHTML+=`<div class="phone">
<div class="frame"><img src="${c.img}"></div>
<div class="label">${c.name}</div>
</div>`})}
render(data);
function filterCards(cat){render(cat==='all'?data:data.filter(x=>x.cat===cat))}

// constellation background
const canvas=document.getElementById('bg');const ctx=canvas.getContext('2d');
canvas.width=innerWidth;canvas.height=innerHeight;
let pts=Array.from({length:70},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}));
function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);
pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;ctx.fillStyle='#fff';ctx.fillRect(p.x,p.y,2,2);});
for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){let dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,dist=Math.hypot(dx,dy);if(dist<120){ctx.strokeStyle='rgba(255,255,255,.1)';ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}}
requestAnimationFrame(draw)}
draw();
