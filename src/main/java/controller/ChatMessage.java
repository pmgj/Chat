package controller;

import java.util.Date;

import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.annotation.JsonbDateFormat;

public class ChatMessage {

    private String message;
    private String sender;
    @JsonbDateFormat
    private Date received;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Date getReceived() {
        return received;
    }

    public void setReceived(Date received) {
        this.received = received;
    }

    public static void main(String[] args) {
        ChatMessage m = new ChatMessage();
        String s = JsonbBuilder.create().toJson(m);
        System.out.println(s);
        String json = "{\"message\": \"Olá!\", \"sender\": \"Paulo\"}";
        ChatMessage m1 = JsonbBuilder.create().fromJson(json, ChatMessage.class);
        System.out.println(m1);
    }
}
