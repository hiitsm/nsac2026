/* VIEW: builds HTML from the model. It never changes state. */
const RiskView={
render(){
 const r=st.r,res=r.res;let out="";
 if(res){const rel=relevantInvestigations(r);
  const inc=Math.round((r.o2-21)/21*100),lowc=res.m.length<3;
  out=`<h3>Results</h3><dl><dt>Hazard level</dt><dd><b>${res.level}</b>${res.m.length?" ("+res.m.length+" matching runs)":""}</dd>
  <dt>Predicted flammability</dt><dd>Not available: no validated model is connected.</dd>
  <dt>Likely fire behavior</dt><dd>${inc>0?"Oxygen at "+r.o2+"% is "+inc+"% above Earth air, which makes materials more flammable. ":"Oxygen is near Earth air. "}${r.grav==="Microgravity"||r.grav==="Earth"?"PSI holds "+r.grav.toLowerCase()+" records for this gravity.":"PSI has no "+r.grav.toLowerCase()+"-gravity data yet. Microgravity and normal-gravity results bound the answer, and LUCI and FM2 are expected to add data."} <i>(Interpretation, not a measured finding.)</i></dd>
  <dt>Contributing factors</dt><dd>Oxygen concentration, pressure, gravity, material, airflow.</dd>
  <dt>Crew safety concerns</dt><dd>${e(ENV[r.env][0])} is a closed volume, so early warning matters. <i>(Interpretation.)</i></dd>
  <dt>Priorities to investigate</dt><dd>${rel.slice(0,3).map(x=>e(x.i.id)).join(", ")||"None identified"} <i>(speculative; check the records)</i></dd>
  <dt>Confidence and limits</dt><dd>${lowc?"Low":"Moderate"}: ${res.m.length} runs match within ±5 points O₂ and ±20 kPa. Relative experimental indicator only, not a certified safety rating.</dd></dl>
  <h3>Relevant experiments</h3><table><tr><th>Investigation</th><th>Gravity</th><th>Material</th><th>Fit</th></tr>${rel.map(x=>`<tr class="go" data-a="view" data-v="${e(x.i.id)}"><td>${e(x.i.id)}${tag(x.i)}</td><td>${e(x.i.grav)}</td><td>${e(x.i.mat)}</td><td>${x.s}</td></tr>`).join("")}</table><p class="note">Fit is a simple score: gravity, oxygen coverage, habitat tag, material. Select a row to open the source record.</p>`}
 return`<h2>Fire risk analysis</h2><p class="sub">Scenario explorer. The settings alone do not determine fire risk; the result depends on matching evidence.</p>
 <div class="row"><label class="f">Environment<select id="renv">${Object.keys(ENV).map(k=>`<option value="${k}" ${r.env===k?"selected":""}>${ENV[k][0]}</option>`).join("")}</select></label><label class="f">Gravity<select id="rgrav">${opt(GR,r.grav)}</select></label>
 <label class="f">Oxygen: <span id="ro2v">${r.o2}%</span><input id="ro2" type="range" min="21" max="85" value="${r.o2}"></label><label class="f">Pressure (kPa)<input id="rp" type="number" value="${r.p}" style="width:100px;min-width:100px"></label>
 <label class="f">Material<select id="rmat">${opt(uniq("mat"),r.mat,"Any")}</select></label><button class="btn on" data-a="analyze">Analyze scenario</button></div>
 <p class="note">Defaults: station at 21% and 101.3 kPa; Moon base and rover at 30% and 10.2 psi (70.3 kPa) from the brief. Mars values are an assumption.</p>${out}`}
};
RiskView.showO2=v=>{$("ro2v").textContent=v+"%"};
