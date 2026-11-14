/* VIEW: small HTML helpers. */
const $=id=>document.getElementById(id);
const e=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fm=v=>v==null?"—":v;
const tag=i=>i.demo?'<span class="tag">Demo</span>':"";
const opt=(a,s,blank)=>(blank!=null?`<option value="">${blank}</option>`:"")+a.map(x=>`<option ${x===s?"selected":""}>${e(x)}</option>`).join("");
