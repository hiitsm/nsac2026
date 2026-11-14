/* CONTROLLER: compare page. */
Controller.mount("compare",{
 view(){normalizeComparison();return CompareView.render()},
 actions:{gen(){st.cmp={a:$("ca").value,b:$("cb").value,m:$("cm").value,go:true}}}});
