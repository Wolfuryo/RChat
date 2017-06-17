Rchat.internal={};
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
Rhcat.internal.vars.oc=[];
Rchat.internal.get_data=function(){
if(!Rchat.internal.vars.receiving) return; 
$.get("/t"+Rchat.config.topic+"-?view=newest", function(data){
var data_chats=$("#chat_sis", data);
var len=data_chats.length;
var i=0;
if(!Rchat.internal.vars.oc.length || (len && !Rchat.internal.vars.oc.length)){ /*Incarcare initiala sau pagina noua*/
Rchat.internal.vars.oc=[];
for(i;i<len;i++){
$("#chat_content").append(data_chats.eq(i).html());
Rchat.internal.vars.oc.push(data_chats.eq(i).html());
};
} else { /*Mesaje noi, aceeasi pagina*/
for(i;i<len;i++){
$("#chat_content").append(data_chats.eq(i).html())
}
}
setTimeout(function(){
Rchat.internal.get_data();
}, Rchat.config.delay)
});
};
Rchat.internal.init();
