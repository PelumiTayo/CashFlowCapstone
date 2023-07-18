import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import Cashbot from "../../assets/cashbot.png";

//API key is hidden
const API_KEY = import.meta.env.VITE_API_KEY;

export default function CashBot() {
  const [isCashbotOpen, setIsCashbotOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm CashBot! I'm here to assist you on your CashFlow journey!",
      sender: "CashBot",
    },
  ]);

  //function for when cashbot is open
  const handleOpenCashbot = () => {
    setIsCashbotOpen(!isCashbotOpen);
    console.log("cashbot");
    console.log(isCashbotOpen);
  };

  // this function is for when the user is sending a message.
  const handleSend = async (message) => {
    const newMessage = {
      message: message, // the message itself
      sender: "user", // the one who is sending the message
      direction: "outgoing", // the direction of cashbot's message showing up on the right side.
    };

    //all the old messages (messages) + new message (newMessage)
    const newMessages = [...messages, newMessage];
    //update messages state
    setMessages(newMessages);
    //setup a typing indicator (CashBot is typing)
    setTyping(true);
    //process message to chatGPT (send it over and see the response )
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    //chatMessages { sender:'user' or 'cashbot', message:'the message content here'}
    //apiMessages {role:'user' or 'assistant', content:'the message content here'}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "CashBot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }; // what is messageObject?
    });
    // role:"user" -> a message from the user,
    // role:"assistant" -> a response from chatGPT,
    // role:"system" -> an initial message defining HOW we want chaptGPT to talk

    const systemMessage = {
      role: "system",
      content:
        "Explain all concepts like I am a college student who wants to learn more about financial literacy, respond in short concise sentences",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1, message2,message3, etc]
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody), // turn the JSON into a string of text
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data); // when we first make the request to chatGPT, get it in data form
        console.log(data.choices[0].message.content); // data.choices[0].message.content is how we are getting the actual message.
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "CashBot",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <>
      {isCashbotOpen ? ( //terenary operator for cashbot, the chatbox shows when cashbot is "true"
        <div style={{ position: "relative", height: "500px", width: "400px" }}>
          <img
            src={Cashbot}
            alt="Cashbot for CashFlow Academy"
            onClick={handleOpenCashbot}
          />
          <MainContainer>
            <ChatContainer
              style={{ position: "relative", height: "500px", width: "400px" }}
            >
              <MessageList
                style={{ color: "red" }}
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="CashBot is typing" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      ) : ( // users only see the cashbot when the operator is false.
        <img
          src={Cashbot}
          alt="Cashbot for CashFlow Academy"
          onClick={handleOpenCashbot}
        />
      )}
    </>
  );
}
