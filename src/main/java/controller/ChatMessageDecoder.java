package controller;

import java.util.Date;

import jakarta.json.bind.JsonbBuilder;
import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;
import jakarta.websocket.EndpointConfig;

public class ChatMessageDecoder implements Decoder.Text<ChatMessage> {

    @Override
    public void init(final EndpointConfig config) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public ChatMessage decode(final String textMessage) throws DecodeException {
        ChatMessage msg = JsonbBuilder.create().fromJson(textMessage, ChatMessage.class);
        msg.setReceived(new Date());
        return msg;
    }

    @Override
    public boolean willDecode(final String s) {
        return true;
    }
}
