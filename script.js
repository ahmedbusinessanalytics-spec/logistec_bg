const cv=document.getElementById('c'),ctx=cv.getContext('2d');let W,H,S,OX,OY,D,now=0;const C=.866;
function rs(){D=Math.min(devicePixelRatio||1,2);W=visualViewport?.width||innerWidth;H=visualViewport?.height||innerHeight;cv.width=Math.round(W*D);cv.height=Math.round(H*D);cv.style.width=W+'px';cv.style.height=H+'px';
 S=W>=H?Math.min(W/74,H/45):Math.min(W/40,H/46);OX=W/2;OY=H/2-23*S}
addEventListener('resize',rs);addEventListener('orientationchange',()=>setTimeout(rs,150));if(window.visualViewport)visualViewport.addEventListener('resize',rs);rs();
const p=(x,y,z)=>[OX+(x-y)*C*S,OY+(x+y)*.5*S-(z||0)*S];
const rgb=(c,k)=>'rgb('+c.map(v=>Math.max(0,Math.min(255,v*k|0))).join()+')';
function M(h,b){const c=[1,3,5].map(i=>parseInt(h.substr(i,2),16));return{t:rgb(c,1.05),l:rgb(c,.8),r:rgb(c,.95),b}}
const P={ivory:M('#efeae0'),white:M('#f5f2ec'),conc:M('#c9c5bc'),stone:M('#c4bfb4'),brick:M('#a65b47',1),teal:M('#3f6c70'),tealD:M('#2f4d51'),blue:M('#72899a'),steel:M('#5a5f61'),glass:M('#5f8087'),wood:M('#b8a181'),card:M('#cf9b6d'),card2:M('#bd8a60'),wrap:M('#e7e3da'),orange:M('#cc8b58'),dark:M('#383b3d'),ghost:M('#d8d4cb'),pool:M('#9fbfc0')};
let sd=11;const rnd=()=>{sd=sd*16807%2147483647;return sd/2147483647};
const ss=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
let cur=[];const stat=[];
function B(x,y,z,w,d,h,m,o){o=o||{};cur.push({k:x+w/2+y+d/2+(z+h/2)*.15+(o.kb||0),b:[x,y,z,w,d,h,m,o]})}
function F(k,fn){cur.push({k,fn})}
function seg(cx,cy,ax,sg,s0,len,l0,wid,z,h,m,o){const a=sg>0?s0:-(s0+len);ax==='x'?B(cx+a,cy+l0,z,len,wid,h,m,o):B(cx+l0,cy+a,z,wid,len,h,m,o)}
function poly(q,f){ctx.beginPath();q.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();ctx.fillStyle=f;ctx.fill()}
function flat(x0,y0,x1,y1,c){poly([p(x0,y0),p(x1,y0),p(x1,y1),p(x0,y1)],c)}
function drawBox(x,y,z,w,d,h,m,o){
 const a=p(x+w,y,z),b=p(x+w,y+d,z),c=p(x+w,y+d,z+h),e=p(x+w,y,z+h),f=p(x,y+d,z),g=p(x,y+d,z+h),t0=p(x,y,z+h);
 if(o.a!=null)ctx.globalAlpha=o.a;
 poly([a,b,c,e],m.r);poly([b,f,g,c],m.l);poly([t0,e,c,g],m.t);
 if(!o.g){
  ctx.lineWidth=.6;
  if(m.b){ctx.strokeStyle='rgba(50,25,18,.17)';ctx.beginPath();for(let v=.32;v<h;v+=.32){let q=p(x+w,y,z+v),r=p(x+w,y+d,z+v),s=p(x,y+d,z+v);ctx.moveTo(q[0],q[1]);ctx.lineTo(r[0],r[1]);ctx.lineTo(s[0],s[1])}ctx.stroke()}
  if(o.c){ctx.strokeStyle='rgba(30,30,30,.15)';ctx.beginPath();for(let u=.26;u<w;u+=.26){let q=p(x+u,y+d,z+.05),r=p(x+u,y+d,z+h-.05);ctx.moveTo(q[0],q[1]);ctx.lineTo(r[0],r[1])}ctx.stroke()}
  if(o.d)o.d((u0,u1,v0,v1,mm)=>poly([p(x+w,y+u0,z+v0),p(x+w,y+u1,z+v0),p(x+w,y+u1,z+v1),p(x+w,y+u0,z+v1)],mm.r),
   (u0,u1,v0,v1,mm)=>poly([p(x+u0,y+d,z+v0),p(x+u1,y+d,z+v0),p(x+u1,y+d,z+v1),p(x+u0,y+d,z+v1)],mm.l),
   (a1,b1,c1,e1,mm)=>poly([p(x+a1,y+c1,z+h),p(x+b1,y+c1,z+h),p(x+b1,y+e1,z+h),p(x+a1,y+e1,z+h)],mm.t));
  if(o.s!==0){ctx.strokeStyle='rgba(55,45,40,.2)';ctx.beginPath();ctx.moveTo(f[0],f[1]);ctx.lineTo(b[0],b[1]);ctx.lineTo(a[0],a[1]);ctx.moveTo(b[0],b[1]);ctx.lineTo(c[0],c[1]);ctx.moveTo(t0[0],t0[1]);ctx.lineTo(e[0],e[1]);ctx.lineTo(c[0],c[1]);ctx.lineTo(g[0],g[1]);ctx.closePath();ctx.moveTo(f[0],f[1]);ctx.lineTo(g[0],g[1]);ctx.moveTo(a[0],a[1]);ctx.lineTo(e[0],e[1]);ctx.stroke()}
 }
 ctx.globalAlpha=1}
