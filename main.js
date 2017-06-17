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
Rchat.internal.vars.oc=[];
Rchat.internal.get_data=function(){
if(!Rchat.config.receiving) return;
$.get("/t"+Rchat.config.topic+"-?view=newest", function(data){
var data_chats=$("#chat_sis", data);
alert(data_chats.eq(0).html());
var len=data_chats.length;
var i=0;
if(len<Rchat.internal.vars.oc.length) {
Rchat.internal.vars.oc=[];
$("#chat_content").empty();
for(i;i<len;i++){
Rchat.internal.vars.oc.push(m.eq(i).html());
$("#chat_content").append(data_chats.eq(i).html());
$('#chat_content').scrollTop($('#chat_content')[0].scrollHeight);
};
} else {
for(i;i<len;i++){
if (data_chats.eq(i).html()!=Rchat.internal.vars.oc[i] && i<Rchat.internal.vars.oc.length) {
Rchat.internal.vars.oc[i]=data_chats.eq(i).html();
$("#chat_content>div").eq(i).html(data_chast.eq(i).html());
} else {
if (data_chats.eq(i).html()!=Rchat.internal.vars.oc[i]){
$("#chat_content").append(data_chats.eq(i).html());
$('#chat_content').scrollTop($('#chat_content')[0].scrollHeight);
Rchat.internal.vars.oc[i]=data_chats.eq(i).html();
}
};
};
};
setTimeout(function(){
Rchat.internal.get_data();
}, Rchat.config.delay);
});
};
Rchat.internal.init();
