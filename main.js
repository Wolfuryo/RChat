Rchat.internal={};
Rchat.internal.init=function(){
$("body").append(Rchat.config.html);
Rchat.internal.op_cl($("#chat_btn"));
};
Rchat.internal.op_cl=function(elem){
if(localStorage.getItem("chat_op")=="1"){
$("#chat_inner").toggleClass("chat_open");
};
elem.click(function(e){
$("#chat_inner").toggleClass("chat_open");
localStorage.setItem("chat_op", $("#chat_inner").hasClass("chat_open")?"1":"0");
});
};
Rchat.internal.init();
