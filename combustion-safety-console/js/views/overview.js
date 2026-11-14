/* VIEW: builds HTML from the model. It never changes state. */
const OverviewView={
render(){
 const{A,R,top:sp,stats:S}=overviewSummary();
 return`<div class="row sp"><div><h2>Overview</h2><p class="sub">What the loaded evidence covers</p></div><div class="row" style="margin:0"><input id="q" placeholder="Search investigations" aria-label="Search"><button class="btn" data-a="search">Search</button></div></div>
 <div class="stats">${S.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>
 <div class="cols"><div><h3>Flame spread rate vs. oxygen</h3>${scatter(R.filter(r=>r.sp!=null&&r.o2!=null).map(r=>({x:r.o2,y:r.sp,c:r.inv.grav==="Earth"?"pt2":"pt",t:r.inv.id+", "+r.inv.grav})),"Oxygen (%)","Flame spread (mm/s)")}<p class="note">Blue: microgravity. Amber: normal gravity. Only loaded runs are plotted.</p></div>
 <div><h3>Recently added</h3><table>${A.slice(-5).reverse().map(i=>`<tr class="go" tabindex="0" data-a="view" data-v="${e(i.id)}"><td>${e(i.id)}${tag(i)}</td><td>${e(i.title)}</td></tr>`).join("")}</table></div></div>
 <h3>Highest observed hazard cases</h3>${sp.length?`<table><tr><th>Investigation</th><th>Material</th><th>O₂ %</th><th>Pressure kPa</th><th>Spread mm/s</th><th>Relative indicator</th></tr>${sp.map(r=>`<tr class="go" data-a="view" data-v="${e(r.inv.id)}"><td>${e(r.inv.id)}</td><td>${e(r.inv.mat)}</td><td>${fm(r.o2)}</td><td>${fm(r.p)}</td><td>${r.sp}</td><td>${hazard(r.sp)}</td></tr>`).join("")}</table><p class="note">Relative experimental indicators among loaded runs, not certified spacecraft safety ratings.</p>`:'<p class="sub">Insufficient evidence: no flame spread values are loaded yet.</p>'}`}
};
