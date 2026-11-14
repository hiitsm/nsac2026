/* MODEL: numbers for the overview page. */
function overviewSummary(){const A=all(),R=runs(),g=new Set(A.map(i=>i.grav));
 return{A,R,top:R.filter(r=>r.sp!=null).sort((a,b)=>b.sp-a.sp).slice(0,5),
 stats:[[A.length,"Investigations"],[R.length,"Experimental runs"],[new Set(A.map(i=>i.mat)).size,"Materials"],[g.size+" of 4","Gravity categories with data"]]}}
