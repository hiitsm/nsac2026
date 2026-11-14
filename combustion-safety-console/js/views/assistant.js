/* VIEW: builds the chat screen from state. It never changes state. */
function answerHtml(sc){if(!sc.length)return"No matching records. Try a material, hardware name, or term such as oxygen, smoke or droplet.";
 return`Records that mention your terms (keyword match):<ul class="uses" style="padding-left:18px">${sc.map(x=>`<li><a href="investigations.html" data-a="view" data-v="${e(x.i.id)}" style="color:var(--steel)">${e(x.i.id)}</a>: ${e(x.i.desc)} <i>(${x.i.runs.length} numerical runs loaded)</i></li>`).join("")}</ul><span class="note">These are stored descriptions, not measured conclusions. Interpretation and recommendations need the backend retrieval model.</span>`}

const AssistantView={
 SUG:["How does microgravity affect flame spread?","Which experiments studied oxygen concentration?","What fire detection challenges are relevant to a space station?","Which safety controls should engineers investigate for a lunar habitat?"],
 thread(){
  if(!st.chat.length)return`<div class="empty"><h2>What would you like to know?</h2><p class="sub">Ask about the loaded investigations.</p><div class="sugg">${AssistantView.SUG.map(x=>`<button class="btn" data-a="ex" data-v="${e(x)}">${e(x)}</button>`).join("")}</div></div>`;
  return st.chat.map(m=>m.u?`<div class="m u"><div class="bub">${e(m.t)}</div></div>`:`<div class="m a"><div class="av" aria-hidden="true">AI</div><div class="txt">${answerHtml((m.a||[]).map(get).filter(Boolean).map(i=>({i})))}</div></div>`).join("")},
 render(){
  const d=$("qi")?$("qi").value:"";
  return`<div class="chat-top"><button class="btn" data-a="new" ${st.chat.length?"":"hidden"}>New chat</button></div>
 <div class="log" id="log" role="log" aria-live="polite">${AssistantView.thread()}</div>
 <div class="composer"><div class="box"><textarea id="qi" rows="1" placeholder="Ask a question about the records" aria-label="Question">${e(d)}</textarea><button class="send" data-a="ask" aria-label="Send question">&#8593;</button></div>
 <p class="note cap">Placeholder search over the local records. No language model is connected.</p></div>`},
 draft(){return $("qi").value},
 clearInput(){$("qi").value="";AssistantView.fit()},
 focusInput(){$("qi").focus()},
 fit(){const t=$("qi");if(t){t.style.height="auto";t.style.height=Math.min(t.scrollHeight,160)+"px"}},
 toBottom(){const l=$("log");l.scrollTop=l.scrollHeight}
};
