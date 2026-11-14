/* MODEL: scenario analysis and relevant-experiment scoring. */
function applyEnvironment(k){const E=ENV[k];Object.assign(st.r,{env:k,o2:E[1],p:E[2],grav:E[3],res:null})}
function relevantInvestigations(r){
 const A=all(),rel=A.map(i=>{let s=0;if(i.grav===r.grav)s+=40;if((i.omax&&i.omax>=r.o2)||i.runs.some(x=>x.o2!=null&&Math.abs(x.o2-r.o2)<=5))s+=25;if(i.h.includes(r.env))s+=20;if(r.mat&&i.mat===r.mat)s+=10;return{i,s}}).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,6);
 return rel}
function analyzeScenario(r){const m=runs().filter(x=>x.inv.grav===r.grav&&(!r.mat||x.inv.mat===r.mat)&&x.o2!=null&&Math.abs(x.o2-r.o2)<=5&&(x.p==null||Math.abs(x.p-r.p)<=20)),sp=m.filter(x=>x.sp!=null);
 return{m,level:sp.length?hazard(Math.max(...sp.map(x=>x.sp))):"Insufficient evidence"}}
