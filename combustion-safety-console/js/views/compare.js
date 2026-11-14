/* VIEW: builds HTML from the model. It never changes state. */
const CompareView={
render(){
 const A=all(),c=st.cmp;
 const o=s=>A.map(i=>`<option value="${e(i.id)}" ${i.id===s?"selected":""}>${e(i.id)}: ${e(i.title)}</option>`).join("");
 let out="";
 if(c.go){const{a,b,m,rows,d,hi}=compareInvestigations(c);
  out=`<h3>Numerical comparison</h3><table><tr><th>Investigation</th><th>Gravity</th><th>Material</th><th>O₂ %</th><th>Pressure kPa</th><th>${MET[m][0]} (${MET[m][1]})</th></tr>${rows.map(x=>`<tr><td>${e(x.i.id)}</td><td>${e(x.i.grav)}</td><td>${e(x.i.mat)}</td><td>${x.r?fm(x.r.o2):"—"}</td><td>${x.r?fm(x.r.p):"—"}</td><td>${x.r?fm(x.r[m]):"No runs loaded"}</td></tr>`).join("")}</table>
  <h3>Comparison chart</h3>${bars(rows.filter(x=>x.r).map(x=>({l:x.i.id.slice(0,8)+" "+(x.r.o2!=null?x.r.o2+"%":""),v:x.r[m],c:x.k?"pt2":"pt"})),MET[m][0])}
  <h3>Interpretation</h3><p>${d.length?"These investigations differ in "+d.join(", ")+", so their results are not directly equivalent.":"Recorded conditions overlap, but check the source papers before treating the runs as equivalent."} ${hi(a)==null?"No "+MET[m][0].toLowerCase()+" values are recorded for "+e(a.id)+". ":""}${hi(b)==null?"No "+MET[m][0].toLowerCase()+" values are recorded for "+e(b.id)+". ":""}${hi(a)!=null&&hi(b)!=null?"Highest "+MET[m][0].toLowerCase()+": "+e(a.id)+" "+hi(a)+", "+e(b.id)+" "+hi(b)+" "+MET[m][1]+" (different conditions, so indicative only).":""}</p><p class="note">Written locally from the table above, not by a language model. Units are as entered.</p>`}
 return`<h2>Compare experiments</h2><p class="sub">Pick two investigations and one measurement</p><div class="row"><label class="f">Investigation A<select id="ca">${o(c.a)}</select></label><label class="f">Investigation B<select id="cb">${o(c.b)}</select></label><label class="f">Measurement<select id="cm">${Object.keys(MET).map(k=>`<option value="${k}" ${c.m===k?"selected":""}>${MET[k][0]}</option>`).join("")}</select></label><button class="btn on" data-a="gen">Generate comparison</button></div>${out}`}
};
