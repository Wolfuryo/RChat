Rchat.config.add_html=function(){
$("body").append(Rchat.config.html);
};
Rchat.config.sel="#chat_sis";
Rchat.config.chatting=1;
Rchat.config.sending=0;
    Rchat.config.ct=[];
        Rchat.config.form_auth="";
    Rchat.init = function() {
        Rchat.config.add_html();
        Rchat.config.toggleSH($("#chat_btn"));
    };
    Rchat.config.toggleSH = function(elem) {
        elem.click(function(e) {
            $("#chat_inner").toggle().toggleClass("s");
            if ($("#chat_inner").css("display") == "none") {
                localStorage.activc = "0";
            } else {
                localStorage.activc = "1";
            };
            e.preventDefault();
        });
    };
    Rchat.config.start_chat = function() {
        Rchat.config.chatting = 1;
        Rchat.config.receive();
    };
    Rchat.config.stop_chat = function() {
        Rchat.config.chatting = 0;
    };
    Rchat.config.receive = function() {
        if (Rchat.config.chatting) {
            if (localStorage.activc == "1") {
                $.get("/t" + Rchat.config.topic + "-?view=newest", function(data) {
                    if ($("#chat_content>center").length) $("#chat_content>center").remove();
                    Rchat.config.form_auth = [$(data).find("[name='auth[]']").eq(0).val(), $(data).find("[name='auth[]']").eq(1).val()];
                    var m = $(data).find(Rchat.config.sel),
                        len = m.length,
                        i = 0;
                    if (len < Rchat.config.ct.length) {
                        Rchat.config.ct = [];
                        $("#chat_content").html("");
                        for (i; i < len; i++) {
                            Rchat.config.ct.push(m.eq(i).html());
                            $("#chat_content").append(m.eq(i).html());
                            $('#chat_content').scrollTop($('#chat_content')[0].scrollHeight);
                        };
                    } else {
                        for (i; i < len; i++) {
                            if (m.eq(i).html() != Rchat.config.ct[i] && i < Rchat.config.ct.length) {
                                Rchat.config.ct[i] = m.eq(i).html();
                                $("#chat_content>div").eq(i).html(m.eq(i).html());
                            } else {
                                if (m.eq(i).html() != Rchat.config.ct[i]) {
                                    $("#chat_content").append(m.eq(i).html());
                                    Rchat.config.ct[i] = m.eq(i).html();
                                }
                            };
                        };
                    };
                    setTimeout(function() {
                        Rchat.config.receive();
                    }, Rchat.config.delay);
                })
            } else {
                setTimeout(function() {
                    Rchat.config.receive();
                }, Rchat.config.delay);
            };
        };
    };
    Rchat.config.comp = function(name, avatar, mess) {
        return "<div id='chat_sis'><div id='chat_bl'><div id='chat_group'><div id='chat_avatar'><img src='" + avatar + "'/></div><div id='chat_name'>" + name + "</div></div><div id='chat_message'>" + mess + "</div></div></div>";
    };
    Rchat.config.send = function(m) {
        if (!Rchat.config.sending) {
            Rchat.config.sending = 1;
            $.post("/post", {
                t: Rchat.config.topic,
                mode: 'reply',
                post: 'OK',
                message: m,
                auth: Rchat.config.form_auth
            }).always(function() {
                Rchat.config.sending = 0;
            });
        };
    };
    Rchat.config.init_send = function() {
        $("#chat_form_send").click(function() {
            Rchat.config.send(Rchat.config.comp(_userdata.username, _userdata.avatar.split("src=")[1].split("   ")[0].split(""")[1], $("#chat_form_input").val()));
            $("#chat_form_input").val("");
        });
    };
   
