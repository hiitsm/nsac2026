/* MODEL: search, sort, CSV parsing and adding investigations. */
function searchInvestigations(q0,f){
 const q=q0.toLowerCase();
 let L=all().filter(i=>(!q||[i.id,i.title,i.desc,i.mat,i.type].join(" ").toLowerCase().includes(q))&&(!f.grav||i.grav===f.grav)&&(!f.mat||i.mat===f.mat)&&(!f.type||i.type===f.type)&&((f.omin===""&&f.omax==="")||(()=>{const v=i.runs.map(r=>r.o2).filter(x=>x!=null),lo=v.length?Math.min(...v):(i.omax?0:null),hi=Math.max(i.omax||-1,...v);return lo!=null&&(f.omin===""||hi>=+f.omin)&&(f.omax===""||lo<=+f.omax)})()));
 const idx=i=>all().indexOf(i);
 L.sort(f.sort==="name"?(a,b)=>a.title.localeCompare(b.title):f.sort==="recent"?(a,b)=>idx(b)-idx(a):(a,b)=>(maxsp(b)??-1)-(maxsp(a)??-1));
 return L}
function addInvestigation(f){const id="USR-"+(++st.n);
 st.added.push({id,title:f.title,type:f.type,mat:f.mat||"—",grav:f.grav,src:f.src||"Not provided",hw:"User supplied",vary:"see source",sens:"see source",desc:"User-added investigation. Review the extracted values before relying on them.",find:"Not yet summarized.",h:[],runs:st.draft||[],pdf:f.pdf,csv:f.csv});
 st.draft=null;return id}
function parseCsv(t){const L=t.trim().split(/\r?\n/).map(l=>l.split(",").map(s=>s.trim()));const h=L.shift().map(s=>s.toLowerCase()),ix=k=>h.findIndex(x=>x.includes(k));
 const c={o2:ix("oxygen")>=0?ix("oxygen"):ix("o2"),p:ix("pressure"),sp:ix("spread"),ig:ix("ignition"),ex:ix("extinction")},n=(r,i)=>{if(i<0||r[i]===undefined||r[i]==="")return null;const v=Number(r[i]);return isNaN(v)?null:v};
 return L.filter(r=>r.some(Boolean)).map(r=>({o2:n(r,c.o2),p:n(r,c.p),sp:n(r,c.sp),ig:n(r,c.ig),ex:n(r,c.ex)}))}

