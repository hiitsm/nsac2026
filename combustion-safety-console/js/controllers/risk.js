/* CONTROLLER: risk analysis page. */
document.addEventListener("change",ev=>{if(ev.target.id==="renv"){applyEnvironment(ev.target.value);Controller.render()}});
document.addEventListener("input",ev=>{if(ev.target.id==="ro2")RiskView.showO2(ev.target.value)});
Controller.mount("risk",{view:RiskView.render,actions:{
 analyze(){Object.assign(st.r,{env:$("renv").value,grav:$("rgrav").value,o2:+$("ro2").value,p:+$("rp").value,mat:$("rmat").value});st.r.res=analyzeScenario(st.r)}}});
