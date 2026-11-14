/* MODEL: application state, kept per browser tab so it survives page changes. */
function load(){try{return JSON.parse(sessionStorage.getItem("csc-state-2")||"{}")}catch(x){return{}}}
const st=Object.assign({sub:"list",sel:null,q:"",f:{grav:"",mat:"",type:"",omin:"",omax:"",sort:"name"},demo:false,aud:"ug",cmp:{a:"",b:"",m:"sp",go:false},r:{env:"iss",grav:"Microgravity",o2:21,p:101.3,mat:"",res:null},chat:[],added:[],draft:null,n:0,keep:0},load());
const save=()=>{try{sessionStorage.setItem("csc-state-2",JSON.stringify(st))}catch(x){}};
addEventListener("pagehide",save);
