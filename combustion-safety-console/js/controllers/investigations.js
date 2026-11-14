/* CONTROLLER: investigations list, detail and add form. */
document.addEventListener("change",ev=>{const t=ev.target,id=t.id||"";
 if(id.startsWith("f_")){st.f[id.slice(2)]=t.value;Controller.render()}
 else if(id==="q"){st.q=t.value;Controller.render()}
 else if(id==="a_c"){const f=t.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{st.draft=parseCsv(rd.result);InvestigationsView.showPreview(st.draft)}catch(x){InvestigationsView.showPreviewError()}};rd.readAsText(f)}});
Controller.mount("investigations",{
 init(){if(!st.keep)st.sub="list";st.keep=0},
 view(){if(st.sub==="detail"&&!get(st.sel))st.sub="list";return InvestigationsView.render()},
 actions:{
  sub(t,v){st.sub=v},aud(t,v){st.aud=v},
  clear(){st.q="";st.f={grav:"",mat:"",type:"",omin:"",omax:"",sort:"name"}},
  pub(){const t=$("a_t").value.trim();if(!t){alert("Please enter a title.");return false}
   st.sel=addInvestigation({title:t,type:$("a_ty").value,mat:$("a_m").value.trim(),grav:$("a_g").value,src:$("a_s").value.trim(),pdf:$("a_p").files[0]?.name,csv:$("a_c").files[0]?.name});st.sub="detail"}
 }});
