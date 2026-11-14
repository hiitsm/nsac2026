/* MODEL: comparison of two investigations. */
function normalizeComparison(){const A=all(),c=st.cmp;if(!c.a||!get(c.a))c.a=A[0].id;if(!c.b||!get(c.b))c.b=A[1].id;}
function compareInvestigations(c){
 const a=get(c.a),b=get(c.b),m=c.m,rows=[a,b].flatMap((i,k)=>i.runs.length?i.runs.map(r=>({i,r,k})):[{i,r:null,k}]);
  const rg=(i,k)=>{const v=i.runs.map(r=>r[k]).filter(x=>x!=null);return v.length?(Math.min(...v)===Math.max(...v)?""+v[0]:Math.min(...v)+" to "+Math.max(...v)):"not recorded"};
  const d=[];if(a.grav!==b.grav)d.push("gravity ("+a.grav+" vs "+b.grav+")");if(a.mat!==b.mat)d.push("material ("+a.mat+" vs "+b.mat+")");if(rg(a,"o2")!==rg(b,"o2"))d.push("oxygen ("+rg(a,"o2")+" vs "+rg(b,"o2")+")");if(rg(a,"p")!==rg(b,"p"))d.push("pressure ("+rg(a,"p")+" vs "+rg(b,"p")+" kPa)");
  const hi=i=>{const v=i.runs.map(r=>r[m]).filter(x=>x!=null);return v.length?Math.max(...v):null};
 return{a,b,m,rows,d,hi}}
