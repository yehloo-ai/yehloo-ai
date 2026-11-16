/* 2026-11-14. Procedural interpretive details; never a measured or scanned replica. */
(()=>{
 const additions={
  taihe:[['月台铜龟、铜鹤','terrace','依据官方条目补充成对铜龟、铜鹤、日晷与嘉量，以及十八座铜鼎；器型、比例、位置为展示性近似。'],['体仁阁与弘义阁','annex','太和殿广场东、西两侧的两层楼阁，分别面西、面东；院落间距压缩示意，不作测绘平面。']],
  qinan:[['三龛与玄天上帝','statues','参照官方原状展介绍：三座神龛、三尊玄天上帝坐像；中龛披发、跣足、仗剑。五官、衣褶及雕刻为解释性造型。'],['金童玉女与水火二将','attendants','依据官方原状展列明的四位从神补充；两侧排序、服饰、器物和比例为示意。'],['天一门与香亭','annex','依据建筑条目补充南侧天一门、两香亭及东南焚帛炉；以简化体量表达院落关系。']],
  wuying:[['敬思殿与东西配殿','annex','正殿后为敬思殿，以穿廊连接；东配凝道殿，西配焕章殿。建筑尺度、门窗分格与庭院间距均为示意。']],
  wenhua:[['本仁殿与集义殿','annex','按官方条目补充东配本仁殿、西配集义殿，以及后殿和连接空间；庭院与配殿尺寸简化。']],
  taihemen:[['门前铜狮与铜鼎','lions','官方条目记载一对铜狮和四只铜鼎。本模型表现青铜质感、卷鬃、爪部及基座；非文物扫描。']]
 };
 for(const b of PALACE_DATA){
  b.note=b.period+'。选择下方部位，可定位近看；详细依据与推定范围见各部位说明。';
  b.features.push(['瓦当、椽头与斗栱','eaves','近看瓦当端面、椽头、垂花式构件和柱础线脚；构件按木构类型示意，纹样与尺寸未经逐件测绘。']);
  b.exteriorFeatures=['eaves'];
  if(additions[b.id]){b.features.push(...additions[b.id]);b.exteriorFeatures.push(...additions[b.id].filter(x=>!['statues','attendants'].includes(x[1])).map(x=>x[1]));}
  if(b.id==='qinan'){b.features=b.features.filter(f=>f[1]!=='altar');b.extraSources.push(['钦安殿原状展 · 三龛与从神','https://www.dpm.org.cn/Uploads/pdf/4986/T00188_00.pdf']);b.period='参照钦安殿原状展与官方建筑介绍；雕塑形貌和尺寸为解释性重建';}
  if(b.id==='taihe')b.extraSources=[...(b.extraSources||[]),['体仁阁','https://www.dpm.org.cn/explore/building/236453.html']];
 }
 window.PalaceRichDetails={build(v,api){
  const T=v.T,b=v.b,{box,cyl,rod,place,register}=api,w=b.w,d=b.d,h=b.h,y=b.base,top=y+h;
  const mats=v.materials;
  for(const [key,color,metal] of [['bronze',0x656952,.72],['oldgold',0xa88038,.68],['jade',0x416d67,.25],['ivory',0xeee5cf,.02],['ink',0x211c19,.03]])mats[key]=new T.MeshStandardMaterial({color,roughness:.55,metalness:metal});
  const paving=document.createElement('canvas');paving.width=paving.height=256;const pg=paving.getContext('2d');pg.fillStyle='#a49e8f';pg.fillRect(0,0,256,256);for(let j=0;j<8;j++)for(let i=0;i<4;i++){pg.fillStyle=['#aaa597','#9d978b','#b2ac9e'][(i+j)%3];pg.fillRect(i*64+(j%2)*32-32,j*32,62,30);}const pt=new T.CanvasTexture(paving);pt.colorSpace=T.SRGBColorSpace;pt.wrapS=pt.wrapT=T.RepeatWrapping;pt.repeat.set(13,13);mats.paving=new T.MeshStandardMaterial({map:pt,roughness:.94});
  v.geometries.fineSphere=new T.SphereGeometry(1,24,16);
  const layer=(key,label,context=false)=>{register(key,label);v.groups[key].userData.context=context;return key;};
  const detail=layer('detail-carving','木构细节：构件类型示意，尺寸和雕饰经过简化。');
  const roof=layer('roof-detail','瓦当、滴水与屋脊：按形制绘制的细节示意。');
  const sculpt=layer('detail-sculpture','陈设雕塑：有文献依据的类型，非原物扫描。');
  const court=layer('court','院落陈设与配殿：相对方位有资料依据，尺寸及间距简化。',true);
  const focus=(key,x,yy,z,r,phi=1.2,theta=.3)=>v.featureViews[key]={target:[x,yy,z],radius:r,phi,theta};
  const ell=(l,m,x,yy,z,a,bb,c)=>place(l,'fineSphere',m,x,yy,z,a,bb,c);
  const curve=(l,m,pts,r=.06)=>{const c=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(...p))),g=new T.TubeGeometry(c,Math.max(12,pts.length*5),r,7,false),mesh=new T.Mesh(g,mats[m]);mesh.castShadow=true;mesh.userData.label=v.groups[l].userData.label;v.groups[l].add(mesh);};
  const ring=(l,m,x,yy,z,r,rr=.05)=>curve(l,m,Array.from({length:25},(_,i)=>[x+Math.cos(i*Math.PI/12)*r,yy,z+Math.sin(i*Math.PI/12)*r]),rr);
  const lathe=(l,m,x,yy,z,profile,scale=1)=>{const g=new T.LatheGeometry(profile.map(p=>new T.Vector2(...p)),24),mesh=new T.Mesh(g,mats[m]);mesh.position.set(x,yy,z);mesh.scale.setScalar(scale);mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.label=v.groups[l].userData.label;v.groups[l].add(mesh);return mesh;};
  const urn=(l,x,yy,z,s=1)=>{lathe(l,'bronze',x,yy,z,[[.34,0],[.38,.15],[.66,.3],[.78,.65],[.72,1.1],[.48,1.3],[.48,1.45],[.57,1.5]],s);ring(l,'oldgold',x,yy+1.48*s,z,.55*s,.05*s);for(const ss of [-1,1])curve(l,'bronze',[[x+ss*.6*s,yy+.5*s,z],[x+ss*.95*s,yy+.85*s,z],[x+ss*.83*s,yy+1.3*s,z],[x+ss*.5*s,yy+1.3*s,z]],.08*s);for(let i=0;i<3;i++){let a=i*Math.PI*2/3;rod(l,'bronze',[x+.43*s*Math.cos(a),yy+.3*s,z+.43*s*Math.sin(a)],[x+.64*s*Math.cos(a),yy-.45*s,z+.64*s*Math.sin(a)],.09*s);}for(let i=0;i<16;i++){let a=i*Math.PI/8;ell(l,'oldgold',x+.73*s*Math.cos(a),yy+.75*s,z+.73*s*Math.sin(a),.055*s,.055*s,.055*s);}};
  const pedestal=(l,x,yy,z,ww=2,dd=2)=>{box(l,'stone',x,yy+.15,z,ww+.25,.3,dd+.25);box(l,'stone',x,yy+.5,z,ww*.83,.5,dd*.83);box(l,'stone',x,yy+.85,z,ww,.2,dd);};
  const crane=(l,x,yy,z,s=1)=>{pedestal(l,x,yy,z,1.6*s,1.6*s);const Y=yy+.95*s;for(let a of [-1,1]){rod(l,'bronze',[x+a*.17*s,Y,z],[x+a*.13*s,Y+1.5*s,z],.05*s);for(let j=-1;j<=1;j++)rod(l,'bronze',[x+a*.17*s,Y,z],[x+(a*.17+j*.14)*s,Y-.02*s,z+.36*s],.025*s);}ell(l,'bronze',x,Y+1.65*s,z,.42*s,.43*s,.8*s);for(let a of [-1,1])for(let j=0;j<7;j++)curve(l,'oldgold',[[x+a*.23*s,Y+1.9*s,z+.4*s],[x+a*.44*s,Y+1.75*s,z-j*.07*s],[x+a*.18*s,Y+1.5*s,z-.75*s]],.025*s);curve(l,'bronze',[[x,Y+1.85*s,z+.5*s],[x,Y+2.4*s,z+.58*s],[x,Y+2.9*s,z+.32*s],[x,Y+3.3*s,z+.58*s]],.10*s);ell(l,'bronze',x,Y+3.3*s,z+.62*s,.19*s,.21*s,.25*s);rod(l,'oldgold',[x,Y+3.3*s,z+.8*s],[x,Y+3.26*s,z+1.3*s],.045*s);for(let a of [-1,1])ell(l,'ink',x+a*.17*s,Y+3.37*s,z+.7*s,.035*s,.035*s,.035*s);};
  const turtle=(l,x,yy,z,s=1)=>{pedestal(l,x,yy,z,2.4*s,2.8*s);let Y=yy+1.1*s;ell(l,'bronze',x,Y+.32*s,z,1.1*s,.66*s,1.35*s);for(let i=0;i<7;i++){let a=i*Math.PI/3;curve(l,'oldgold',[[x+.28*s*Math.cos(a),Y+.96*s,z+.35*s*Math.sin(a)],[x+.6*s*Math.cos(a),Y+.86*s,z+.75*s*Math.sin(a)],[x+1.01*s*Math.cos(a),Y+.45*s,z+1.23*s*Math.sin(a)]],.025*s);}for(let xx of [-1,1])for(let zz of [-1,1]){ell(l,'bronze',x+xx*.83*s,Y-.05*s,z+zz*.8*s,.35*s,.22*s,.42*s);for(let j=0;j<3;j++)rod(l,'oldgold',[x+(xx*.83+(j-1)*.13)*s,Y-.15*s,z+zz*.9*s],[x+(xx*.83+(j-1)*.13)*s,Y-.18*s,z+zz*1.2*s],.035*s);}curve(l,'bronze',[[x,Y+.1*s,z+1*s],[x,Y+.5*s,z+1.5*s],[x,Y+.9*s,z+1.6*s]],.22*s);ell(l,'bronze',x,Y+1*s,z+1.7*s,.32*s,.27*s,.4*s);for(let a of [-1,1])ell(l,'ink',x+a*.27*s,Y+1.09*s,z+1.82*s,.035*s,.045*s,.04*s);};
  const lion=(l,x,yy,z,s=1,m='bronze')=>{pedestal(l,x,yy,z,2.4*s,2.6*s);let Y=yy+.95*s;ell(l,m,x,Y+1.2*s,z,.72*s,1.15*s,.65*s);for(let a of [-1,1]){ell(l,m,x+a*.55*s,Y+.55*s,z-.25*s,.5*s,.6*s,.55*s);rod(l,m,[x+a*.42*s,Y+1.4*s,z+.45*s],[x+a*.48*s,Y+.2*s,z+.65*s],.23*s);ell(l,m,x+a*.48*s,Y+.15*s,z+.83*s,.32*s,.17*s,.44*s);for(let j=-1;j<=1;j++)ell(l,m,x+(a*.48+j*.16)*s,Y+.16*s,z+1.16*s,.05*s,.07*s,.13*s);}ell(l,m,x,Y+2.2*s,z+.16*s,.78*s,.8*s,.72*s);for(let i=0;i<42;i++){const a=i*Math.PI*2/42;ell(l,m,x+.72*s*Math.cos(a),Y+2.25*s+.72*s*Math.sin(a),z+.39*s,.085*s,.09*s,.10*s);}ell(l,m,x,Y+2.06*s,z+.79*s,.49*s,.24*s,.22*s);ell(l,'ink',x,Y+2.1*s,z+.98*s,.23*s,.035*s,.04*s);for(let a of [-1,1]){ell(l,'ink',x+a*.29*s,Y+2.43*s,z+.78*s,.055*s,.035*s,.03*s);curve(l,m,[[x+a*.15*s,Y+2.57*s,z+.79*s],[x+a*.3*s,Y+2.62*s,z+.8*s],[x+a*.46*s,Y+2.55*s,z+.74*s]],.07*s);}curve(l,m,[[x,Y+.8*s,z-.55*s],[x+.8*s,Y+1.4*s,z-.8*s],[x+.8*s,Y+1.9*s,z-.3*s]],.12*s);};
  // Eaves: individually modelled end caps and rafters, no external texture requests.
  for(const side of [-1,1])for(let i=0;i<=Math.ceil(w/.48);i++){const x=-w/2+i*w/Math.ceil(w/.48),z=side*(d/2+1.55);rod(roof,'gold',[x,top+1.48,z],[x,top+1.48,z-side*.55],.11);ell(roof,'oldgold',x,top+1.48,z+side*.04,.12,.12,.045);rod(detail,'wood',[x,top+.8,side*(d/2+.8)],[x,top+.8,side*(d/2-1)],.065);}
  for(let i=0;i<=b.bays;i++)for(let s of [-1,1]){let x=-w/2+i*w/b.bays,z=s*d/2;cyl(detail,'stone',x,y+.18,z,.62,.15);cyl(detail,'stone',x,y+.35,z,.47,.13);for(let level=0;level<3;level++)for(let a of [-1,1]){curve(detail,'teal',[[x,top+.1+level*.33,z],[x+a*(.6+level*.22),top+level*.33,z],[x+a*(.85+level*.22),top+.24+level*.33,z]],.08);}}
  focus('eaves',w*.27,top+.6,d/2+1,18,1.35,.32);
  // Carved seat legs and curled arm terminals; ornament is an interpretive pattern.
  if(['throne','chamber','seals'].includes(b.kind)){
   const z=-d*.16;for(let s of [-1,1]){curve(sculpt,'gold',[[s*1.45,y+1.8,z+.8],[s*1.65,y+2.15,z+.6],[s*1.45,y+2.4,z+.4],[s*1.28,y+2.2,z+.53]],.11);for(let zz of [-.7,.7])curve(sculpt,'oldgold',[[s*1.15,y+1.5,z+zz],[s*1.32,y+1,z+zz],[s*1.05,y+.7,z+zz]],.12);}
   for(let i=-3;i<=3;i++)for(let k=0;k<3;k++){let x=i*1.14,yy=y+2.2+k*1.45;curve(sculpt,'gold',[[x-.35,yy,z-2.38],[x,yy+.3,z-2.3],[x+.35,yy,z-2.38],[x,yy-.3,z-2.3],[x-.35,yy,z-2.38]],.04);}
  }
  // Annex shells have individual colonnades, tile eaves and named plaques.
  const pavilion=(name,x,z,pw,pd,ph,bays=5,turn=0,two=false,material='red')=>{
   const l='annex-'+name;layer(l,name+'：外围形制示意；内部未作专项复原。',true);
   box(l,'stone',0,.45,0,pw+2,.9,pd+2);
   const floors=two?2:1;
   for(let level=0;level<floors;level++){let yy=.9+level*ph;box(l,material,0,yy+ph*.42,-pd*.38,pw*.95,ph*.84,.35);for(let ss of [-1,1])box(l,material,ss*pw*.47,yy+ph*.42,0,.25,ph*.84,pd*.77);for(let i=0;i<=bays;i++)for(let s of [-1,1])cyl(l,material,-pw/2+i*pw/bays,yy+ph/2,s*pd/2,.22,ph);box(l,'teal',0,yy+ph,pd/2,pw,.45,.38);for(let i=0;i<bays;i++){let xx=-pw/2+(i+.5)*pw/bays;box(l,'paper',xx,yy+ph*.52,pd*.27,pw/bays-.35,ph*.48,.15);box(l,material,xx,yy+ph*.17,pd*.27,pw/bays-.35,ph*.31,.15);for(let k=-1;k<=1;k++)box(l,material,xx+k*pw/bays*.23,yy+ph*.52,pd*.29,.06,ph*.48,.08);}const verts=[],rh=pd*.34,R=pw*.32;for(let f=0;f<4;f++){let corners=[[-pw/2-1,-pd/2-1],[pw/2+1,-pd/2-1],[pw/2+1,pd/2+1],[-pw/2-1,pd/2+1]],peaks=[[-R,0],[R,0],[R,0],[-R,0]],a=corners[f],bb=corners[(f+1)%4],p=peaks[f],q=peaks[(f+1)%4];for(let j=0;j<8;j++){let t=j/8,u=(j+1)/8;const pos=(c,pp,t)=>[c[0]*(1-t)+pp[0]*t,yy+ph+.5+rh*t*t,c[1]*(1-t)+pp[1]*t];let A=pos(a,p,t),B=pos(bb,q,t),C=pos(bb,q,u),D=pos(a,p,u);verts.push(...A,...B,...C,...A,...C,...D);}}let g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));g.setAttribute('uv',new T.Float32BufferAttribute(verts.flatMap((_,i)=>i%3===0?[verts[i]/5,verts[i+2]/5]:[]),2));g.computeVertexNormals();v.groups[l].add(new T.Mesh(g,mats.tile));for(let i=0;i<Math.ceil(pw/.55);i++)for(let s of [-1,1])rod(l,'gold',[-pw/2+i*.55,yy+ph+.5,s*(pd/2+1)],[-pw/2+i*.55,yy+ph+.5,s*(pd/2+.5)],.09);}
   const c=document.createElement('canvas');c.width=512;c.height=128;let ctx=c.getContext('2d');ctx.fillStyle='#17312b';ctx.fillRect(0,0,512,128);ctx.strokeStyle='#cfac62';ctx.lineWidth=8;ctx.strokeRect(5,5,502,118);ctx.fillStyle='#f2d38e';ctx.font='64px "Songti SC",serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(name,256,66);let tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;mats[l]=new T.MeshStandardMaterial({map:tx});box(l,l,0,ph*.86,pd/2+.25,Math.min(5,pw*.45),1.25,.12);
   v.groups[l].position.set(x,0,z);v.groups[l].rotation.y=turn;
  };
  // Terrace accessories and pavilions are visible in the courtyard view only.
  const terrace=(ww,dd)=>{box(court,'paving',0,-.15,dd*.12,ww,.25,dd);};
  if(b.id==='taihe'){
   terrace(155,145);box(court,'stone',0,y/2,d/2+7,w+12,y,20);for(let i=0;i<Math.ceil(y/.4);i++){const hh=y-i*.4;box(court,'stone',0,hh/2,d/2+17+.325+i*.65,w*.28,Math.max(.15,hh),.65);}
   for(let s of [-1,1]){turtle(court,s*24,y,d/2+7,1.0);crane(court,s*19,y,d/2+7,1.05);for(let j=0;j<9;j++)urn(court,s*(8+j*2.8),y+.6,d/2+14,.65);pavilion(s>0?'体仁阁':'弘义阁',s*61,42,42,14,8,7,s>0?-Math.PI/2:Math.PI/2,true);}
   pedestal(court,13,y,d/2+8,2.2,2.2);let dial=lathe(court,'ivory',13,y+2,d/2+8,[[0,0],[1,0],[1,.12],[0,.12]]);dial.rotation.x=.7;rod(court,'bronze',[13,y+2,d/2+8],[13,y+3.1,d/2+8.8],.04);
   pedestal(court,-13,y,d/2+8,2.2,2.2);lathe(court,'oldgold',-13,y+.95,d/2+8,[[.65,0],[.65,.4],[.5,.5],[.5,1.5],[.6,1.6]]);for(let s of [-1,1])cyl(court,'oldgold',-13+s*.8,y+1.85,d/2+8,.28,.65);
   focus('terrace',20,y+2,d/2+9,24,1.15,.1);focus('annex',0,9,22,210,.78,.35);
  }
  if(['wenhua','wuying'].includes(b.id)){
   terrace(90,115);let names=b.id==='wuying'?['凝道殿','焕章殿','敬思殿']:['本仁殿','集义殿','文华后殿'];
   pavilion(names[0],33,17,26,9,6,5,-Math.PI/2);pavilion(names[1],-33,17,26,9,6,5,Math.PI/2);pavilion(names[2],0,-37,29,16,7,5);pavilion('连接穿廊',0,-19.5,19,5,4,5,Math.PI/2);focus('annex',0,5,-3,137,.7,.45);
  }
  if(b.id==='taihemen'){
   terrace(w+30,65);for(let s of [-1,1]){lion(court,s*12,0,d/2+12,1.4);for(let j=0;j<2;j++)urn(court,s*(19+j*5),.7,d/2+8,1.1);}focus('lions',12,2.8,d/2+12,14,1.35,.35);
  }
  // Sculpted figures: lathed robe, sleeve volume, carved folds, facial features and hair.
  const figure=(x,z,scale=1,seated=true,role=0)=>{
   const l=sculpt,Y=y+.7,S=scale;
   const E=(m,a,bb,c,rx,ry,rz)=>ell(l,m,x+a*S,Y+bb*S,z+c*S,rx*S,ry*S,rz*S);
   pedestal(l,x,y,z,2.2*S,1.8*S);
   lathe(l,'oldgold',x,Y+.35*S,z,seated?[[.85,0],[.91,.2],[.85,.6],[.68,.95],[.48,1.1],[.55,1.5],[.65,1.9],[.39,2.2]]:[[.48,0],[.58,.2],[.43,1.5],[.4,1.8],[.6,2.15],[.32,2.35]],S);
   const head=seated?2.6:2.72;
   E('oldgold',0,head,0,.34,.46,.32);E('ink',0,head+.1,-.17,.36,.4,.2);
   for(let a of [-1,1]){E('oldgold',a*.34,head-.02,0,.09,.16,.07);E('ink',a*.14,head+.07,.294,.055,.015,.012);E('oldgold',a*.13,head+.13,.295,.10,.021,.025);E('oldgold',a*.64,1.7,.1,.28,.55,.3);E('oldgold',a*.56,1.15,.46,.16,.12,.2);for(let j=0;j<4;j++)E('oldgold',a*.55+(j-1.5)*.045,1.13,.6,.025,.035,.09);E('oldgold',a*.38,.28,.72,.18,.12,.32);}
   E('oldgold',0,head,.33,.07,.13,.09);E('ink',0,head-.2,.3,.12,.018,.02);
   if(seated){for(let j=0;j<7;j++)curve(l,'ink',[[x+(j-3)*.055*S,Y+(head-.18)*S,z+.28*S],[x+(j-3)*.04*S,Y+(head-.48)*S,z+.37*S],[x+(j-3)*.025*S,Y+(head-.64)*S,z+.25*S]],.018*S);rod(l,'bronze',[x+.55*S,Y+1.15*S,z+.5*S],[x+.75*S,Y+.45*S,z+.6*S],.035*S);box(l,'gold',x+.55*S,Y+1.2*S,z+.5*S,.4*S,.05*S,.09*S);}
   else{E('gold',0,head+.43,0,.3,.13,.25);if(role>=2){box(l,'gold',x,Y+1.5*S,z+.4*S,.65*S,.55*S,.08*S);rod(l,'wood',[x+.8*S,Y+.3*S,z+.2*S],[x+.8*S,Y+3.2*S,z+.2*S],.045*S);}else for(let a of [-1,1])E('ink',a*.29,head+.25,-.1,.15,.16,.12);}
   for(let j=-5;j<=5;j++){const a=j*.13;curve(l,'oldgold',[[x+a*.75*S,Y+1.85*S,z+.44*S],[x+a*S,Y+1.2*S,z+.53*S],[x+a*1.2*S,Y+.5*S,z+.7*S]],.012*S);}
  };
  if(b.id==='qinan'){
   // Replace the old generic mannequin and slab with three separate shrines.
   v.groups.furniture.visible=false;v.stores.furniture.clear();v.groups['detail-altar'].clear();v.stores['detail-altar'].clear();
   for(const x of [-7,0,7]){box(sculpt,'red',x,y+3.4,-6.6,5.5,6.8,.35);for(let s of [-1,1]){cyl(sculpt,'oldgold',x+s*2.6,y+3.4,-5.5,.16,6.8);for(let j=0;j<11;j++)ell(sculpt,'gold',x+s*2.6,y+.5+j*.55,-5.32,.2,.08,.06);}box(sculpt,'gold',x,y+6.9,-5.6,5.8,.3,2.5);for(let j=0;j<16;j++)ell(sculpt,'oldgold',x-2.6+j*.35,y+7.13+Math.sin(j/15*Math.PI)*.35,-4.7,.19,.22,.1);figure(x,-5,1.65,true);}
   for(let i=0;i<4;i++)figure([-8.5,-3.8,3.8,8.5][i],-1,1.05,false,i);
   box(sculpt,'wood',0,y+1.7,2,12,.3,1.7);for(let x of [-5,5])for(let z of [1.4,2.6])box(sculpt,'red',x,y+.8,z,.18,1.6,.18);urn(sculpt,0,y+2.1,2,.75);for(let x of [-4,-2,2,4]){lathe(sculpt,'gold',x,y+1.9,2,[[.25,0],[.3,.1],[.09,.25],[.09,.65],[.26,.7]],.8);cyl(sculpt,'red',x,y+2.65,2,.07,.45);}
   terrace(62,67);const gate=layer('annex-tianyi','天一门：青砖券门的简化形制，非测绘。',true);const shape=new T.Shape();shape.moveTo(-5,0);shape.lineTo(5,0);shape.lineTo(5,6);shape.lineTo(-5,6);shape.closePath();const hole=new T.Path();hole.moveTo(-1.6,0);hole.lineTo(1.6,0);hole.lineTo(1.6,3);hole.absarc(0,3,1.6,0,Math.PI,false);hole.lineTo(-1.6,0);shape.holes.push(hole);const wall=new T.Mesh(new T.ExtrudeGeometry(shape,{depth:1.4,bevelEnabled:false}),mats.paving);wall.position.z=26.3;wall.castShadow=true;v.groups[gate].add(wall);box(gate,'stone',0,6.1,27,10.6,.3,1.9);for(let ss of [-1,1]){box(gate,'red',ss*.78,1.6,27,1.48,3.2,.16);for(let i=0;i<7;i++)for(let j=0;j<4;j++)ell(gate,'oldgold',ss*(.2+j*.36),.35+i*.4,27.12,.045,.045,.035);} for(let s of [-1,1])pavilion('香亭'+(s>0?'东':'西'),s*18,13,5,5,3.4,1);pavilion('焚帛炉',19,25,3,3,2.3,1);for(let s of [-1,1])box(court,'red',s*26,2.1,8,.7,4.2,44);box(court,'red',-15,2.1,27,22,4.2,.7);box(court,'red',15,2.1,27,22,4.2,.7);
   focus('statues',0,y+3.8,-5,27,1.45,0);focus('attendants',4,y+2.5,-1,11,1.4,.25);focus('annex',0,4,7,94,.72,.45);
  }
  if(b.id==='jiaotai'){
   const l=layer('detail-clockcase','钟柜与宝盝细部：沿用西钟东漏布局，雕饰为示意。'),x=-w*.31,z=d*.06;
   for(let ss of [-1,1]){for(let j=0;j<7;j++)curve(l,'gold',[[x+ss*.78,y+.4+j*.5,z+.6],[x+ss*.67,y+.55+j*.5,z+.64],[x+ss*.78,y+.7+j*.5,z+.6]],.025);}
   for(let i=0;i<25;i++){const xx=(i%5-2)*.78,zz=d*.24+(Math.floor(i/5)-2)*.57;curve(l,'oldgold',[[xx-.13,y+2.15,zz],[xx-.08,y+2.28,zz],[xx+.08,y+2.28,zz],[xx+.13,y+2.15,zz]],.035);}
  }
  if(b.id==='kunning'){
   const l=layer('detail-textiles','东暖阁帐幔褶皱与床沿：按现有分区细化，纹样非原物复制。');
   for(const x of [w*2/9,w/3])for(const ss of [-1,1]){for(let j=0;j<12;j++){let zz=-d*.42+j*d*.22/11;curve(l,'bed',[[x+ss*(w/18-.18),y+4.5,zz],[x+ss*(w/18-.1),y+3.2,zz+.05],[x+ss*(w/18-.18),y+1.9,zz]],.045);}for(let j=0;j<10;j++){const xx=x-w/18+.18+j*(w/9-.36)/9;ell(l,'oldgold',xx,y+4.45,-d*.16,.055,.09,.045);}}
  }
  if(b.id==='qianqing'){
   const l=layer('detail-loftscreen','暖阁仙楼栏板：隔扇与栏板纹饰采用木构类型示意。');
   for(const ss of [-1,1])for(let j=0;j<7;j++){const xx=ss*w*.37-w*.065+j*w*.13/6,yy=y+h*.64+.62,z=-d*.17;curve(l,'gold',[[xx-.28,yy,z],[xx,yy+.28,z],[xx+.28,yy,z],[xx,yy-.28,z],[xx-.28,yy,z]],.025);}
  }
  // Every palace gains base mouldings and balustrades where there is supporting evidence.
  if(['taihe','zhonghe','baohe','qinan','wuying'].includes(b.id)){
   const l=layer('detail-stone','台基石作：望柱、栏板与线脚为类型示意。');
   for(let s of [-1,1])for(let i=0;i<Math.ceil((w+6)/3);i++){let x=-(w+6)/2+i*3;if(Math.abs(x)<w*.16)continue;box(l,'stone',x,y+.65,s*(d/2+3),.22,1.3,.22);ell(l,'stone',x,y+1.38,s*(d/2+3),.2,.23,.2);if(x+3<(w+6)/2){box(l,'stone',x+1.5,y+.78,s*(d/2+3),2.75,.65,.16);rod(l,'stone',[x,y+1.1,s*(d/2+3)],[x+3,y+1.1,s*(d/2+3)],.095);}}
  }
  v.hasCourt=!!additions[b.id]?.some(f=>['annex','terrace','lions'].includes(f[1]));
  focus('courtyard',0,6,b.id==='taihe'?22:5,b.id==='taihe'?210:b.id==='qinan'?94:Math.max(w,d)*3.6,.75,.4);
 }};
})();