function hull(Q){Q.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const cr=(o,a,b)=>(a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);const L=[],U=[];for(const q of Q){while(L.length>1&&cr(L[L.length-2],L[L.length-1],q)<=0)L.pop();L.push(q)}for(let i=Q.length-1;i>=0;i--){const q=Q[i];while(U.length>1&&cr(U[U.length-2],U[U.length-1],q)<=0)U.pop();U.push(q)}U.pop();L.pop();return L.concat(U)}
function shadows(items){ctx.beginPath();for(const it of items){if(!it.b)continue;const[x,y,z,w,d,h,m,o]=it.b;const zz=z;if(o.g||h<.2||(o.a!=null&&o.a<.6))continue;const Q=[];for(const s of[zz,zz+h])for(const[X,Y]of[[x,y],[x+w,y],[x+w,y+d],[x,y+d]])Q.push(p(X-.55*s,Y+.9*s,0));const q=hull(Q);q.forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath()}ctx.fillStyle='rgba(78,64,56,.2)';ctx.fill()}
/* ---------- ground ---------- */
function ground(){
 ctx.fillStyle='#ddd9d0';ctx.fillRect(0,0,W,H);
 flat(0,13,20,22,'#d3cfc6');flat(24,12,48,22,'#d3cfc6');flat(0,26,20,48,'#e1ddd3');flat(24,26,48,48,'#d7d3c9');
 ctx.strokeStyle='rgba(120,112,100,.11)';ctx.lineWidth=.6;ctx.beginPath();for(let i=-28;i<=76;i+=4){let a=p(i,-28),b=p(i,76),c=p(-28,i),d=p(76,i);ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.moveTo(c[0],c[1]);ctx.lineTo(d[0],d[1])}ctx.stroke();
 const sw='#ece8e0';flat(-30,21,80,22,sw);flat(-30,26,80,27,sw);flat(19,-30,20,80,sw);flat(24,-30,25,80,sw);
 flat(-30,22,80,26,'#bdb9b0');flat(20,-30,24,80,'#bdb9b0');
 const ln='#f0ece4';for(let x=-30;x<80;x+=2.4)if(!(x+1.2>20&&x<24))flat(x,23.96,x+1.2,24.04,ln);for(let y=-30;y<80;y+=2.4)if(!(y+1.2>22&&y<26))flat(21.96,y,22.04,y+1.2,ln);
 for(let i=0;i<6;i++){flat(16.6+i*.45,22,16.82+i*.45,26,ln);flat(20,28.6+i*.45,24,28.82+i*.45,ln)}
 flat(26,12.1,46,12.2,'#cbc7be');for(let i=0;i<4;i++)flat(29+i*5,14,29.08+i*5,20,'#ece8df');
}
/* ---------- static scene ---------- */
function build(){cur=stat;
 [[-13,2,10,12,3],[-12,17,9,8,2],[-15,30,12,10,4.2],[-10,44,8,12,2.5],[50,2,10,10,3.5],[50,16,12,8,2],[50,30,9,14,4.5],[52,48,10,10,3],[2,-13,14,9,2.5],[26,-13,10,10,4],[40,-12,12,8,2],[4,50,12,8,3],[30,50,14,9,2.5],[-26,10,10,14,3],[-28,34,9,9,2],[62,8,10,10,2.5],[62,34,9,12,3.5],[12,-26,12,10,3],[40,-26,14,10,2],[10,62,12,9,2.5]].forEach(a=>B(a[0],a[1],0,a[2],a[3],a[4],P.ghost,{g:1}));
 // Warehouse A
 B(2,1,0,16,12,3.1,P.ivory,{d:(fr,fl,ft)=>{fl(0,16,0,.9,P.brick);fr(0,12,0,.9,P.brick);
  [[1.4,3.8],[5.4,7.8],[10.2,12.3]].forEach(u=>{fl(u[0]-.15,u[1]+.15,0,2.3,P.stone);fl(u[0],u[1],0,2.2,P.tealD);fl(u[0]+.1,u[1]-.1,1.4,2.1,P.teal)});
  for(let i=0;i<7;i++)fl(1+i*2.15,2.7+i*2.15,2.45,2.9,P.glass);fr(1.5,10.5,1.9,2.6,P.glass);ft(.5,15.5,.5,11.5,P.conc)}});
 for(let i=0;i<4;i++)for(let j=0;j<2;j++)B(3.5+i*3.4,2.5+j*4.3,3.1,2.2,1.6,.25,P.glass,{s:0,L:1});
 B(14.2,9.2,3.1,1.9,1.3,.55,P.ivory,{L:2});B(12,3,3.1,1.2,1,.4,P.stone,{L:2});
 // Warehouse B
  B(26,2,0,20,10,2.4,P.brick,{d:(fr,fl)=>{[[3,5.4],[8,10.4]].forEach(u=>{fl(u[0]-.15,u[1]+.15,0,2.1,P.stone);fl(u[0],u[1],0,2,P.tealD)});for(let i=0;i<4;i++)fl(12.5+i*1.8,13.6+i*1.8,1.1,1.7,P.dark);fr(2,4,.9,1.6,P.dark);fr(6,8,.9,1.6,P.dark)}});
 B(30,4,2.4,12,6,1.9,P.white,{L:1,d:(fr,fl,ft)=>{[1.2,3.8,6.4,9]. forEach(u=>fl(u,u+1.1,.7,1.4,P.dark));fr(1.2,2.4,.7,1.4,P.dark);fr(3.6,4.8,.7,1.4,P.dark);ft(.8,5.2,1,5,P.conc);ft(6,11,1.2,4.8,P.pool)}});
 B(31,5,4.3,4.4,3.4,.9,P.white,{L:2,d:(fr,fl)=>{fl(.8,1.8,.3,.7,P.dark);fl(2.6,3.6,.3,.7,P.dark)}});
 // office
 B(2,42,0,6,5,2.3,P.white,{d:(fr,fl)=>{fl(.5,5.5,.9,1.7,P.glass);fr(.5,4.5,.9,1.7,P.glass)}});B(2.6,42.6,2.3,3,3,.8,P.brick,{L:1});
 // pallet storage
 let pc=0;const mats=[P.card,P.card2,P.wrap,P.blue,P.stone];
 const pal=(px,py)=>{B(px,py,0,.9,.9,.14,P.wood,{s:0});const n=1+(rnd()<.55?1:0);let z=.14;for(let l=0;l<n;l++){const bw=.7+rnd()*.15,bh=.32+rnd()*.3;B(px+(.9-bw)/2,py+.1,z,bw,.7,bh,mats[rnd()*5|0]);z+=bh}};
 for(const ry of[28.2,30.2,36,38])for(let i=0;i<11;i++){if(rnd()<.12)continue;pal(2.4+i*1.5,ry)}
 [4.2,5.4,7.8,9,29.6,30.8,34.4,35.6].forEach(x=>pal(x,18.7));
 // containers
 const cm=[P.teal,P.blue,P.brick,P.white,P.teal,P.orange,P.stone];
 for(const cx of[26,28.8,31.6,38.6,41.4,44.2])for(let j=0;j<8;j++){const n=1+(rnd()*3|0);const m=cm[rnd()*7|0];for(let l=0;l<n;l++)B(cx,28.2+j*1.25,l*1.05,2.6,1.05,1.05,l?cm[rnd()*7|0]:m,{c:1,ld:l?0:1})}
 B(34.85,30.4,0,2.6,1.05,1.05,P.blue,{c:1});
 // gantry
 [34.4,37.7].forEach(x=>{B(x,27,4.2,.28,14.5,.3,P.steel,{kb:25});[27,34,41.2].forEach(y=>B(x,y,0,.28,.28,4.2,P.steel))});
 // conveyors
 [[13,13,.5,6.5,13,19,6.3,.5,[13.1,14,16,18.4],[15,17,19]],[40.95,12,.5,6.8,40.95,18.35,5.8,.5,[12.8,14.8,16.8],[43,45]]].forEach(c=>{B(c[0],c[1],.65,c[2],c[3],.14,P.steel,{kb:.3});B(c[4],c[5],.65,c[6],c[7],.14,P.steel,{kb:.3});c[8].forEach(y=>B(c[0]+.2,y,0,.1,.1,.65,P.steel,{s:0}));c[9].forEach(x=>B(x,c[5]+.2,0,.1,.1,.65,P.steel,{s:0}))});
 B(19.3,18.95,0,.6,.6,.7,P.brick);B(46.5,18.3,0,.8,.8,.7,P.brick);
 // lamps & trees
 [4,12,32,40,46].forEach(x=>B(x,21.3,0,.12,.12,2.8,P.steel,{s:0}));[4,12,32,40,46].forEach(x=>B(x,26.5,0,.12,.12,2.8,P.steel,{s:0}));
 [[1.5,21.5],[10,21.5],[16,21.5],[28,21.5],[37,21.5],[45,21.5],[1.5,26.6],[10,26.6],[16,26.6],[28,26.6],[45,26.6],[19.5,5],[19.5,14],[24.5,5],[24.5,15],[19.5,31],[24.5,40],[19.5,45]].forEach(q=>F(q[0]+q[1]+.3,()=>{const a=p(q[0],q[1],0),r=S;ctx.fillStyle='rgba(78,64,56,.13)';ctx.beginPath();ctx.ellipse(a[0]-.9*r,a[1]+.1*r,1.1*r,.4*r,0,0,7);ctx.fill();ctx.strokeStyle='rgba(80,74,68,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[0],a[1]-1.7*r);ctx.stroke();ctx.fillStyle='rgba(222,218,208,.7)';ctx.strokeStyle='rgba(80,74,68,.55)';ctx.beginPath();ctx.ellipse(a[0],a[1]-2.3*r,.85*r,.8*r,0,0,7);ctx.fill();ctx.stroke();ctx.beginPath();for(let i=0;i<5;i++){ctx.moveTo(a[0]-.5*r+i*.25*r,a[1]-2.7*r);ctx.lineTo(a[0]-.2*r+i*.2*r,a[1]-2*r)}ctx.stroke()}));
}
/* ---------- dynamic ---------- */
function truck(cx,cy,ax,sg,tm,st,al,flat,len){len=len||3.3;const w=1.6,g=.12,cl=1.15,tot=len+g+cl,o0=-tot/2,o={a:al};
 seg(cx,cy,ax,sg,o0,tot,-w/2+.1,w-.2,.3,.2,P.dark,{a:al,s:0});
 [o0+.4,o0+1.2,o0+tot-.9].forEach(s=>seg(cx,cy,ax,sg,s,.6,-w/2-.02,w+.04,0,.4,P.dark,{a:al,s:0}));
 seg(cx,cy,ax,sg,o0,len,-w/2,w,.5,flat?.12:1.3,tm,flat?o:{a:al,d:(fr,fl)=>{fr(0,ax==='y'?len:w,.15,.4,st);fl(0,ax==='y'?w:len,.15,.4,st)}});
 seg(cx,cy,ax,sg,o0+len+g,cl,-w/2,w,.35,1.15,P.teal,{a:al,d:(fr,fl)=>{fr(.2,(ax==='y'?cl:w)-.2,.55,1.05,P.glass);fl(.2,(ax==='y'?w:cl)-.2,.55,1.05,P.glass)}})}
function fork(cx,cy,ax,sg,load){const g=(s0,l,l0,w,z,h,m,o)=>seg(cx,cy,ax,sg,s0,l,l0,w,z,h,m,o);
 g(-.5,1.0,-.34,.68,0,.2,P.dark,{s:0});g(-.55,1.0,-.3,.6,.2,.42,P.orange);g(-.1,.06,-.3,.06,.62,.45,P.steel,{s:0});g(-.1,.06,.24,.06,.62,.45,P.steel,{s:0});g(-.15,.55,-.3,.6,1.07,.05,P.steel,{s:0});g(.45,.1,-.22,.44,.1,.95,P.dark,{s:0});g(.55,.75,-.2,.08,.14,.05,P.steel,{s:0});g(.55,.75,.12,.08,.14,.05,P.steel,{s:0});
 if(load){g(.6,.7,-.3,.6,.19,.09,P.wood,{s:0});g(.65,.55,-.25,.5,.28,.42,P.card)}}
function lane(cx,cy,ax,a,b,T,ph){const u=(now/T+ph)%1;let k,sg,l;if(u<.42){k=ss(u/.42);sg=1;l=1}else if(u<.5){k=1;sg=1;l=1}else if(u<.92){k=1-ss((u-.5)/.42);sg=-1;l=0}else{k=0;sg=-1;l=0}
 const pos=a+(b-a)*k,dir=Math.sign(b-a)*sg;ax==='x'?fork(pos,cy,'x',dir,l):fork(cx,pos,'y',dir,l)}
function dock(cx,wy,T,ph,tm,st){const rest=wy+2.44,far=rest+7.6,u=(now/T+ph)%1;let y,al=1;
 if(u<.2){const k=u/.2;y=far+(rest-far)*ss(k);al=Math.min(1,k*3)}else if(u<.72)y=rest;else if(u<.92){const k=(u-.72)/.2;y=rest+(far-rest)*ss(k);al=Math.min(1,(1-k)*3)}else return;truck(cx,y,'y',1,tm,st,al)}
function onPath(q,s){for(let i=0;i<q.length-1;i++){const a=q[i],b=q[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1]);if(s<=l){const k=s/l;return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k]}s-=l}return q[q.length-1]}
const cp=[[[13.25,13.3],[13.25,19.25],[19.2,19.25]],[[41.2,12.3],[41.2,18.6],[46.4,18.6]]],cmat=[P.card,P.wrap,P.card2,P.blue,P.card];
const rv=[['x',23,1,1.7,0,P.white,P.brick],['x',25,-1,1.5,.45,P.stone,P.teal],['y',23,1,1.4,.2,P.white,P.orange],['y',21,-1,1.8,.7,P.stone,P.brick]];
const gk=[[0,31,1.05],[.06,31,1.05],[.16,31,3.3],[.42,38.35,3.3],[.52,38.35,.62],[.6,38.35,.62],[.7,38.35,3.3],[.94,31,3.3],[1,31,1.05]];
function dyn(){
 dock(4.6,13,40,0,P.white,P.brick);dock(8.6,13,40,.5,P.stone,P.teal);dock(30.2,12,40,.25,P.stone,P.orange);dock(35.2,12,40,.75,P.white,P.teal);
 lane(6.6,0,'y',18.4,14.3,22,.15);lane(11,0,'y',18.4,14.3,26,.6);lane(32.6,0,'y',19,13.3,24,.35);lane(0,33.6,'x',3,16.5,30,.3);lane(0,33.6,'x',16.5,3,34,.8);
 rv.forEach((v,ri)=>{const L=100,s=(now*v[3]+v[4]*L)%L,q=v[2]>0?-20+s:80-s;v[0]==='x'?truck(q,v[1],'x',v[2],v[5],v[6],1):truck(v[1],q,'y',v[2],v[5],v[6],1)});
 truck(36.15,39,'y',1,P.stone,P.teal,1,1);
 cp.forEach((q,ci)=>{let L=0;for(let i=0;i<q.length-1;i++)L+=Math.hypot(q[i+1][0]-q[i][0],q[i+1][1]-q[i][1]);for(let i=0;i<5;i++){const s=(now*.9+i*L/5)%L,a=onPath(q,s),z=.28+.1*(i%3);B(a[0]-z,a[1]-z*.9,.79,z*2,z*1.8,z+.05,cmat[(i+ci)%5])}});
 const u=(now/26)%1;let i=1;while(gk[i][0]<u)i++;const a=gk[i-1],b=gk[i],k=ss((u-a[0])/(b[0]-a[0])),yc=a[1]+(b[1]-a[1])*k,z=a[2]+(b[2]-a[2])*k;
 B(34.4,yc-.35,4.5,3.6,.7,.3,P.teal,{kb:25});B(35.6,yc-.25,4.8,1.2,.5,.2,P.tealD,{kb:25,s:0});
 B(34.85,yc-.525,z,2.6,1.05,1.05,P.orange,{c:1,kb:z>2.5?25:0});
 F(yc+36.15+25.5,()=>{ctx.strokeStyle='rgba(50,50,50,.6)';ctx.lineWidth=1;ctx.beginPath();[35.1,37.2].forEach(x=>{const a=p(x,yc,4.5),c=p(x,yc,z+1.05);ctx.moveTo(a[0],a[1]);ctx.lineTo(c[0],c[1])});ctx.stroke()});
}
/* ---------- grain ---------- */
const nc=document.createElement('canvas');nc.width=nc.height=160;{const g=nc.getContext('2d'),im=g.createImageData(160,160);for(let i=0;i<im.data.length;i+=4){const v=rnd()<.5?60:250;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=rnd()*14}g.putImageData(im,0,0)}
let grain;

build();
function frame(ms){now=ms/1000;ctx.setTransform(D,0,0,D,0,0);ground();cur=stat.slice();dyn();cur.sort((a,b)=>a.k-b.k);shadows(cur);
 for(const it of cur){if(it.b)drawBox(...it.b);else it.fn()}
 if(!grain)grain=ctx.createPattern(nc,'repeat');ctx.fillStyle=grain;ctx.fillRect(0,0,W,H);
 const g=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);g.addColorStop(0,'rgba(236,232,224,0)');g.addColorStop(1,'rgba(236,232,224,.4)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
