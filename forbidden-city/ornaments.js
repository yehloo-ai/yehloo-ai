/* Newly drawn interpretive motifs, not scans or exact copies of museum ornaments. */
window.PalaceOrnaments={
 texture(T,type){
  const c=document.createElement('canvas');c.width=512;c.height=512;const g=c.getContext('2d');
  const gold='#dab361',pale='#f3d993';g.fillStyle=type==='silk'?'#801d27':type==='screen'?'#8a4522':'#183f43';g.fillRect(0,0,512,512);g.strokeStyle=gold;g.lineWidth=5;g.strokeRect(13,13,486,486);g.lineWidth=2;g.strokeRect(24,24,464,464);
  const ring=(x,y,r)=>{g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.stroke();};
  const dragon=(x,y,r)=>{g.save();g.translate(x,y);g.strokeStyle=gold;g.lineWidth=12;g.lineCap='round';g.beginPath();for(let i=0;i<=100;i++){const t=i/100*5.7,rr=r*(.93-i/180);const xx=Math.cos(t)*rr,yy=Math.sin(t)*rr;i?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();g.lineWidth=2;g.strokeStyle=pale;for(let i=0;i<30;i++){const t=i/30*5.6,rr=r*(.93-i/54);g.beginPath();g.arc(Math.cos(t)*rr,Math.sin(t)*rr,6,t,t+Math.PI);g.stroke();}g.fillStyle=gold;g.beginPath();g.ellipse(r*.36,-r*.32,22,14,-.3,0,Math.PI*2);g.fill();g.fillStyle='#142d2d';g.fillRect(r*.36+3,-r*.32-7,4,4);g.strokeStyle=gold;g.lineWidth=4;for(let s of [-1,1]){g.beginPath();g.moveTo(r*.36,-r*.32);g.quadraticCurveTo(r*.66,-r*.62+s*12,r*.77,-r*.42+s*18);g.stroke();}for(let i=0;i<4;i++){const a=i*Math.PI/2;g.save();g.rotate(a);g.beginPath();g.moveTo(r*.48,0);g.lineTo(r*.64,r*.16);g.lineTo(r*.86,r*.1);g.stroke();for(let j=-1;j<=1;j++){g.beginPath();g.moveTo(r*.86,r*.1);g.lineTo(r*.95,r*.1+j*10);g.stroke();}g.restore();}g.restore();};
  const lotus=(x,y,r)=>{g.save();g.translate(x,y);for(let i=0;i<12;i++){g.rotate(Math.PI/6);g.beginPath();g.moveTo(0,0);g.bezierCurveTo(-r*.38,-r*.55,-r*.2,-r*.87,0,-r);g.bezierCurveTo(r*.2,-r*.87,r*.38,-r*.55,0,0);g.fillStyle=i%2?'#d5a955':'#45776b';g.fill();g.stroke();}ring(0,0,r*.18);g.restore();};
  if(type==='clock'){g.fillStyle='#efe2bd';g.fillRect(0,0,512,512);g.strokeStyle='#4e3522';ring(256,256,222);ring(256,256,207);g.fillStyle='#322719';g.font='32px Georgia';g.textAlign='center';g.textBaseline='middle';for(let i=1;i<=12;i++){const a=i*Math.PI/6;g.fillText(['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][i],256+Math.sin(a)*176,256-Math.cos(a)*176);}g.lineWidth=9;g.beginPath();g.moveTo(256,256);g.lineTo(178,211);g.moveTo(256,256);g.lineTo(293,119);g.stroke();}
  else if(type==='silk'){g.globalAlpha=.6;for(let y=70;y<510;y+=120)for(let x=70;x<510;x+=120)lotus(x,y,35);}
  else if(type==='lotus'){lotus(256,256,148);for(let a=0;a<8;a++){g.save();g.translate(256,256);g.rotate(a*Math.PI/4);g.beginPath();g.moveTo(170,0);g.bezierCurveTo(230,-70,225,65,174,60);g.stroke();g.restore();}}
  else if(type==='shou'){ring(256,256,130);ring(256,256,118);g.fillStyle=gold;g.font='170px "Songti SC",serif';g.textAlign='center';g.textBaseline='middle';g.fillText('寿',256,260);for(let i=0;i<4;i++){g.save();g.translate(256,256);g.rotate(i*Math.PI/2);g.beginPath();g.moveTo(-55,-176);g.bezierCurveTo(-72,-224,-15,-230,0,-187);g.bezierCurveTo(15,-230,72,-224,55,-176);g.quadraticCurveTo(20,-193,0,-158);g.quadraticCurveTo(-20,-193,-55,-176);g.fillStyle=gold;g.fill();g.restore();}}
  else if(type==='spiral'){for(let y=100;y<=410;y+=155)for(let x=100;x<=410;x+=155){g.lineWidth=6;g.beginPath();for(let i=0;i<70;i++){const a=i*.15,r=i*.75;const xx=x+Math.cos(a)*r,yy=y+Math.sin(a)*r;i?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}}
  else if(type==='plain'){g.strokeStyle='#9b9774';for(let y=64;y<512;y+=64){g.beginPath();g.moveTo(30,y);g.lineTo(482,y);g.stroke();}}
  else{ring(256,256,184);ring(256,256,175);dragon(256,256,150);for(const x of [65,447])for(const y of [65,447])lotus(x,y,29);if(type==='phoenix'){g.lineWidth=4;for(let s of [-1,1])for(let i=0;i<5;i++){g.beginPath();g.moveTo(256,270);g.quadraticCurveTo(256+s*(70+i*18),330+i*15,256+s*(65+i*20),400);g.stroke();}}}
  const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;tx.anisotropy=8;return tx;
 },
 build(v,api){
  const T=v.T,b=v.b,{box,cyl,rod,place,register}=api,w=b.w,d=b.d,h=b.h,base=b.base,top=base+h;
  const mats=v.materials;
  for(const [key,type] of [['painted',b.paint||'plain'],['coffer',b.ceiling||'plain'],['screen','screen'],['silk','silk'],['clockface','clock']])mats[key]=new T.MeshStandardMaterial({map:this.texture(T,type),roughness:key==='silk'?.95:.65,metalness:key==='silk'?0:.18,side:T.DoubleSide});
  const makeLayer=(key,text,ceiling=false)=>{const name='detail-'+key;register(name,text);v.groups[name].userData.ceiling=ceiling;return name;};
  const desc=key=>b.features?.find(f=>f[1]===key)?.slice(0,3).filter((_,i)=>i!==1).join('：')||'装饰构件：类型与纹样为简化示意。';
  v.featureViews={};
  const focus=(key,x,y,z,r=15,phi=1.38,theta=0)=>v.featureViews[key]={target:[x,base+y,z],radius:r,phi,theta};
  focus('room',0,h*.35,-d*.16,Math.min(d*.7,24));focus('throne',0,3,-d*.16,17,1.45,0);focus('ceiling',0,h-.5,-d*.2,Math.min(h*.87,9.5),2.8,0);focus('goldColumns',0,h*.45,-d*.10,20,1.4,.8);focus('frame',0,h+1,0,w*1.05,.95,.4);focus('lattice',w*.3,h*.56,d*.5,12,1.45,.25);focus('chambers',w*.33,h*.38,-d*.10,Math.min(20,d),.9,.9);
  const beam=makeLayer('painted','梁枋装饰：'+(b.paint==='plain'?'资料未核定，保留素色示意。':'参照官方所述彩画类型绘制；图案不是原作复制。'));
  if(b.paint&&b.paint!=='plain')for(let i=0;i<b.bays;i++)for(let j=0;j<=b.depth;j++){const x=-w/2+(i+.5)*w/b.bays,z=-d/2+j*d/b.depth;box(beam,'painted',x,top-.2,z,w/b.bays-.35,.7,.47);}
  const coffers=makeLayer('coffers',desc('ceiling'),true),dx=w/b.bays,dz=d/Math.max(b.depth,1);
  for(let i=0;i<b.bays;i++)for(let j=0;j<b.depth;j++){const x=-w/2+(i+.5)*dx,z=-d/2+(j+.5)*dz;if(b.caisson&&Math.abs(x)<dx*.6&&Math.abs(z+d*.2)<dz*.65)continue;box(coffers,'coffer',x,top-.68,z,dx-.2,.14,dz-.2);}
  if(b.caisson){const l=makeLayer('caisson',desc('ceiling'),true),z=-d*.2,R=Math.min(4,dx*.85);for(let level=0;level<5;level++){const r=R-level*R*.13,yy=top-.7+level*.43,n=level===0?4:level<3?8:24,rotation=level===0?Math.PI/4:0;for(let i=0;i<n;i++){const a=i/n*Math.PI*2+rotation,aa=(i+1)/n*Math.PI*2+rotation;rod(l,'gold',[Math.cos(a)*r,yy,z+Math.sin(a)*r],[Math.cos(aa)*r,yy,z+Math.sin(aa)*r],.11);rod(l,'teal',[Math.cos(a)*r,yy,z+Math.sin(a)*r],[Math.cos(a)*r*.84,yy+.45,z+Math.sin(a)*r*.84],.10);}}for(let level=0;level<4;level++){const r=R-level*R*.13,rr=R-(level+1)*R*.13,y=top-.70+level*.43,verts=[],uv=[];const n=level===0?4:8;for(let i=0;i<n;i++){const a=i/n*Math.PI*2+(n===4?Math.PI/4:0),aa=(i+1)/n*Math.PI*2+(n===4?Math.PI/4:0),p=[Math.cos(a)*r,y,z+Math.sin(a)*r],q=[Math.cos(aa)*r,y,z+Math.sin(aa)*r],pp=[Math.cos(a)*rr,y+.43,z+Math.sin(a)*rr],qq=[Math.cos(aa)*rr,y+.43,z+Math.sin(aa)*rr];verts.push(...p,...q,...qq,...p,...qq,...pp);uv.push(0,0,1,0,1,1,0,0,1,1,0,1);}const geom=new T.BufferGeometry();geom.setAttribute('position',new T.Float32BufferAttribute(verts,3));geom.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geom.computeVertexNormals();const mesh=new T.Mesh(geom,mats.painted);mesh.userData.label=desc('ceiling');v.groups[l].add(mesh);}cyl(l,'teal',0,top+1.45,z,R*.48,.13);for(let i=0;i<60;i++){const a=i/60*Math.PI*5,aa=(i+1)/60*Math.PI*5,r=R*.31*(1-i/90),rr=R*.31*(1-(i+1)/90);rod(l,'gold',[Math.cos(a)*r,top+1.2,z+Math.sin(a)*r],[Math.cos(aa)*rr,top+1.2,z+Math.sin(aa)*rr],.13);}place(l,'sphere','gold',0,top+.95,z,.36,.25,.48);rod(l,'gold',[0,top+.85,z+.25],[0,top+.30,z+.25],.04);place(l,'sphere','paper',0,top+.14,z+.25,.24,.24,.24);}
  // Separate layers keep close-up details clickable and hidden in structural views.
  if(['throne','chamber','seals'].includes(b.kind)){
   const l=makeLayer('throne',desc('throne')),z=-d*.16;
   for(let i=0;i<7;i++){const x=(i-3)*1.17,hh=5.05-Math.abs(i-3)*.12;box(l,'screen',x,base+3.7,z-2.46,1.05,hh,.06);for(let j=0;j<8;j++){const a=j/7*Math.PI;place(l,'sphere','gold',x+.53*Math.cos(a),base+3.7+hh/2+.14+.2*Math.sin(a),z-2.45,.09,.09,.08);}}
   box(l,'gold',0,base+1.04,z,7.2,.12,4.3);for(let s of [-1,1])for(let i=0;i<8;i++){const xx=s*3.35;box(l,'gold',xx,base+.55,z-1.65+i*.47,.08,.7,.10);}box(l,'silk',0,base+1.6,z,2.8,.08,1.8);
   if(b.plaque){const c=document.createElement('canvas');c.width=1024;c.height=256;const g=c.getContext('2d');g.fillStyle='#112b31';g.fillRect(0,0,1024,256);g.strokeStyle='#c9a454';g.lineWidth=15;g.strokeRect(15,15,994,226);g.fillStyle='#e2bb66';g.textAlign='center';g.textBaseline='middle';g.font='bold 150px "Songti SC",serif';g.fillText(b.plaque,512,130);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;mats.plaque=new T.MeshStandardMaterial({map:tx,roughness:.6});box(l,'plaque',0,base+h-.95,z-2.3,7,1.75,.15);}
  }
  if(b.id==='taihe'){
   const l=makeLayer('ceremony',desc('ceremony'));focus('ceremony',0,2.1,d*.1,22,1.18,0);
   for(const s of [-1,1])for(let k=0;k<4;k++){
    const x=s*(5.1+k*.45),z=-d*.12+k*2.65;cyl(l,'gold',x,base+.25,z,.9,.5);
    if(k===0||k===1){place(l,'sphere','gold',x,base+1.2,z,.75,.55,.42);for(const xx of [-.45,.45])for(const zz of [-.3,.3])cyl(l,'gold',x+xx,base+.67,z+zz,.12,.72);place(l,'sphere','gold',x,base+1.5,z+.55,.38,.38,.4);if(k===0){rod(l,'gold',[x,base+1.4,z+.8],[x+.2,base+.5,z+1],.12);for(let ss of [-1,1])place(l,'sphere','gold',x+ss*.34,base+1.55,z+.5,.23,.35,.1);cyl(l,'gold',x,base+1.95,z,.36,.5);}else{rod(l,'gold',[x,base+1.7,z+.7],[x,base+2.13,z+.74],.07);}}
    else if(k===2){for(const ss of [-1,1])rod(l,'gold',[x+ss*.15,base+.5,z],[x+ss*.1,base+1.7,z],.045);place(l,'sphere','gold',x,base+1.8,z,.31,.28,.65);rod(l,'gold',[x,base+1.9,z+.4],[x,base+2.9,z+.44],.065);place(l,'sphere','gold',x,base+2.96,z+.43,.14,.14,.16);rod(l,'gold',[x,base+2.96,z+.52],[x,base+2.9,z+.9],.04);}
    else{for(let n=0;n<6;n++){const a=n*Math.PI/3;rod(l,'gold',[x+.6*Math.cos(a),base+.5,z+.6*Math.sin(a)],[x+.6*Math.cos(a),base+2.3,z+.6*Math.sin(a)],.06);rod(l,'gold',[x+.8*Math.cos(a),base+2.3,z+.8*Math.sin(a)],[x,base+2.95,z],.07);}cyl(l,'gold',x,base+2.27,z,.8,.15);place(l,'sphere','gold',x,base+3.06,z,.12,.2,.12);}
   }
   const gl=makeLayer('gold-dragon',desc('goldColumns'));for(const x of [-dx/2,dx/2])for(let j=1;j<=3;j++){const z=-d/2+j*dz;place(gl,'sphere','gold',x+.1,top-1.3,z+.56,.33,.22,.28);for(const s of [-1,1])rod(gl,'gold',[x+s*.12,top-1.15,z+.55],[x+s*.3,top-.65,z+.5],.05);}
  }
  if(b.id==='baohe'){
   const l=makeLayer('chambers',desc('chambers'));for(const s of [-1,1]){const x=s*(w/2-dx);for(const z of [-d*.3,d*.3])box(l,'red',x,base+h*.4,z,.22,h*.8,d*.4);box(l,'red',x,base+h*.74,0,.26,h*.2,d*.25);for(let i=0;i<15;i++){const z=-d*.16+i*d*.32/14,yy=base+h*.85+.35*Math.cos(i/14*Math.PI*2);place(l,'sphere','gold',x,yy,z,.18,.17,.22);}}}
  if(b.id==='qianqing'||b.id==='ningshou'){
   const l=makeLayer('loft',desc(b.id==='qianqing'?'chambers':'bed'));for(const s of b.id==='qianqing'?[-1,1]:[1]){const x=s*w*.37,yy=base+h*.64;box(l,'wood',x,yy,-d*.31,w*.15,.25,d*.26);for(let i=0;i<=8;i++){const xx=x-w*.075+i*w*.15/8;box(l,'red',xx,yy+.65,-d*.18,.07,1.3,.07);}box(l,'gold',x,yy+1.28,-d*.18,w*.15,.09,.12);box(l,'silk',x,base+1.55,-d*.3,w*.12,.15,d*.2);}
  }
  if(b.kind==='ritual'){
   const l=makeLayer('ritual',desc('ritual'));focus('ritual',-w*.22,1.8,0,w*.60,.75,.45);focus('bed',w*.35,2.6,-d*.1,Math.min(13,d*.65),1.25,.12);focus('stove',w*.12,1.7,-d*.3,9,1.0,.3);
   if(b.id==='kunning'){
    focus('bed',w*2/9,2.6,-d*.26,9,1.45,0);focus('ritual',-w/18,2,0,w*.50,.9,0);focus('stove',w*.08,1.5,-d*.30,8,1.15,.2);
    box(l,'silk',w*5/18,base+1.46,d*.34,w*2/9-.15,.1,d*.21);
    for(const x of [w*2/9,w/3]){box(l,'silk',x,base+1.56,-d*.32,w/9-.3,.1,d*.23);box(l,'silk',x,base+4.65,-d*.31,w/9-.12,.25,d*.28);for(const ss of [-1,1])box(l,'silk',x+ss*(w/18-.24),base+3.2,-d*.31,.12,2.85,d*.25);}
    for(const zz of [-d*.35,d*.35])box(l,'paper',-w/18,base+1.36,zz,w*4/9-.15,.07,d*.17);
    for(let i=-2;i<=2;i++)cyl(l,'gold',-w*.12+i*.65,base+2.05,-d*.2,.15,.28);
    for(let i=0;i<10;i++)box(l,'gold',w/6+i*w*2/9/9,base+h*.67+.5,-d*.18,.065,.9,.065);
   }else{
    for(const zz of [-d*.34,d*.34])box(l,'paper',-w*.2,base+1.43,zz,w*3/7-.15,.09,d*.16);
    for(let i=-2;i<=2;i++)cyl(l,'gold',-w*.2+i*.75,base+2.05,-d*.22,.17,.35);
    for(let zz of [-d*.35,-d*.24]){cyl(l,'dark',w*.13,base+2.25,zz,.7,.14);cyl(l,'gold',w*.13,base+2.35,zz,.08,.15);}
   }
  }
  if(b.kind==='seals'){
   const clock=makeLayer('clock',desc('clock')),x=-w*.31,z=d*.06;focus('clock',x,2.6,z,9,1.45,0);box(clock,'wood',x,base+2.2,z,1.8,4.4,1);box(clock,'gold',x,base+.25,z,2,.5,1.2);box(clock,'clockface',x,base+3.2,z+.52,1.5,1.5,.06);box(clock,'dark',x,base+1.35,z+.53,1.35,1.8,.07);rod(clock,'gold',[x,base+2.1,z+.61],[x,base+.9,z+.61],.035);place(clock,'sphere','gold',x,base+.9,z+.63,.23,.23,.055);for(let s of [-1,1])box(clock,'gold',x+s*.85,base+2.2,z+.55,.08,4.4,.09);cyl(clock,'gold',x,base+4.6,z,.4,.25);place(clock,'sphere','gold',x,base+4.9,z,.16,.3,.16);
   const water=makeLayer('waterClock',desc('waterClock')),wx=w*.31;focus('waterClock',wx,2,z,9,1.2,.3);for(let j=0;j<4;j++){const yy=base+.7+j*.8,zz=z-j*.48;box(water,'red',wx,yy/2+base/2,zz,1.9,yy-base,1.0);box(water,'gold',wx,yy+.32,zz,1.4,.6,.8);box(water,'dark',wx,yy+.63,zz,1.2,.02,.65);rod(water,'gold',[wx,yy+.15,zz+.4],[wx,yy+.1,zz+.69],.05);}
   const seals=makeLayer('seals',desc('seals'));focus('seals',0,1.6,d*.24,11,1.05,0);box(seals,'wood',0,base+1.5,d*.24,4.7,.22,3.5);for(let i=0;i<25;i++){const xx=(i%5-2)*.78,zz=d*.24+(Math.floor(i/5)-2)*.57;box(seals,'gold',xx,base+1.85,zz,.56,.48,.44);place(seals,'sphere','gold',xx,base+2.16,zz,.09,.11,.09);}for(const xx of [-2,2])for(const zz of [-1.35,1.35])box(seals,'wood',xx,base+.75,d*.24+zz,.15,1.5,.15);
  }
  if(b.kind==='lecture'||b.kind==='printing'){
   const key=b.kind==='lecture'?'lecture':'printing',l=makeLayer(key,desc(key));focus(key,0,1.8,b.kind==='lecture'?-d*.23:1,13,1.18,.25);const z=b.kind==='lecture'?-d*.23:1;for(let i=0;i<5;i++){box(l,'paper',-1.6+i*.7,base+2.08,z,.55,.13,1.2);box(l,'teal',-1.6+i*.7,base+2.15,z,.55,.025,1.2);for(let j=0;j<3;j++)box(l,'paper',-1.79+i*.7,base+2.17,z-.36+j*.3,.07,.02,.06);}if(b.kind==='printing'){box(l,'dark',0,base+2.15,z+1,4.8,.12,.65);for(let i=0;i<36;i++)box(l,'wood',-2.25+i*.13,base+2.23,z+1,.07,.05,.5);}}
  if(b.kind==='altar'){
   const l=makeLayer('altar',desc('altar'));focus('altar',0,3,-d*.26,15,1.4,0);place(l,'sphere','gold',0,base+4.2,-d*.28,.56,.75,.42);place(l,'sphere','gold',0,base+5.3,-d*.28,.36,.42,.35);box(l,'dark',0,base+5.65,-d*.28,.62,.25,.57);for(let s of [-1,1]){place(l,'sphere','gold',s*.57,base+3.6,-d*.24,.45,.35,.62);rod(l,'gold',[s*.38,base+4.4,-d*.26],[s*.73,base+3.7,-d*.15],.18);}for(let x=-2.5;x<=2.5;x+=1.25){cyl(l,'gold',x,base+2.25,-d*.15,.2,.7);}box(l,'gold',0,base+6.5,-d*.33,6.3,.35,.8);
  }
  if(b.kind==='bell'){focus('bells',0,2.5,0,w*.85,1.3,0);const l=makeLayer('bells',desc('bells'));for(let j=0;j<6;j++)for(let i=0;i<10;i++){const a=i*Math.PI/5;place(l,'sphere','gold',-w*.3+1.12*Math.cos(a),base+1.7+j*.28,1.12*Math.sin(a),.07,.07,.07);}}
 }
};
