/* VIEW: SVG charts and the runs table. */
function scatter(p,xl,yl){
 if(!p.length)return'<p class="sub">No numeric runs to plot. Add a CSV or switch on demonstration runs.</p>';
 const W=520,H=230,m=44,x0=Math.min(...p.map(a=>a.x)),x1=Math.max(...p.map(a=>a.x)),y1=Math.max(...p.map(a=>a.y))*1.15||1;
 const X=v=>m+(x1===x0?.5:(v-x0)/(x1-x0))*(W-m-16),Y=v=>H-m-(v/y1)*(H-m-14);
 return`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(yl)} against ${e(xl)}"><line class="ax" x1="${m}" y1="${H-m}" x2="${W-10}" y2="${H-m}"/><line class="ax" x1="${m}" y1="14" x2="${m}" y2="${H-m}"/>
 <text x="${m}" y="${H-m+16}">${x0}</text><text x="${W-16}" y="${H-m+16}" text-anchor="end">${x1}</text><text x="${W/2}" y="${H-6}" text-anchor="middle">${e(xl)}</text>
 <text x="${m-6}" y="${H-m}" text-anchor="end">0</text><text x="${m-6}" y="22" text-anchor="end">${(y1).toFixed(1)}</text><text x="12" y="${H/2}" transform="rotate(-90 12 ${H/2})" text-anchor="middle">${e(yl)}</text>
 ${p.map(a=>`<circle class="${a.c||"pt"}" cx="${X(a.x)}" cy="${Y(a.y)}" r="5"><title>${e(a.t||"")}</title></circle>`).join("")}</svg>`}
function bars(rows,yl){
 const r=rows.filter(a=>a.v!=null);if(!r.length)return'<p class="sub">No values for this measurement in the selected investigations. Missing values stay blank, not zero.</p>';
 const W=520,H=220,m=40,mx=Math.max(...r.map(a=>a.v))*1.15||1,bw=Math.min(50,(W-m)/r.length-10);
 return`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(yl)}"><line class="ax" x1="${m}" y1="${H-m}" x2="${W-10}" y2="${H-m}"/><text x="${m-6}" y="${H-m}" text-anchor="end">0</text><text x="${m-6}" y="20" text-anchor="end">${mx.toFixed(1)}</text>
 ${r.map((a,i)=>{const x=m+10+i*((W-m-10)/r.length),h=a.v/mx*(H-m-20);return`<rect class="${a.c}" x="${x}" y="${H-m-h}" width="${bw}" height="${h}"/><text x="${x+bw/2}" y="${H-m-h-4}" text-anchor="middle">${a.v}</text><text x="${x+bw/2}" y="${H-m+14}" text-anchor="middle">${e(a.l)}</text>`}).join("")}</svg>`}
const runTable=rs=>rs.length?`<table><tr><th>O₂ %</th><th>Pressure kPa</th><th>Flame spread mm/s</th><th>Ignition delay s</th><th>Extinction limit % O₂</th></tr>${rs.map(r=>`<tr><td>${fm(r.o2)}</td><td>${fm(r.p)}</td><td>${fm(r.sp)}</td><td>${fm(r.ig)}</td><td>${fm(r.ex)}</td></tr>`).join("")}</table>`:'<p class="sub">No numerical runs loaded for this investigation.</p>';

