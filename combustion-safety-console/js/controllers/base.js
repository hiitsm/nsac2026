/* CONTROLLER base: connects clicks to a page's actions, updates the model, then redraws the view. */
const Controller={mount(page,o){
 if(o.init)o.init();
 const render=Controller.render=()=>{
  const v=$("view"),y=v.scrollTop,k=page+st.sub+st.sel;
  v.innerHTML=o.view();
  $("demo").textContent="Demonstration runs: "+(st.demo?"on":"off");$("demo").className="btn"+(st.demo?" on":"");
  v.scrollTop=k===Controller.k?y:0;Controller.k=k;save();if(o.after)o.after();
 };
 document.addEventListener("click",ev=>{
  const tb=ev.target.closest(".tabs a");
  if(tb&&page==="investigations"&&tb.getAttribute("href")==="investigations.html"&&st.sub!=="list"){ev.preventDefault();st.sub="list";render();return}
  const t=ev.target.closest("[data-a]");if(!t)return;const a=t.dataset.a,v=t.dataset.v;
  if(a==="view"){ev.preventDefault();st.sel=v;st.sub="detail";if(page==="investigations")render();else{st.keep=1;save();location.href="investigations.html"}return}
  if(a==="demo")st.demo=!st.demo;
  else if(o.actions&&o.actions[a]&&o.actions[a](t,v)===false)return;
  render();
 });
 document.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&ev.target.dataset&&ev.target.dataset.a==="view")ev.target.click()});
 render();
}};
