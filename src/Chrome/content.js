$(document).ready(function () {
    injectMarkup();
    initSidebar();
    initGuestbook();
    initPopover();
    new fairyDustCursor();
    $("body").removeClass("theme-dark");
});

function injectMarkup() {
    if ($("#content").css('backgroundColor') === 'rgba(0, 0, 0, 0)' && $("body").css('backgroundColor') !== 'rgba(0, 0, 0, 0)') {
        $("#content").css('backgroundColor', $("body").css('backgroundColor'));
    }

    // Header
    var _h = '';
    _h += '<div id="tm-header" class="bg-black-900 ta-center py24 overflow-hidden">';
    _h += '<div id="tm-scroll">';
    _h += '<img src="https://i.stack.imgur.com/TFzLS.gif" alt="Welcome to Stack Overflow" />';
    _h += '</div>';
    _h += '</div>';
    $("body").prepend(_h);

    // Unicorns?
    $("#left-sidebar").prepend('<img class="tm-unicorn-front" src="https://i.stack.imgur.com/lrSWK.png" alt="UNI..."/>');
    $(".container").append('<img class="tm-unicorn-back" src="https://i.stack.imgur.com/Pe85Z.png" alt="...CORN"/>');

    // Left sidebar link
    var _l = '';
    _l += '<div class="w100 ta-center fc-white ff-comic mt32">';
    _l += '<img class="w100 mb24" src="https://i.stack.imgur.com/1c2Mk.png" />';
    _l += '<p class="tt-uppercase fw-bold fs3 mb24">~Under Construction~</p>';
    _l += '<p class="mb0">Big changes for Y2K!</p>';
    _l += '<a href="#" class="js-tm-sidebar-toggle s-btn s-btn__primary d-inline-block fc-white td-none mt24">Go to the future</a>';
    _l += '<img class="w100 mt24" src="https://i.stack.imgur.com/1c2Mk.png" />';
    _l += '</div>';
    $("#left-sidebar nav").append(_l);

    // View Counter
    var __3 = $("#qinfo tr:nth-child(2) td:last-child .label-key b").text();
    console.log(__3);
    var __6 = __3.split(" ");
    var __9 = '<span id="tm-views">' + __6[0].replace(/,/g, "") + '</span> ' + __6[1];
    $("#qinfo tr:nth-child(2) td:last-child b").html(__9);

    var _f = ''; // Injected footer
    _f += '<div id="tm-footer">';
    _f += '<div id="tm-footer-top"></div>';
    _f += '<h1 class="ta-center"><img class="wmx100" src="https://i.stack.imgur.com/UtpOa.png" alt="Guestbook"></h1>';
    _f += '<div class="grid mx-auto wmx8 ff-comic fc-white md:fd-column">';
    _f += '<div class="js-tm-form-container tm-form-container grid--cell5 grid--cell12 p12 fc-white">';
    _f += '<form id="js-tm-form">';
    _f += '<p class="mb4"><label for="guestbook-name">Name:</label></p>';
    _f += '<input class="js-tm-name-input mb16 w100" type="text" name="guestbook-name" required />';
    _f += '<p class="mb4"><label for="guestbook-name">Comment:</label></p>';
    _f += '<textarea class="js-tm-comment-input w100 hs1 mb16" name="guestbook-comment" required></textarea>';
    _f += '<input id="js-tm-submit" class="w100" type="submit" value="Sign our guestbook!" />';
    _f += '</form>';
    _f += '</div>';
    _f += '<div class="js-tm-comments tm-comments grid--cell7 grid--cell12 p12 overflow-y-scroll bg-white">';
    _f += '</div>';
    _f += '</div>';
    _f += '<div id="tm-footer-bottom"></div>';
    _f += '</div>';
    $("#footer").prepend(_f);

    // Site footer
    $(".site-footer--copyright p")
        .before('<p class="fw-bold fc-white mb0 ff-comic fs-body1">Proudly built in Notepad</p>')
        .after('<p class="fw-bold fc-white ff-comic tt-uppercase fs-body1">Best viewed in <img class="d-inline-block" src="https://i.stack.imgur.com/9e5RT.png" alt="Netscape 3.0"></p>');


    // Gif injections
    var globe = '<img src="https://i.stack.imgur.com/Txh9N.gif" class="tm-globe" />';
    $("svg.svg-icon.iconGlobe").before(globe).remove();

    var yourAnswer = $("#post-form > .space");
    if (yourAnswer.length) {
        var answer_img = '<img src="https://i.stack.imgur.com/2TdH8.png" alt="Your Answer" />';
        yourAnswer.html(answer_img);
    }

    var $hnqHeadline = $("#hot-network-questions h4");
    if ($hnqHeadline.length) {
        var flame = '<img src="https://i.stack.imgur.com/74roz.gif" class="tm-fire" />';
        $hnqHeadline.append(flame).prepend(flame);
    }

    if (document.querySelector(".js-cursor-container") == null) {
        $("<span>").addClass("js-cursor-container").prependTo("#content > div");
    }
}

