package GlassBeard.GoodProductSorter;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class WebsocketGameHandler  extends TextWebSocketHandler {
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws IOException 
	{
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event","CONNECTED");
		//session.sendMessage(new TextMessage(msg.toString()));
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException 
	{
		JsonNode node = mapper.readTree(message.getPayload());
		ObjectNode msg = mapper.createObjectNode();
		switch(node.get("event").asText())
		{
			case "JOIN":
	
				break;
				
			case "INIT_GAME":
				msg.put("event", "INIT_GAME");		
				session.sendMessage(new TextMessage(msg.toString()));
				break;
				
			case "":
				break;
				
			case "REMOVE":
				break;
				
			default:
				break;
		}
	}
}
