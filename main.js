Rchat.internal={};
Rchat.config.topic=3;
Rchat.internal.init=function(){
$("body").append(Rchat.config.html);
Rchat.internal.op_cl($("#chat_btn"));
};
Rchat.internal.op_cl=function(elem){
if(localStorage.getItem("chat_op")=="1"){
$("#chat_inner").toggleClass("chat_open");
Rchat.internal.vars.receiving=1;
};
elem.click(function(e){
$("#chat_inner").toggleClass("chat_open");
localStorage.setItem("chat_op", $("#chat_inner").hasClass("chat_open")?"1":"0");
Rchat.internal.vars.receiving=$("#chat_inner").hasClass("chat_open")?1:0;
});
};
Rchat.internal.vars={};
Rchat.internal.vars.sending=0;
Rchat.internal.vars.receiving=0;
Rchat.internal.vars.mess_per_page=20;
Rchat.internal.get_data=function(p){
if(!Rchat.internal.vars.receiving) return;
$.get("/t"+Rchat.config.topic+((p==0 || p=="l")?"":p*Rchat.internal.vars.mess_per_page)+"-"+((p=="l")?"?view=newest":""), function(data){
alert(data);
});
};
Rchat.internal.init();
