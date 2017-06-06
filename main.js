Rchat.version = Rchat.us.version;
Rchat.config = {
    html: "<div id='chat'><div id='chat_btn'>Chatbox</div><div id='chat_inner'><div id='chat_head'>Chatbox</div><div id='chat_content'></div><div id='chat_form'><input type='text' id='chat_form_input' placeholder='Scrie ceva...'></input><div id='chat_form_send'>Trimite</div></div></div></div>",
    add_html: function() {
        $("body").append(Rchat.config.html);
    },
    sel: [
        ".entry-content>div>div:not(:empty)",
        ".content>.clearfix>div:not(:empty)",
        "",
        ".post-entry>div:not(:empty)"
    ][Rchat.version],
    chatting: 1,
    topic: Rchat.us.topic,
    delay: Rchat.us.delay,
    sending: 0,
    ct: [],
    form_auth: "",
};
Rchat.init = function() {
    Rchat.config.add_html();
    Rchat.config.toggleSH($("#chat_btn"));
};
Rchat.config.toggleSH = function(elem) {
    elem.click(function(e) {
        $("#chat_inner").toggle().toggleClass("s");
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
        $.get("/t" + Rchat.config.topic + "-", function(data) {
            Rchat.config.form_auth = [$(data).find("[name='auth[]']").eq(0).val(), $(data).find("[name='auth[]']").eq(1).val()];
            var m = $(data).find(Rchat.config.sel),
                len = m.length,
                i = 0;
            if (m.length < Rchat.config.ct.length) {
                Rchat.config.ct = [];
                $("#chat_content").html("");
                for (i; i < len; i++) {
                    ct.push(m.eq(i).html());
                    $("#chat_content").append(m.eq(i).html());
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
            }, Rchat.config.delay)
        })
    };
};
Rchat.config.comp = function(name, avatar, mess) {
    return "<div id='chat_bl'><div id='chat_group'><div id='chat_avatar'><img src='" + avatar + "'/></div><div id='chat_name'>" + name + "</div></div><div id='chat_message'>" + mess + "</div></div>";
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
        Rchat.config.send(Rchat.config.comp(_userdata.username, _userdata.avatar.split("src=")[1].split("   ")[0].split("\"")[1], $("#chat_form_input").val()));
    });
};
    Rchat.init();
    Rchat.config.start_chat();
    Rchat.config.init_send();
