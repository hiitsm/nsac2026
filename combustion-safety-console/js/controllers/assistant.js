/* CONTROLLER: assistant page. */
function send(q){q=(q||"").trim();if(!q)return;AssistantView.clearInput();askAssistant(q);Controller.render();AssistantView.focusInput()}
document.addEventListener("input",ev=>{if(ev.target.id==="qi")AssistantView.fit()});
document.addEventListener("keydown",ev=>{if(ev.key==="Enter"&&!ev.shiftKey&&!ev.isComposing&&ev.target.id==="qi"){ev.preventDefault();send(ev.target.value)}});
Controller.mount("assistant",{view:AssistantView.render,after(){AssistantView.toBottom();AssistantView.fit()},
 actions:{ask(){send(AssistantView.draft());return false},ex(t,v){send(v);return false},new(){st.chat=[]}}});
