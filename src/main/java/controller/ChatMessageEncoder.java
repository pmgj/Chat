package controller;

import jakarta.json.Json;
import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;
import jakarta.websocket.EndpointConfig;

public class ChatMessageEncoder implements Encoder.Text<ChatMessage> {

    @Override
    public void init(final EndpointConfig config) {
    }

    @Override
    public void destroy() {
    }

    @Override
    public String encode(final ChatMessage chatMessage) throws EncodeException {
        return Json.createObjectBuilder()
                .add("message", chatMessage.getMessage())
                .add("sender", chatMessage.getSender())
                .add("received", chatMessage.getReceived().toString()).build()
                .toString();
    }
}
