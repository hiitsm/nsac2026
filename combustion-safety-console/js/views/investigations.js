/* VIEW: builds HTML from the model. It never changes state. */
const InvestigationsView={
render(){return st.sub==="detail"?InvestigationsView.detail():st.sub==="add"?InvestigationsView.add():InvestigationsView.list()},
list(){
 const f=st.f,L=searchInvestigations(st.q,f);
 return`<div class="row sp"><div><h2>Investigations</h2><p class="sub">${L.length} of ${all().length} shown</p></div><button class="btn" data-a="sub" data-v="add">Add investigation</button></div>
 <div class="row"><label class="f">Search<input id="q" value="${e(st.q)}"></label><label class="f">Gravity<select id="f_grav">${opt(GR,f.grav,"All")}</select></label><label class="f">Material<select id="f_mat">${opt(uniq("mat"),f.mat,"All")}</select></label><label class="f">Experiment type<select id="f_type">${opt(uniq("type"),f.type,"All")}</select></label>
 <label class="f">O₂ min %<input id="f_omin" type="number" value="${e(f.omin)}" style="min-width:80px;width:80px"></label><label class="f">O₂ max %<input id="f_omax" type="number" value="${e(f.omax)}" style="min-width:80px;width:80px"></label>
 <label class="f">Sort<select id="f_sort"><option value="name" ${f.sort==="name"?"selected":""}>Name</option><option value="recent" ${f.sort==="recent"?"selected":""}>Recently added</option><option value="hazard" ${f.sort==="hazard"?"selected":""}>Highest measured hazard</option></select></label><button class="btn" data-a="clear">Clear</button></div>
 ${L.length?`<table><tr><th>Investigation</th><th>Type</th><th>Material</th><th>Gravity</th><th>Runs</th><th></th></tr>${L.map(i=>`<tr class="go" data-a="view" data-v="${e(i.id)}"><td><b style="font-weight:500">${e(i.id)}</b>${tag(i)}<br><span style="color:var(--dim)">${e(i.title)}</span></td><td>${e(i.type)}</td><td>${e(i.mat)}</td><td>${e(i.grav)}</td><td>${i.runs.length}</td><td><button class="btn">View</button></td></tr>`).join("")}</table>`:'<p class="sub">No investigations match. Lunar and Martian gravity have no data in PSI yet.</p>'}
 <p class="note">Rocket and propellant fires are outside the scope of PSI. Three more ACME experiments are still to be loaded.</p>`},
detail(){
 const i=get(st.sel);
 const seg=[["ug","Undergrad"],["gr","Grad"],["eng","Engineer"]].map(x=>`<button class="btn ${st.aud===x[0]?"on":""}" data-a="aud" data-v="${x[0]}">${x[1]}</button>`).join("");
 const pts=i.runs.filter(r=>r.sp!=null&&r.o2!=null).map(r=>({x:r.o2,y:r.sp,t:"O₂ "+r.o2+"%"}));
 return`<div class="row sp"><button class="btn" data-a="sub" data-v="list">&lsaquo; All investigations</button><div class="row" style="margin:0">${seg}</div></div>
 <h2>${e(i.id)}${tag(i)}</h2><p class="sub">${e(i.title)}</p><p class="lead">${e(i.desc)}</p>
 <dl><dt>Experiment type</dt><dd>${e(i.type)}</dd><dt>Material</dt><dd>${e(i.mat)}</dd><dt>Gravity</dt><dd>${e(i.grav)}</dd><dt>Hardware</dt><dd>${e(i.hw)}</dd><dt>Oxygen</dt><dd>${oxr(i)}</dd>
 ${st.aud!=="ug"?`<dt>Varied between tests</dt><dd>${e(i.vary)}</dd><dt>Sensors</dt><dd>${e(i.sens)}</dd>`:""}<dt>Source</dt><dd>${e(i.src)}</dd><dt>PDF and dataset</dt><dd>${e(i.pdf||"No PDF attached")}; ${e(i.csv||"no dataset attached")}</dd></dl>
 ${st.aud==="eng"?`<p class="note">${i.runs.length?"Run-level values are listed below for model validation.":"No numerical runs loaded. Pull the tabular data from PSI before using this for modeling."}</p>`:""}
 <h3>Key measurements</h3>${runTable(i.runs)}<h3>Chart</h3>${scatter(pts,"Oxygen (%)","Flame spread (mm/s)")}
 <h3>Findings</h3><p>${e(i.find)}</p><h3>Summary</h3><p>${e(i.desc)} ${e(i.find)}</p><p class="note">Source: ${e(i.src)}. Built from the stored text above; it is not a model-written summary.</p>`},
add(){
 return`<button class="btn" data-a="sub" data-v="list">&lsaquo; Cancel</button><h2 style="margin-top:14px">Add investigation</h2><p class="sub">Nothing is uploaded; files are read in your browser and kept in this page only.</p>
 <div class="row"><label class="f">Title<input id="a_t" style="min-width:300px"></label><label class="f">Experiment type<select id="a_ty">${opt(["Flame spread","Ignition","Extinction","Flame behavior","Smoke detection","Other"])}</select></label><label class="f">Material<input id="a_m"></label><label class="f">Gravity<select id="a_g">${opt(GR)}</select></label></div>
 <div class="row"><label class="f">NASA source URL or DOI<input id="a_s" style="min-width:300px"></label><label class="f">PDF (optional)<input id="a_p" type="file" accept=".pdf"></label><label class="f">CSV (columns: oxygen, pressure, spread, ignition, extinction)<input id="a_c" type="file" accept=".csv"></label></div>
 <div id="prev"></div><div class="row"><button class="btn on" data-a="pub">Review and publish</button></div>
 <p class="note">Each CSV row is kept as a separate run, so comparisons stay meaningful. Empty cells stay empty, not zero. In the full build, a Python backend would extract text, store records and generate the summary.</p>`}
};
InvestigationsView.showPreview=r=>{$("prev").innerHTML="<h3>Review extracted runs</h3>"+runTable(r)};
InvestigationsView.showPreviewError=()=>{$("prev").textContent="Could not read this CSV."};
