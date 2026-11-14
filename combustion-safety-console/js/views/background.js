/* VIEW: animated starfield and Earth horizon. */
const cv=$("sky"),cx=cv.getContext("2d");let W,H,mx=0,my=0;
const stars=Array.from({length:150},()=>({x:Math.random(),y:Math.random(),z:Math.random()*1.6+.3,t:Math.random()*6}));
const size=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};size();addEventListener("resize",size);
addEventListener("pointermove",ev=>{mx=ev.clientX/W-.5;my=ev.clientY/H-.5});
function draw(t){
 cx.fillStyle="#070a10";cx.fillRect(0,0,W,H);
 stars.forEach(s=>{cx.fillStyle="rgba(255,255,255,"+(.35+.45*Math.abs(Math.sin(t/2200+s.t)))+")";cx.fillRect(s.x*W-mx*s.z*12,s.y*H*.85-my*s.z*6,s.z,s.z)});
 const R=W*.95,x0=W/2-mx*24,y0=H*.75+R-my*8,g=cx.createRadialGradient(x0,y0-R*.4,R*.2,x0,y0,R);g.addColorStop(0,"#1d4f8f");g.addColorStop(1,"#0a1f3d");
 cx.beginPath();cx.arc(x0,y0,R,0,7);cx.fillStyle=g;cx.fill();cx.lineWidth=2;cx.strokeStyle="#6fa8dc";cx.globalAlpha=.5;cx.stroke();cx.globalAlpha=1;
 requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
