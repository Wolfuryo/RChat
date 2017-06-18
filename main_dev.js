Rchat.internal = {};
Rchat.internal.init = function() {
if(!localStorage.chat_op) localStorage.setItem("chat_op", "0");
    $("body").append(Rchat.config.html);
    if(!_userdata.session_logged_in && Rchat.config.allow_guests){
Rchat.internal.get_lt();
};
    Rchat.internal.op_cl($("#chat_btn"));
    Rchat.internal.vars.receiving = 1;
    Rchat.internal.get_data();
    Rchat.internal.init_send();
    Rchat.internal.smilies_init();
};
Rchat.internal.op_cl = function(elem) {
    if (localStorage.getItem("chat_op") == "1") {
        $("#chat_inner").toggleClass("chat_open");
        Rchat.internal.vars.receiving = 1;
    };
    elem.click(function(e) {
        $("#chat_inner").toggleClass("chat_open");
        localStorage.setItem("chat_op", $("#chat_inner").hasClass("chat_open") ? "1" : "0");
if(localStorage.chat_op=="1" && !$("#chat_btn_notif").text()=="0"){     
$("#chat_btn_notif").text("0");
$('#chat_content').scrollTop($('#chat_content')[0].scrollHeight);
};
    });
};
Rchat.internal.vars = {};
Rchat.internal.vars.sending = 0;
Rchat.internal.vars.receiving = 1;
Rchat.internal.vars.mess_per_page = 20;
Rchat.internal.vars.ct = [];
Rchat.internal.vars.auth_data = [];
Rchat.internal.get_data = function() {
    if (Rchat.internal.vars.receiving) {
        $.get("/t" + Rchat.config.topic + "-?view=newest", function(data) {
            if ($("#chat_content>center").length) $("#chat_content>center").remove();
            var m = $("#chat_sis", data),
                len = m.length,
                i = 0;
            Rchat.internal.vars.auth_data = [$("[name='auth[]']", data).eq(0).val(), $("[name='auth[]']", data).eq(1).val()];
            if (len < Rchat.internal.vars.ct.length) {
                Rchat.internal.vars.ct = [];
                $("#chat_content").empty();
                for (i; i < len; i++) {
                    Rchat.internal.vars.ct.push(m.eq(i).html());
                    $("#chat_content").append(m.eq(i).html());
                    if(localStorage.chat_op=="0" && m.eq(i).html().split(_userdata.username).length==1){
$("#chat_btn_notif").text(parseInt($("#chat_btn_notif").text().match(/\d+/))+1);
};
                    $('#chat_content').scrollTop($('#chat_content')[0].scrollHeight);
                };
            } else {
                for (i; i < len; i++) {
                    if (m.eq(i).html() != Rchat.internal.vars.ct[i] && i < Rchat.internal.vars.ct.length) {
                        Rchat.internal.vars.ct[i] = m.eq(i).html();
                        $("#chat_content>div").eq(i).html(m.eq(i).html());
                    } else {
                        if (m.eq(i).html() != Rchat.internal.vars.ct[i]) {
                            $("#chat_content").append(m.eq(i).html());
if(localStorage.chat_op=="0" && m.eq(i).html().split(_userdata.username).length==1){
$("#chat_btn_notif").text(parseInt($("#chat_btn_notif").text().match(/\d+/))+1);
};
                            $('#chat_content').scrollTop($('#chat_content')[0].scrollHeight);
                            Rchat.internal.vars.ct[i] = m.eq(i).html();
                        }
                    };
                };
            };
            setTimeout(function() {
                Rchat.internal.get_data();
            }, Rchat.config.delay);
        });
    } else {
        setTimeout(function() {
            Rchat.internal.get_data();
        }, Rchat.config.delay);
    };
};
Rchat.internal.get_lt=function(){
if(localStorage.getItem("lt"+Rchat.config.topic)){
Rchat.internal.vars.lt=localStorage.getItem("lt"+Rchat.config.topic);
} else {
$.get("/post?t="+Rchat.config.topic+"&mode=reply", function(data){
Rchat.internal.vars.lt=$("[name='lt'], data").val();
localStorage.setItem("lt"+Rchat.config.topic, Rchat.internal.vars.lt);
})
}
};
Rchat.internal.comp = function(m) {
    return "<div id=\"chat_sis\" class=\"chat\"><div id=\"chat_bl\"><div id=\"chat_group\"><div id=\"chat_avatar\"><img src=\"" + _userdata.avatar.match(/"(.+?)(?=")/)[1] + "\"/></div><div id=\"chat_name\">" + _userdata.username + "</div></div><div id=\"chat_message\">" + m + "</div></div></div>";
};
Rchat.internal.send = function(me) {
    if (Rchat.internal.vars.sending) return;
    if (me.length == 0) {
        $("#chat_btts").after("<div id='send_fail'>Nu poti trimite un mesaj gol</div>");
        setTimeout(function() {
            $("#send_fail").fadeOut(function() {
                $("#send_fail").remove();
            });
        }, 2000);
        return;
    };
    Rchat.internal.vars.sending = 1;
    $("#chat_form_send").toggleClass("act_bt");
if(_userdata.session_logged_in){
    $.post("/post", {
        mode: "reply",
        t: Rchat.config.topic,
        message: Rchat.internal.comp(me),
        post: "Ok",
        auth: Rchat.internal.vars.auth_data
    }, function() {
        RRchat.internal.after_send();
    });
} else {
$.post("/post", {
        mode: "reply",
        t: Rchat.config.topic,
        message: Rchat.internal.comp(me),
        post: "Ok",
        auth: Rchat.internal.vars.auth_data,
        lt: Rchat.internal.vars.lt
    }, function() {
        RRchat.internal.after_send();
    });
};
Rchat.internal.after_send=function(){
Rchat.internal.vars.sending = 0;
        $(".act_bt").removeClass("act_bt");
};
Rchat.internal.init_send = function() {
    $("#chat_form_send").click(function() {
        Rchat.internal.send($("#chat_form_input").val());
        $("#chat_form_input").val("");
    });
};
/*By Snorvgarg*/
function iAC(areaId, text) {
    var txtarea = document.getElementById(areaId);
    if (!txtarea) {
        return;
    }

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br == "ff") {
        strPos = txtarea.selectionStart;
    }

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
    } else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
}
/*By Snorvgarg*/
Rchat.internal.smilies = {};
Rchat.internal.smilies.populate = function() {
    var af;
    if (localStorage.emo != undefined) {
        af = localStorage.emo;

        $("#chat_smi_pop").append(af.replace(/alt/g, "data_emoji"));
        $("[data_emoji]").wrap("<span></span>");
        $("[data_emoji]").click(function(e) {
            iAC("chat_form_input", $(this).attr("data_emoji"));
        })
    } else {
        $.get("/smilies.forum?mode=smilies_frame", function(data) {
            af = $(data).filter(".smiley-element").html();
            localStorage.emo = af;

            $("#chat_smi_pop").append(af.replace(/alt/g, "data_emoji"));
            $("[data_emoji]").wrap("<span></span>");
            $("[data_emoji]").click(function(e) {
                iAC("chat_form_input", $(this).attr("data_emoji"));
            })
        });
    };

};
Rchat.internal.smilies_bind = function() {
    if ($("#chat_smi_pop").length == 1) {
        $("#chat_smi_pop").remove();
    } else {
        $("#chat_form").append("<div id='chat_smi_pop'><div id='chat_smi_pop_head'>Emoji</div></div>");
        Rchat.internal.smilies.populate();

    };
};
Rchat.internal.smilies_init = function() {
    $("#chat_smilies").click(function(e) {
        Rchat.internal.smilies_bind();
    });
};
Rchat.internal.init();
