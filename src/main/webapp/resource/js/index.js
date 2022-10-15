let wsocket;
let serviceLocation = `ws://${document.location.host}${document.location.pathname}chat/`;
let $nickName;
let $message;
let $chatWindow;
let room = '';

function onMessageReceived(evt) {
    let msg = JSON.parse(evt.data);
    let $messageLine = $(`<tr><td class="received">${msg.received}
        </td><td class="user label label-info">${msg.sender}
        </td><td class="message badge">${msg.message}
        </td></tr>`);
    $chatWindow.append($messageLine);
}
function sendMessage() {
    let msg = { message: $message.val(), sender: $nickName.val(), "received": "" };
    wsocket.send(JSON.stringify(msg));
    $message.val('').focus();
}

function connectToChatserver() {
    room = $('#chatroom option:selected').val();
    wsocket = new WebSocket(serviceLocation + room);
    wsocket.onmessage = onMessageReceived;
}

function leaveRoom() {
    wsocket.close();
    $chatWindow.empty();
    $('.chat-wrapper').hide();
    $('.chat-signin').show();
    $nickName.focus();
}

$(document).ready(() => {
    $nickName = $('#nickname');
    $message = $('#message');
    $chatWindow = $('#response');
    $('.chat-wrapper').hide();
    $nickName.focus();

    $('#enterRoom').click(evt => {
        evt.preventDefault();
        connectToChatserver();
        $('.chat-wrapper h2').text(`Chat # ${$nickName.val()}@${room}`);
        $('.chat-signin').hide();
        $('.chat-wrapper').show();
        $message.focus();
    });
    $('#do-chat').submit(evt => {
        evt.preventDefault();
        sendMessage();
    });

    $('#leave-room').click(() => leaveRoom());
});
