/* MODEL: queries over the investigations and runs. */
const all=()=>[...DATA,...(st.demo?DEMO:[]),...st.added];
const runs=()=>all().flatMap(i=>i.runs.map(r=>({...r,inv:i})));
const get=id=>all().find(i=>i.id===id);
const uniq=k=>[...new Set(all().map(i=>i[k]))].filter(Boolean).sort();
const oxr=i=>{const v=i.runs.map(r=>r.o2).filter(x=>x!=null);return v.length?Math.min(...v)+" to "+Math.max(...v)+"%":(i.omax?"up to "+i.omax+"%":"—")};
const maxsp=i=>{const v=i.runs.map(r=>r.sp).filter(x=>x!=null);return v.length?Math.max(...v):null};
function hazard(v){const s=runs().map(r=>r.sp).filter(x=>x!=null).sort((a,b)=>a-b);if(s.length<3)return"Insufficient evidence";return v<s[Math.floor(s.length/3)]?"Low":v<s[Math.floor(2*s.length/3)]?"Medium":"High"}
