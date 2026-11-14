/* MODEL: keyword search over the records and the chat history. */
function searchRecords(q){const T=q.toLowerCase().match(/[a-z0-9-]{3,}/g)||[],stop=["the","how","does","which","what","are","for","and","was","with","that","this","should","have","studied"];
 const K=T.filter(t=>!stop.includes(t)),sc=all().map(i=>{const h=[i.id,i.title,i.desc,i.find,i.type,i.mat,i.hw].join(" ").toLowerCase();return{i,s:K.reduce((a,t)=>a+(h.includes(t)?1:0),0)}}).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,3);
 return sc}
function askAssistant(q){st.chat.push({u:1,t:q},{a:searchRecords(q).map(x=>x.i.id)})}
