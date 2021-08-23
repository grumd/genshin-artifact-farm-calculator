(this["webpackJsonpgenshin-artifact-farm-calculator"]=this["webpackJsonpgenshin-artifact-farm-calculator"]||[]).push([[0],{212:function(e,t,a){var n=a(266),c=["calculateChance","Worker"];e.exports=function(){var e=new Worker(a.p+"ae6f509da632f3896396.worker.js",{name:"[hash].worker.js"});return n(e,c),e}},258:function(e,t,a){},403:function(e,t,a){"use strict";a.r(t);var n,c,r,i,s=a(1),o=a.n(s),l=a(98),u=a.n(l),b=a(438),j=(a(258),a(58)),d=a(59),h=a(91),O=a.n(h),f=a(11),p=a(208),m=a(36),x=a(21),g=a(5),S=a(420),v=a(421),y=a(422),C=a(423),w=a(439),E=a(102),F=a(430),k=a(440),D=a(436),M=a(433),P=a(434),A=a(238),H=a(232),T=a(213),B=a(45),R=a.n(B),G=a(435),K=a(209),W=a(4),L=d.a.div(n||(n=Object(j.a)(["\n  background: #333b4d;\n  z-index: 2;\n  padding: 0.5em 1em;\n  border-radius: 0.5em;\n  border: 1px solid white;\n  max-width: 95%;\n  font-size: 90%;\n"]))),I=function(e){var t=e.target,a=e.content,n=Object(s.useState)(!1),c=Object(g.a)(n,2),r=c[0],i=c[1],o=Object(s.useState)(null),l=Object(g.a)(o,2),u=l[0],b=l[1],j=Object(s.useState)(null),d=Object(g.a)(j,2),h=d[0],O=d[1],f=Object(s.useState)(null),p=Object(g.a)(f,2),m=p[0],S=p[1],v=Object(G.a)(u,h,{modifiers:[{name:"arrow",options:{element:m}},{name:"preventOverflow",options:{padding:5}}]}),y=v.styles,C=v.attributes,w=Object(s.useMemo)((function(){return[{current:h},{current:u}]}),[h,u]);Object(K.a)((function(){r&&i(!1)}),{refs:w,ignoreClass:"popup-body",disabled:!r});return Object(W.jsxs)(W.Fragment,{children:[Object(W.jsx)("div",{ref:b,onClick:function(){i((function(e){return!e}))},children:t}),r&&Object(W.jsxs)(L,Object(x.a)(Object(x.a)({className:"popup-body",ref:O,style:y.popper},C.popper),{},{children:[a,Object(W.jsx)("div",{ref:S,style:y.arrow})]}))]})};!function(e){e.Flower="Flower of Life",e.Plume="Plume of Death",e.Sands="Sands of Eon",e.Goblet="Goblet of Eonothem",e.Circlet="Circlet of Logos"}(c||(c={})),function(e){e.HPFlat="HP",e.HP="HP%",e.ATKFlat="ATK",e.ATK="ATK%",e.DEFFlat="DEF",e.DEF="DEF%",e.CR="CRIT Rate%",e.CD="CRIT DMG%",e.ER="Energy Recharge%",e.EM="Elemental Mastery",e.HB="Healing Bonus%",e.Pyro="Pyro DMG Bonus%",e.Electro="Electro DMG Bonus%",e.Cryo="Cryo DMG Bonus%",e.Hydro="Hydro DMG Bonus%",e.Anemo="Anemo DMG Bonus%",e.Geo="Geo DMG Bonus%",e.Physical="Physical DMG Bonus%"}(r||(r={}));var z,_=[r.CR,r.CD,r.ATK,r.ATKFlat,r.HP,r.HPFlat,r.DEF,r.DEFFlat,r.ER,r.EM],N=[r.HPFlat,r.ATKFlat,r.HP,r.ATK,r.DEF,r.ER,r.EM,r.CR,r.CD,r.HB,r.Pyro,r.Electro,r.Cryo,r.Hydro,r.Anemo,r.Geo,r.Physical],V=(i={},Object(f.a)(i,c.Flower,[r.HPFlat]),Object(f.a)(i,c.Plume,[r.ATKFlat]),Object(f.a)(i,c.Sands,[r.HP,r.ATK,r.DEF,r.ER,r.EM]),Object(f.a)(i,c.Goblet,[r.HP,r.ATK,r.DEF,r.Pyro,r.Electro,r.Cryo,r.Hydro,r.Anemo,r.Geo,r.Physical,r.EM]),Object(f.a)(i,c.Circlet,[r.HP,r.ATK,r.DEF,r.CR,r.CD,r.HB,r.EM]),i),q=N.reduce((function(e,t){return Object(x.a)(Object(x.a)({},e),{},Object(f.a)({},t,R.a.without([t],_)))}),{}),Y=a(212),J=a.n(Y),Q=a(239),U=a(419),X=["onChange","value","items"],Z=d.a.option(z||(z=Object(j.a)(["\n  color: black;\n  background: lightgrey;\n"])));function $(e){var t=e.onChange,a=e.value,n=e.items,c=Object(Q.a)(e,X),r=Object(s.useCallback)((function(e){var a=e.target.value;t(a)}),[t]);return Object(W.jsx)(U.a,Object(x.a)(Object(x.a)({onChange:r,value:a},c),{},{children:n.map((function(e){return Object(W.jsx)(Z,{value:e.value,children:e.label},e.value)}))}))}var ee,te,ae,ne=function(e){if(R.a.isNil(e))return"";if(0===e)return"0%";for(var t=0;t<12&&!(100*e*Math.pow(10,t)>1);)t++;return(100*e).toFixed(t+2)+"%"},ce=a(424),re=a(425),ie=a(240),se=a(429),oe=a(229),le=a(230),ue=a(112),be=J()(),je=R.a.values(c).map((function(e){return{label:e,value:e}})),de=d.a.div(ee||(ee=Object(j.a)(["\n  border-radius: 5px;\n  background: #313743;\n  padding: 5px 10px;\n  border: 1px solid white;\n"]))),he=d.a.div(te||(te=Object(j.a)(["\n  cursor: pointer;\n  font-size: 120%;\n"]))),Oe=Object(s.memo)((function(e){var t=e.chances,a=e.chartData;return Object(W.jsxs)(S.a,{margin:1,maxW:"95%",width:"lg",borderWidth:"1px",borderRadius:"lg",padding:2,paddingLeft:4,children:[R.a.isNumber(t.chanceSubsMatch)&&Object(W.jsxs)(v.a,{alignItems:"center",flexFlow:"row nowrap",children:[Object(W.jsx)(y.a,{children:"Chance of getting an artifact with these stats:"}),Object(W.jsx)(y.a,{paddingLeft:2,paddingRight:2,fontSize:"120%",fontWeight:"bold",children:ne(t.chanceSubsMatch)})]}),R.a.isNumber(t.upgradeChance)&&Object(W.jsxs)(v.a,{alignItems:"center",flexFlow:"row nowrap",children:[Object(W.jsx)(y.a,{children:"Chance of upgrading to desired numbers:"}),Object(W.jsx)(y.a,{paddingLeft:2,paddingRight:2,fontSize:"120%",fontWeight:"bold",children:ne(t.upgradeChance)})]}),Object(W.jsxs)(v.a,{alignItems:"center",flexFlow:"row nowrap",children:[Object(W.jsx)(y.a,{children:"Total chance in one run (20 resin):"}),Object(W.jsx)(y.a,{paddingLeft:2,paddingRight:2,fontSize:"120%",fontWeight:"bold",children:ne(t.chance)}),Object(W.jsx)(I,{target:Object(W.jsx)(he,{children:Object(W.jsx)(T.a,{})}),content:Object(W.jsxs)("div",{children:[Object(W.jsx)(y.a,{fontWeight:"bold",marginRight:6,children:"This calculation assumes the following:"}),Object(W.jsx)(y.a,{children:"5* artifacts upgraded to +20;"}),Object(W.jsxs)(y.a,{children:["1.07 artifacts per run on average;"," ",Object(W.jsx)(C.a,{color:"teal",isExternal:!0,href:"https://docs.google.com/spreadsheets/d/1RcuniapqS6nOP05OCH0ui10Vo3bWu0AvFbhgcHzTybY/edit",children:"Source"})]}),Object(W.jsx)(y.a,{children:"50% chance to get one of the two sets;"}),Object(W.jsx)(y.a,{children:"20% chance to get the correct artifact type;"}),Object(W.jsxs)(y.a,{children:["20% chance to get 4 initial sub-stats, and 80% to get 3."," ",Object(W.jsx)(C.a,{color:"teal",isExternal:!0,href:"https://genshin-impact.fandom.com/wiki/Loot_System/Artifact_Drop_Distribution#Initial_Sub_Stat_Number_Distribution",children:"Source"})]}),Object(W.jsxs)(y.a,{children:["Calculated chance to get the correct main stat and sub-stats;"," ",Object(W.jsx)(C.a,{color:"teal",isExternal:!0,href:"https://genshin-impact.fandom.com/wiki/Artifacts/Distribution",children:"Source 1"}),", ",Object(W.jsx)(C.a,{color:"teal",isExternal:!0,href:"https://docs.google.com/spreadsheets/d/1sYQrV5Yp_QTVEKMLWquMu0mDgHhOO_Rh2LfcWdS_Eno/edit",children:"Source 2"})]}),Object(W.jsxs)(y.a,{marginTop:2,children:["Contact me at"," ",Object(W.jsx)(C.a,{color:"teal",isExternal:!0,href:"https://www.reddit.com/message/compose/?to=grumd",children:"/u/grumd"})," ","if you have any questions."]})]})})]}),Object(W.jsx)(y.a,{children:"Cumulative chance to get this artifact at least once:"}),t.chance>0&&!R.a.isEmpty(a)&&Object(W.jsx)(ce.a,{width:"100%",aspect:2.5,children:Object(W.jsxs)(re.a,{data:a,margin:{top:5,right:5,bottom:5,left:-15},children:[Object(W.jsx)("defs",{children:Object(W.jsxs)("linearGradient",{id:"colorGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[Object(W.jsx)("stop",{offset:"5%",stopColor:"#8884d8",stopOpacity:.8}),Object(W.jsx)("stop",{offset:"95%",stopColor:"#8884d8",stopOpacity:0})]})}),Object(W.jsx)(ie.a,{fillOpacity:1,fill:"url(#colorGrad)",type:"monotone",dataKey:"chance",stroke:"#8884d8"}),Object(W.jsx)(se.a,{stroke:"#ccc",strokeDasharray:"5 5"}),Object(W.jsx)(oe.a,{dataKey:"resin"}),Object(W.jsx)(le.a,{domain:[0,1],tickFormatter:function(e){return(100*e).toFixed(0)+"%"}}),Object(W.jsx)(ue.a,{isAnimationActive:!1,content:function(e){var t,a=e.payload,n=null===a||void 0===a||null===(t=a[0])||void 0===t?void 0:t.payload;return n?Object(W.jsxs)(de,{children:[Object(W.jsxs)("div",{children:["Resin: ",n.resin]}),Object(W.jsxs)("div",{children:["Days: ",n.resin/160]}),Object(W.jsxs)("div",{children:["Chance: ",ne(n.chance)]})]}):null}})]})})]})}));function fe(){var e=Object(s.useState)({acceptBothSets:!1,type:c.Flower,subStats:[]}),t=Object(g.a)(e,2),a=t[0],n=t[1],r=Object(s.useState)({}),i=Object(g.a)(r,2),o=i[0],l=i[1],u=Object(s.useState)(!1),b=Object(g.a)(u,2),j=b[0],d=b[1],h=Object(s.useState)([]),C=Object(g.a)(h,2),T=C[0],B=C[1],G=V[a.type].map((function(e){return{label:e,value:e}})),K=(a.mainStat?q[a.mainStat]:[]).filter((function(e){return!a.subStats.find((function(t){return Object(g.a)(t,1)[0]===e}))})).map((function(e){return{label:e,value:e}}));Object(s.useEffect)((function(){a.mainStat||n((function(e){return Object(x.a)(Object(x.a)({},e),{},{mainStat:G[0].value})}))}),[a.mainStat,G]);var L=function(e){return function(t){n((function(a){return Object(x.a)(Object(x.a)({},a),{},{subStats:a.subStats.map((function(a){return a[0]===e?[t,0,"0"]:a}))})}))}},I=function(e){return function(t,a){n((function(n){return Object(x.a)(Object(x.a)({},n),{},{subStats:n.subStats.map((function(n){return n[0]===e?[e,a||0,t||"0"]:n}))})}))}},z=function(){var e=Object(p.a)(O.a.mark((function e(){var t,n,c,r,i,s,o,u,b,j;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.mainStat){e.next=30;break}return d(!0),performance.mark("chance"),e.next=5,be.calculateChance({acceptBothSets:a.acceptBothSets,type:a.type,mainStat:a.mainStat,subStats:a.subStats.reduce((function(e,t){var a=Object(g.a)(t,2),n=a[0],c=a[1];return Object(x.a)(Object(x.a)({},e),{},Object(f.a)({},n,c))}),{})});case 5:t=e.sent,n=t.chance,c=t.upgradeChance,r=t.chanceSubsMatch,performance.measure("Time to calculate chances","chance"),d(!1),performance.getEntriesByType("measure").forEach((function(e){console.log(e.name,e.duration,"ms")})),performance.clearMarks(),performance.clearMeasures(),i=1-n,s=[],o=0,u=1,b=n>.01?1:n>.005?4:n>.001?8:16,j=0;case 19:if(!(j<2920)){e.next=28;break}if(!(u<.05)){e.next=22;break}return e.abrupt("break",28);case 22:o+=20,u*=i,(j+1)%b||s.push({resin:o,chance:1-u});case 25:j++,e.next=19;break;case 28:B(s),l({chance:n,upgradeChance:c,chanceSubsMatch:r});case 30:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(W.jsxs)(v.a,{flexFlow:"column wrap",width:"100%",alignItems:"center",children:[Object(W.jsx)(S.a,{margin:1,maxW:"95%",width:"lg",borderWidth:"1px",borderRadius:"lg",padding:2,children:Object(W.jsxs)(w.b,{padding:"2",spacing:"4",children:[Object(W.jsxs)(E.a,{display:"flex",alignItems:"center",children:[Object(W.jsx)(F.a,{cursor:"pointer",htmlFor:"one-set",size:"lg",mb:1,children:"Accept both artifact sets from a domain"}),Object(W.jsx)(k.a,{id:"one-set",onChange:function(e){n((function(t){return Object(x.a)(Object(x.a)({},t),{},{acceptBothSets:!!e.target.checked})}))},isChecked:a.acceptBothSets})]}),Object(W.jsxs)(E.a,{id:"type",children:[Object(W.jsx)(F.a,{children:"Artifact type:"}),Object(W.jsx)($,{value:a.type,items:je,onChange:function(e){n((function(t){return{acceptBothSets:t.acceptBothSets,type:e,subStats:[]}}))}})]}),Object(W.jsxs)(E.a,{id:"mainStat",children:[Object(W.jsx)(F.a,{children:"Main stat:"}),Object(W.jsx)($,{value:a.mainStat,items:G,onChange:function(e){n((function(t){return Object(x.a)(Object(x.a)({},t),{},{mainStat:e,subStats:[]})}))}})]}),Object(W.jsxs)(E.a,{id:"subStat",children:[Object(W.jsx)(F.a,{children:"Sub stats (optional):"}),Object(W.jsxs)(w.b,{alignItems:"start",width:"100%",children:[a.subStats.map((function(e,t){var a=Object(g.a)(e,3),c=a[0],r=a[2];return Object(W.jsxs)(w.a,{width:"100%",children:[Object(W.jsx)(E.a,{id:"substat-".concat(t,"-name"),children:Object(W.jsx)($,{value:c,items:[{label:c,value:c}].concat(Object(m.a)(K)),onChange:L(c)})}),Object(W.jsx)(y.a,{fontWeight:"bold",fontSize:"large",children:">="}),Object(W.jsx)(E.a,{id:"substat-".concat(t,"-value"),children:Object(W.jsx)(D.a,{min:0,defaultValue:0,value:r,onChange:I(c),children:Object(W.jsx)(D.b,{})})}),Object(W.jsx)(M.a,{colorScheme:"blue",onClick:function(){return function(e){n((function(t){return Object(x.a)(Object(x.a)({},t),{},{subStats:t.subStats.filter((function(t){return t[0]!==e}))})}))}(c)}})]},"substat-".concat(t))})),Object(W.jsx)(E.a,{children:R.a.keys(a.subStats).length<4&&Object(W.jsx)(P.a,{color:"white",fontSize:"2xl",colorScheme:"purple","aria-label":"Add substat",onClick:function(){K.length&&n((function(e){return Object(x.a)(Object(x.a)({},e),{},{subStats:[].concat(Object(m.a)(e.subStats),[[K[0].value,0,"0"]])})}))},icon:Object(W.jsx)(H.a,{})})})]})]}),Object(W.jsx)(A.a,{disabled:!a.mainStat,colorScheme:"pink",isLoading:j,onClick:z,children:"Calculate"})]})}),!R.a.isNil(o.chance)&&Object(W.jsx)(Oe,{chances:o,chartData:T})]})}var pe=d.a.div(ae||(ae=Object(j.a)(["\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n"])));var me=function(){return Object(W.jsx)(pe,{children:Object(W.jsx)(fe,{})})},xe=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,442)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),n(e),c(e),r(e),i(e)}))};u.a.render(Object(W.jsx)(o.a.StrictMode,{children:Object(W.jsx)(b.a,{children:Object(W.jsx)(me,{})})}),document.getElementById("root")),xe()}},[[403,1,2]]]);
//# sourceMappingURL=main.51d5e5f2.chunk.js.map