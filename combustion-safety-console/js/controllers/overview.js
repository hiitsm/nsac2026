/* CONTROLLER: overview page. */
document.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&ev.target.id==="q")document.querySelector('[data-a="search"]').click()});
Controller.mount("overview",{view:OverviewView.render,actions:{search(){st.q=$("q").value;st.sub="list";save();location.href="investigations.html";return false}}});