function initSidebar() {
    $(".js-tm-sidebar-toggle").click(function (e) {
        e.preventDefault();
        se.helpers.showFancyOverlay({ message: "To return to the future, disable the \"Stack Exchange 90's Theme\" userscript." });
    })
}

function initGuestbook() {
    populateGuestbook();
    bindGuestbook();

    // Randomly add items
    setInterval(function () {
        if (Math.floor(Math.random() * 3) === 0) {
            addRandomComment();
        }
    }, 300);
}

function initPopover() {
    var $popover = $(".js-toggle-popover");
    setTimeout(function () {
        $popover.insertBefore(".js-time-machine-button").removeClass("d-none").addClass("is-visible");
    }, 1000 * 4);

    $(document).on("click touchstart", ".js-time-machine-button, .js-toggle-popover-close", function () {
        $popover.remove();
        $.cookie("tm2019d", "1", { path: '/', expires: 2 });
    });
}

function populateGuestbook() {
    for (var i = 0; i < 10; i++) {
        addRandomComment();
    }
}

function bindGuestbook() {
    $("#js-tm-form").submit(function (e) {
        e.preventDefault();

        var $name = $(".js-tm-name-input");
        var $comment = $(".js-tm-comment-input");

        if ($name.val().length === 0 || $comment.val().length === 0) return;

        addComment($name.val(), $comment.val());

        $name.val(null);
        $comment.val(null);
    })
}

function addRandomComment() {
    var names = [
        "adam",
        "jane",
        "meg",
        "jon",
        "josh",
        "lisa",
        "brian"
    ];
    var comments = [
        "Is this an April Fool's joke?",
        "this is for april 1",
        "april fools :)",
        "Where's the webring? :(",
        "check out this song! http://myspace.com/soeb__42345",
        "FIIIIIIIRRRSSSSTTTTTTT",
        "...",
        "lol",
        "lol jk",
        "testing.",
        "the unicorns are genius",
        "did they kill sparkles???",
        "fireballs would have been better",
        "I forgot about <marquee> lol",
        "<marquee> !!!",
        "What about <blink>?",
        "testing...",
        "test test test",
        "does this wor",
        "OMG HAHAHA",
        "omg",
        "heh.",
        "hehehe",
        "I think they got haxxxed",
        "There are so many better things for the devs to do.",
        "I guess it's April :P",
        "f",
        "it's almost Y2K!!!",
        "what browser are you using?",
        "netscape 4.05",
        "ff",
        "DHTML!",
        "Flash"
    ];

    addComment(names[Math.floor(Math.random() * names.length)], comments[Math.floor(Math.random() * comments.length)])
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function addComment(name, comment) {

    var content = '<div class="ff-comic fc-fuschia bb bbw2 bc-black-3 fs-body3 p12">';
    content += '<p class="mb4">' + escapeHtml(comment) + '</p>';
    content += '<p class="tm-comment-info ff-times fs-caption">@' + escapeHtml(name) + ' - 2019/04/01</p>'
    content += '</div>';

    $(".js-tm-comments").prepend(content);
}