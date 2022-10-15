class GUI {
    constructor() {
        this.wsocket = null;
        this.serviceLocation = `ws://${document.location.host}${document.location.pathname}chat/`;
        this.$nickName = null;
        this.$message = null;
        this.$chatWindow = null;
        this.room = '';
    }
    onMessageReceived(evt) {
        let msg = JSON.parse(evt.data);
        let $messageLine = `<tr><td class="received">${msg.received}
        </td><td class="user label label-info">${msg.sender}
        </td><td class="message badge">${msg.message}</td></tr>`;
        this.$chatWindow.innerHTML += $messageLine;
    }
    sendMessage() {
        let msg = { message: this.$message.value, sender: this.$nickName.value };
        this.wsocket.send(JSON.stringify(msg));
        this.$message.value = '';
        this.$message.focus();
    }
    connectToChatserver() {
        this.room = document.querySelector('#chatroom').value;
        this.wsocket = new WebSocket(this.serviceLocation + this.room);
        this.wsocket.onmessage = this.onMessageReceived.bind(this);
    }
    leaveRoom() {
        this.wsocket.close();
        this.$chatWindow.innerHTML = "";
        document.querySelector('.chat-wrapper').style.display = "none";
        document.querySelector('.chat-signin').style.display = "block";
        this.$nickName.focus();
    }
    init() {
        this.$nickName = document.querySelector('#nickname');
        this.$message = document.querySelector('#message');
        this.$chatWindow = document.querySelector('#response');
        document.querySelector('.chat-wrapper').style.display = "none";
        this.$nickName.focus();
        document.querySelector('#enterRoom').onclick = (evt => {
            evt.preventDefault();
            this.connectToChatserver();
            document.querySelector('.chat-wrapper h2').textContent = `Chat # ${this.$nickName.value}@${this.room}`;
            document.querySelector('.chat-signin').style.display = "none";
            document.querySelector('.chat-wrapper').style.display = "block";
            this.$message.focus();
        });
        document.querySelector('#do-chat').onsubmit = evt => {
            evt.preventDefault();
            this.sendMessage();
        };
        document.querySelector('#leave-room').onclick = this.leaveRoom.bind(this);
    };
}
let gui = new GUI();
gui.init();