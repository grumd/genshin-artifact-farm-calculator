(this["webpackJsonpgenshin-artifact-farm-calculator"]=this["webpackJsonpgenshin-artifact-farm-calculator"]||[]).push([[0],{264:function(t,e,a){},408:function(t,e,a){"use strict";a.r(e);var c,n,j,b=a(1),O=a.n(b),r=a(100),l=a.n(r),i=a(444),o=(a(264),a(80)),s=a(81),u=a(2),d=a(22),h=a(30),F=a(5),E=a(427),f=a(428),g=a(429),x=a(441),D=a(432),m=a(445),C=a(104),p=a(439),P=a(442),A=a(431),H=a(440),y=a(245),v=a(239),T=a(221),R=a(40),K=a.n(R);!function(t){t.Flower="Flower of Life",t.Plume="Plume of Death",t.Sands="Sands of Eon",t.Goblet="Goblet of Eonothem",t.Circlet="Circlet of Logos"}(c||(c={})),function(t){t.HPFlat="HP",t.HP="HP%",t.ATKFlat="ATK",t.ATK="ATK%",t.DEFFlat="DEF",t.DEF="DEF%",t.CR="CRIT Rate%",t.CD="CRIT DMG%",t.ER="Energy Recharge%",t.EM="Elemental Mastery",t.HB="Healing Bonus%",t.Pyro="Pyro DMG Bonus%",t.Electro="Electro DMG Bonus%",t.Cryo="Cryo DMG Bonus%",t.Hydro="Hydro DMG Bonus%",t.Anemo="Anemo DMG Bonus%",t.Geo="Geo DMG Bonus%",t.Physical="Physical DMG Bonus%"}(n||(n={}));var S,M,w,G,k,B,W,L,I,z,N,V,Y,_,q,J,Q,U,X,Z,$,tt,et,at,ct,nt,jt,bt,Ot=[n.CR,n.CD,n.ATK,n.ATKFlat,n.HP,n.HPFlat,n.DEF,n.DEFFlat,n.ER,n.EM],rt=[n.HPFlat,n.ATKFlat,n.HP,n.ATK,n.DEF,n.ER,n.EM,n.CR,n.CD,n.HB,n.Pyro,n.Electro,n.Cryo,n.Hydro,n.Anemo,n.Geo,n.Physical],lt=(j={},Object(u.a)(j,c.Flower,[n.HPFlat]),Object(u.a)(j,c.Plume,[n.ATKFlat]),Object(u.a)(j,c.Sands,[n.HP,n.ATK,n.DEF,n.ER,n.EM]),Object(u.a)(j,c.Goblet,[n.HP,n.ATK,n.DEF,n.Pyro,n.Electro,n.Cryo,n.Hydro,n.Anemo,n.Geo,n.Physical,n.EM]),Object(u.a)(j,c.Circlet,[n.HP,n.ATK,n.DEF,n.CR,n.CD,n.HB,n.EM]),j),it=rt.reduce((function(t,e){return Object(h.a)(Object(h.a)({},t),{},Object(u.a)({},e,K.a.without([e],Ot)))}),{}),ot=a(114),st=(G={},Object(u.a)(G,c.Flower,Object(u.a)({},n.HPFlat,1)),Object(u.a)(G,c.Plume,Object(u.a)({},n.ATKFlat,1)),Object(u.a)(G,c.Sands,(S={},Object(u.a)(S,n.HP,.2668),Object(u.a)(S,n.ATK,.2666),Object(u.a)(S,n.DEF,.2666),Object(u.a)(S,n.ER,.1),Object(u.a)(S,n.EM,.1),S)),Object(u.a)(G,c.Goblet,(M={},Object(u.a)(M,n.HP,.2125),Object(u.a)(M,n.ATK,.2125),Object(u.a)(M,n.DEF,.2),Object(u.a)(M,n.Pyro,.05),Object(u.a)(M,n.Electro,.05),Object(u.a)(M,n.Cryo,.05),Object(u.a)(M,n.Hydro,.05),Object(u.a)(M,n.Anemo,.05),Object(u.a)(M,n.Geo,.05),Object(u.a)(M,n.Physical,.05),Object(u.a)(M,n.EM,.025),M)),Object(u.a)(G,c.Circlet,(w={},Object(u.a)(w,n.HP,.22),Object(u.a)(w,n.ATK,.22),Object(u.a)(w,n.DEF,.22),Object(u.a)(w,n.CR,.1),Object(u.a)(w,n.CD,.1),Object(u.a)(w,n.HB,.1),Object(u.a)(w,n.EM,.04),w)),G),ut=(k={},Object(u.a)(k,n.HPFlat,.1364),Object(u.a)(k,n.ATKFlat,.1364),Object(u.a)(k,n.DEFFlat,.1364),Object(u.a)(k,n.HP,.0909),Object(u.a)(k,n.ATK,.0909),Object(u.a)(k,n.DEF,.0909),Object(u.a)(k,n.ER,.0909),Object(u.a)(k,n.EM,.0909),Object(u.a)(k,n.CR,.0682),Object(u.a)(k,n.CD,.0682),k),dt=(nt={},Object(u.a)(nt,c.Flower,Object(u.a)({},n.HPFlat,(B={},Object(u.a)(B,n.ATKFlat,.1579),Object(u.a)(B,n.DEFFlat,.1579),Object(u.a)(B,n.HP,.1053),Object(u.a)(B,n.ATK,.1053),Object(u.a)(B,n.DEF,.1053),Object(u.a)(B,n.ER,.1053),Object(u.a)(B,n.EM,.1053),Object(u.a)(B,n.CR,.0789),Object(u.a)(B,n.CD,.0789),B))),Object(u.a)(nt,c.Plume,Object(u.a)({},n.ATKFlat,(W={},Object(u.a)(W,n.HPFlat,.1579),Object(u.a)(W,n.DEFFlat,.1579),Object(u.a)(W,n.HP,.1053),Object(u.a)(W,n.ATK,.1053),Object(u.a)(W,n.DEF,.1053),Object(u.a)(W,n.ER,.1053),Object(u.a)(W,n.EM,.1053),Object(u.a)(W,n.CR,.0789),Object(u.a)(W,n.CD,.0789),W))),Object(u.a)(nt,c.Sands,(Y={},Object(u.a)(Y,n.HP,(L={},Object(u.a)(L,n.HPFlat,.15),Object(u.a)(L,n.ATKFlat,.15),Object(u.a)(L,n.DEFFlat,.15),Object(u.a)(L,n.ATK,.1),Object(u.a)(L,n.DEF,.1),Object(u.a)(L,n.ER,.1),Object(u.a)(L,n.EM,.1),Object(u.a)(L,n.CR,.075),Object(u.a)(L,n.CD,.075),L)),Object(u.a)(Y,n.ATK,(I={},Object(u.a)(I,n.HPFlat,.15),Object(u.a)(I,n.ATKFlat,.15),Object(u.a)(I,n.DEFFlat,.15),Object(u.a)(I,n.HP,.1),Object(u.a)(I,n.DEF,.1),Object(u.a)(I,n.ER,.1),Object(u.a)(I,n.EM,.1),Object(u.a)(I,n.CR,.075),Object(u.a)(I,n.CD,.075),I)),Object(u.a)(Y,n.DEF,(z={},Object(u.a)(z,n.HPFlat,.15),Object(u.a)(z,n.ATKFlat,.15),Object(u.a)(z,n.DEFFlat,.15),Object(u.a)(z,n.HP,.1),Object(u.a)(z,n.ATK,.1),Object(u.a)(z,n.ER,.1),Object(u.a)(z,n.EM,.1),Object(u.a)(z,n.CR,.075),Object(u.a)(z,n.CD,.075),z)),Object(u.a)(Y,n.ER,(N={},Object(u.a)(N,n.HPFlat,.15),Object(u.a)(N,n.ATKFlat,.15),Object(u.a)(N,n.DEFFlat,.15),Object(u.a)(N,n.HP,.1),Object(u.a)(N,n.ATK,.1),Object(u.a)(N,n.DEF,.1),Object(u.a)(N,n.EM,.1),Object(u.a)(N,n.CR,.075),Object(u.a)(N,n.CD,.075),N)),Object(u.a)(Y,n.EM,(V={},Object(u.a)(V,n.HPFlat,.15),Object(u.a)(V,n.ATKFlat,.15),Object(u.a)(V,n.DEFFlat,.15),Object(u.a)(V,n.HP,.1),Object(u.a)(V,n.ATK,.1),Object(u.a)(V,n.DEF,.1),Object(u.a)(V,n.ER,.1),Object(u.a)(V,n.CR,.075),Object(u.a)(V,n.CD,.075),V)),Y)),Object(u.a)(nt,c.Goblet,(U={},Object(u.a)(U,n.HP,(_={},Object(u.a)(_,n.HPFlat,.15),Object(u.a)(_,n.ATKFlat,.15),Object(u.a)(_,n.DEFFlat,.15),Object(u.a)(_,n.DEF,.1),Object(u.a)(_,n.ATK,.1),Object(u.a)(_,n.ER,.1),Object(u.a)(_,n.EM,.1),Object(u.a)(_,n.CR,.075),Object(u.a)(_,n.CD,.075),_)),Object(u.a)(U,n.ATK,(q={},Object(u.a)(q,n.HPFlat,.15),Object(u.a)(q,n.ATKFlat,.15),Object(u.a)(q,n.DEFFlat,.15),Object(u.a)(q,n.DEF,.1),Object(u.a)(q,n.HP,.1),Object(u.a)(q,n.ER,.1),Object(u.a)(q,n.EM,.1),Object(u.a)(q,n.CR,.075),Object(u.a)(q,n.CD,.075),q)),Object(u.a)(U,n.DEF,(J={},Object(u.a)(J,n.HPFlat,.15),Object(u.a)(J,n.ATKFlat,.15),Object(u.a)(J,n.DEFFlat,.15),Object(u.a)(J,n.ATK,.1),Object(u.a)(J,n.HP,.1),Object(u.a)(J,n.ER,.1),Object(u.a)(J,n.EM,.1),Object(u.a)(J,n.CR,.075),Object(u.a)(J,n.CD,.075),J)),Object(u.a)(U,n.Pyro,ut),Object(u.a)(U,n.Electro,ut),Object(u.a)(U,n.Cryo,ut),Object(u.a)(U,n.Hydro,ut),Object(u.a)(U,n.Anemo,ut),Object(u.a)(U,n.Geo,ut),Object(u.a)(U,n.Physical,ut),Object(u.a)(U,n.EM,(Q={},Object(u.a)(Q,n.HPFlat,.15),Object(u.a)(Q,n.ATKFlat,.15),Object(u.a)(Q,n.DEFFlat,.15),Object(u.a)(Q,n.ATK,.1),Object(u.a)(Q,n.HP,.1),Object(u.a)(Q,n.DEF,.1),Object(u.a)(Q,n.ER,.1),Object(u.a)(Q,n.CR,.075),Object(u.a)(Q,n.CD,.075),Q)),U)),Object(u.a)(nt,c.Circlet,(ct={},Object(u.a)(ct,n.HP,(X={},Object(u.a)(X,n.HPFlat,.15),Object(u.a)(X,n.ATKFlat,.15),Object(u.a)(X,n.DEFFlat,.15),Object(u.a)(X,n.DEF,.1),Object(u.a)(X,n.ATK,.1),Object(u.a)(X,n.ER,.1),Object(u.a)(X,n.EM,.1),Object(u.a)(X,n.CR,.075),Object(u.a)(X,n.CD,.075),X)),Object(u.a)(ct,n.ATK,(Z={},Object(u.a)(Z,n.HPFlat,.15),Object(u.a)(Z,n.ATKFlat,.15),Object(u.a)(Z,n.DEFFlat,.15),Object(u.a)(Z,n.DEF,.1),Object(u.a)(Z,n.HP,.1),Object(u.a)(Z,n.ER,.1),Object(u.a)(Z,n.EM,.1),Object(u.a)(Z,n.CR,.075),Object(u.a)(Z,n.CD,.075),Z)),Object(u.a)(ct,n.DEF,($={},Object(u.a)($,n.HPFlat,.15),Object(u.a)($,n.ATKFlat,.15),Object(u.a)($,n.DEFFlat,.15),Object(u.a)($,n.ATK,.1),Object(u.a)($,n.HP,.1),Object(u.a)($,n.ER,.1),Object(u.a)($,n.EM,.1),Object(u.a)($,n.CR,.075),Object(u.a)($,n.CD,.075),$)),Object(u.a)(ct,n.CR,(tt={},Object(u.a)(tt,n.HPFlat,.1463),Object(u.a)(tt,n.ATKFlat,.1463),Object(u.a)(tt,n.DEFFlat,.1463),Object(u.a)(tt,n.ATK,.0976),Object(u.a)(tt,n.HP,.0976),Object(u.a)(tt,n.DEF,.0976),Object(u.a)(tt,n.ER,.0976),Object(u.a)(tt,n.EM,.0976),Object(u.a)(tt,n.CD,.0732),tt)),Object(u.a)(ct,n.CD,(et={},Object(u.a)(et,n.HPFlat,.1463),Object(u.a)(et,n.ATKFlat,.1463),Object(u.a)(et,n.DEFFlat,.1463),Object(u.a)(et,n.ATK,.0976),Object(u.a)(et,n.HP,.0976),Object(u.a)(et,n.DEF,.0976),Object(u.a)(et,n.ER,.0976),Object(u.a)(et,n.EM,.0976),Object(u.a)(et,n.CR,.0732),et)),Object(u.a)(ct,n.HB,ut),Object(u.a)(ct,n.EM,(at={},Object(u.a)(at,n.HPFlat,.15),Object(u.a)(at,n.ATKFlat,.15),Object(u.a)(at,n.DEFFlat,.15),Object(u.a)(at,n.ATK,.1),Object(u.a)(at,n.HP,.1),Object(u.a)(at,n.DEF,.1),Object(u.a)(at,n.ER,.1),Object(u.a)(at,n.CR,.075),Object(u.a)(at,n.CD,.075),at)),ct)),jt={},Object(u.a)(jt,n.HPFlat,[209,239,269,299]),Object(u.a)(jt,n.HP,[4.1,4.7,5.3,5.8]),Object(u.a)(jt,n.ATKFlat,[14,16,18,19]),Object(u.a)(jt,n.ATK,[4.1,4.7,5.3,5.8]),Object(u.a)(jt,n.DEFFlat,[16,19,21,23]),Object(u.a)(jt,n.DEF,[5.1,5.8,6.6,7.3]),Object(u.a)(jt,n.CR,[2.7,3.1,3.5,3.9]),Object(u.a)(jt,n.CD,[5.4,6.2,7,7.8]),Object(u.a)(jt,n.ER,[4.5,5.2,5.8,6.5]),Object(u.a)(jt,n.EM,[16,19,21,23]),jt),ht=a(246),Ft=a(425),Et=a(6),ft=["onChange","value","items"],gt=s.a.option(bt||(bt=Object(o.a)(["\n  color: black;\n  background: lightgrey;\n"])));function xt(t){var e=t.onChange,a=t.value,c=t.items,n=Object(ht.a)(t,ft),j=Object(b.useCallback)((function(t){var a=t.target.value;e(a)}),[e]);return Object(Et.jsx)(Ft.a,Object(h.a)(Object(h.a)({onChange:j,value:a},n),{},{children:c.map((function(t){return Object(Et.jsx)(gt,{value:t.value,children:t.label},t.value)}))}))}var Dt,mt,Ct,pt=function(t){if(K.a.isNil(t))return"";if(0===t)return"0%";for(var e=0;e<12&&!(100*t*Math.pow(10,e)>1);)e++;return(100*t).toFixed(e+2)+"%"},Pt=a(433),At=a(434),Ht=a(247),yt=a(438),vt=a(237),Tt=a(238),Rt=a(115),Kt=K.a.values(c).map((function(t){return{label:t,value:t}})),St=s.a.div(Dt||(Dt=Object(o.a)(["\n  border-radius: 5px;\n  background: #313743;\n  padding: 5px 10px;\n  border: 1px solid white;\n"]))),Mt=s.a.div(mt||(mt=Object(o.a)(["\n  cursor: pointer;\n"]))),wt=Object(b.memo)((function(t){var e=t.chance,a=t.chartData;return Object(Et.jsxs)(E.a,{margin:1,maxW:"95%",width:"lg",borderWidth:"1px",borderRadius:"lg",padding:2,paddingLeft:4,children:[Object(Et.jsxs)(f.a,{alignItems:"baseline",flexFlow:"row nowrap",children:[Object(Et.jsx)(g.a,{children:"Chance in one run (20 resin):"}),Object(Et.jsx)(g.a,{paddingLeft:2,paddingRight:2,fontSize:"large",fontWeight:"bold",children:pt(e)}),Object(Et.jsxs)(x.a,{children:[Object(Et.jsx)(x.f,{children:Object(Et.jsx)(Mt,{children:Object(Et.jsx)(T.a,{})})}),Object(Et.jsxs)(x.e,{color:"black",width:"70%",children:[Object(Et.jsx)(x.b,{}),Object(Et.jsx)(x.d,{}),Object(Et.jsxs)(x.c,{children:[Object(Et.jsx)(g.a,{fontWeight:"bold",marginRight:6,children:"This calculation assumes the following:"}),Object(Et.jsx)(g.a,{children:"5* artifacts upgraded to +20;"}),Object(Et.jsxs)(g.a,{children:["1.07 artifacts per run on average;"," ",Object(Et.jsx)(D.a,{color:"teal",isExternal:!0,href:"https://docs.google.com/spreadsheets/d/1RcuniapqS6nOP05OCH0ui10Vo3bWu0AvFbhgcHzTybY/edit",children:"Source"})]}),Object(Et.jsx)(g.a,{children:"50% chance to get one of the two sets;"}),Object(Et.jsx)(g.a,{children:"20% chance to get the correct artifact type;"}),Object(Et.jsxs)(g.a,{children:["Chance to get the correct main stat and sub-stats;"," ",Object(Et.jsx)(D.a,{color:"teal",isExternal:!0,href:"https://genshin-impact.fandom.com/wiki/Artifacts/Distribution",children:"Source 1"}),", ",Object(Et.jsx)(D.a,{color:"teal",isExternal:!0,href:"https://docs.google.com/spreadsheets/d/1sYQrV5Yp_QTVEKMLWquMu0mDgHhOO_Rh2LfcWdS_Eno/edit",children:"Source 2"})]}),Object(Et.jsx)(g.a,{marginTop:2,children:"Note: chance to get 4 initial sub-stats is assumed to be 25%."}),Object(Et.jsxs)(g.a,{children:["Contact me at"," ",Object(Et.jsx)(D.a,{color:"teal",isExternal:!0,href:"https://www.reddit.com/message/compose/?to=grumd",children:"/u/grumd"})," ","if you have more accurate information."]})]})]})]})]}),Object(Et.jsx)(g.a,{children:"Cumulative chance to get this artifact at least once:"}),e>0&&!K.a.isEmpty(a)&&Object(Et.jsx)(Pt.a,{width:"100%",aspect:2.5,children:Object(Et.jsxs)(At.a,{data:a,margin:{top:5,right:5,bottom:5,left:0},children:[Object(Et.jsx)("defs",{children:Object(Et.jsxs)("linearGradient",{id:"colorGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[Object(Et.jsx)("stop",{offset:"5%",stopColor:"#8884d8",stopOpacity:.8}),Object(Et.jsx)("stop",{offset:"95%",stopColor:"#8884d8",stopOpacity:0})]})}),Object(Et.jsx)(Ht.a,{fillOpacity:1,fill:"url(#colorGrad)",type:"monotone",dataKey:"chance",stroke:"#8884d8"}),Object(Et.jsx)(yt.a,{stroke:"#ccc",strokeDasharray:"5 5"}),Object(Et.jsx)(vt.a,{dataKey:"resin"}),Object(Et.jsx)(Tt.a,{domain:[0,1],tickFormatter:function(t){return(100*t).toFixed(0)+"%"}}),Object(Et.jsx)(Rt.a,{isAnimationActive:!1,content:function(t){var e,a=t.payload,c=null===a||void 0===a||null===(e=a[0])||void 0===e?void 0:e.payload;return c?Object(Et.jsxs)(St,{children:[Object(Et.jsxs)("div",{children:["Resin: ",c.resin]}),Object(Et.jsxs)("div",{children:["Days: ",c.resin/160]}),Object(Et.jsxs)("div",{children:["Chance: ",pt(c.chance)]})]}):null}})]})})]})}));function Gt(){var t=Object(b.useState)({type:c.Flower,subStats:[]}),e=Object(F.a)(t,2),a=e[0],n=e[1],j=Object(b.useState)(null),O=Object(F.a)(j,2),r=O[0],l=O[1],i=Object(b.useState)([]),o=Object(F.a)(i,2),s=o[0],x=o[1],D=lt[a.type].map((function(t){return{label:t,value:t}})),T=(a.mainStat?it[a.mainStat]:[]).filter((function(t){return!a.subStats.find((function(e){return Object(F.a)(e,1)[0]===t}))})).map((function(t){return{label:t,value:t}}));Object(b.useEffect)((function(){a.mainStat||n((function(t){return Object(h.a)(Object(h.a)({},t),{},{mainStat:D[0].value})}))}),[a.mainStat,D]);var R=function(t){return function(e){n((function(a){return Object(h.a)(Object(h.a)({},a),{},{subStats:a.subStats.map((function(a){return a[0]===t?[e,0]:a}))})}))}},S=function(t){return function(e,a){n((function(e){return Object(h.a)(Object(h.a)({},e),{},{subStats:e.subStats.map((function(e){return e[0]===t?[t,a]:e}))})}))}};return Object(Et.jsxs)(f.a,{flexFlow:"column wrap",width:"100%",alignItems:"center",children:[Object(Et.jsx)(E.a,{margin:1,maxW:"95%",width:"lg",borderWidth:"1px",borderRadius:"lg",padding:2,children:Object(Et.jsxs)(m.b,{padding:"2",spacing:"4",children:[Object(Et.jsxs)(C.a,{id:"type",children:[Object(Et.jsx)(p.a,{children:"Artifact type:"}),Object(Et.jsx)(xt,{value:a.type,items:Kt,onChange:function(t){n({type:t,subStats:[]})}})]}),Object(Et.jsxs)(C.a,{id:"mainStat",children:[Object(Et.jsx)(p.a,{children:"Main stat:"}),Object(Et.jsx)(xt,{value:a.mainStat,items:D,onChange:function(t){n((function(e){return Object(h.a)(Object(h.a)({},e),{},{mainStat:t,subStats:[]})}))}})]}),Object(Et.jsxs)(C.a,{id:"subStat",children:[Object(Et.jsx)(p.a,{children:"Sub stats (optional):"}),Object(Et.jsxs)(m.b,{alignItems:"start",width:"100%",children:[a.subStats.map((function(t,e){var a=Object(F.a)(t,2),c=a[0],j=a[1];return Object(Et.jsxs)(m.a,{width:"100%",children:[Object(Et.jsx)(C.a,{id:"substat-".concat(e,"-name"),children:Object(Et.jsx)(xt,{value:c,items:[{label:c,value:c}].concat(Object(d.a)(T)),onChange:R(c)})}),Object(Et.jsx)(g.a,{fontWeight:"bold",fontSize:"large",children:">="}),Object(Et.jsx)(C.a,{id:"substat-".concat(e,"-value"),children:Object(Et.jsx)(P.a,{value:j,onChange:S(c),children:Object(Et.jsx)(P.b,{})})}),Object(Et.jsx)(A.a,{colorScheme:"blue",onClick:function(){return function(t){n((function(e){return Object(h.a)(Object(h.a)({},e),{},{subStats:e.subStats.filter((function(e){return e[0]!==t}))})}))}(c)}})]},"substat-".concat(e))})),Object(Et.jsx)(C.a,{children:K.a.keys(a.subStats).length<4&&Object(Et.jsx)(H.a,{color:"white",fontSize:"2xl",colorScheme:"purple","aria-label":"Calculate",onClick:function(){T.length&&n((function(t){return Object(h.a)(Object(h.a)({},t),{},{subStats:[].concat(Object(d.a)(t.subStats),[[T[0].value,0]])})}))},icon:Object(Et.jsx)(v.a,{})})})]})]}),Object(Et.jsx)(y.a,{disabled:!a.mainStat,colorScheme:"pink",onClick:function(){if(a.mainStat){for(var t=function(t){var e=t.type,a=t.mainStat,c=t.subStats,n=void 0===c?{}:c,j=1.07;j*=.5,j*=.2,j*=st[e][a];var b=K.a.keys(n);if(b.length>0){var O=it[a],r=new ot.b(O,4).toArray(),l=(K.a.countBy((function(t){return b.every((function(e){return t.includes(e)}))}))(r).true||0)/r.length;console.log("Getting initial substats that fit criteria",l),j*=l;for(var i=[],o=0;o<4;o++)for(var s=0;s<4;s++)i.push([s,o]);var u=new ot.b(i,4).toArray(),h=new ot.b(i,5).toArray(),E=new ot.a([0,1,2,3],b.length).toArray(),f=function(t){return K.a.flatMap((function(e){return t.map((function(t){return[].concat(Object(d.a)(e.map((function(t,e){return[e,t]}))),Object(d.a)(t))}))}),E)},g=f(u),x=f(h),D=K.a.filter((function(t){var e={};return t.forEach((function(t){var a=Object(F.a)(t,2),c=a[0],n=a[1];if(b.length>c){var j=b[c];e[j]=(e[j]||0)+dt[j][n]}})),b.every((function(t){return n[t]<=(e[t]||0)}))})),m=D(g),C=D(x);console.log("Getting desired with 4 upgrades:",m.length,g.length,m.length/g.length),console.log("Getting desired with 5 upgrades:",C.length,x.length,C.length/x.length),j*=C.length/x.length*.25+.75*m.length/g.length}return j}({type:a.type,mainStat:a.mainStat,subStats:a.subStats.reduce((function(t,e){var a=Object(F.a)(e,2),c=a[0],n=a[1];return Object(h.a)(Object(h.a)({},t),{},Object(u.a)({},c,n))}),{})}),e=1-t,c=[],n=0,j=1,b=0;b<2920&&!(j<.05);b++)n+=20,j*=e,c.push({resin:n,chance:1-j});x(c),l(t)}},children:"Calculate"})]})}),!K.a.isNil(r)&&Object(Et.jsx)(wt,{chance:r,chartData:s})]})}var kt=s.a.div(Ct||(Ct=Object(o.a)(["\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n"])));var Bt=function(){return Object(Et.jsx)(kt,{children:Object(Et.jsx)(Gt,{})})},Wt=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,446)).then((function(e){var a=e.getCLS,c=e.getFID,n=e.getFCP,j=e.getLCP,b=e.getTTFB;a(t),c(t),n(t),j(t),b(t)}))};l.a.render(Object(Et.jsx)(O.a.StrictMode,{children:Object(Et.jsx)(i.a,{children:Object(Et.jsx)(Bt,{})})}),document.getElementById("root")),Wt()}},[[408,1,2]]]);
//# sourceMappingURL=main.7b897098.chunk.js.map