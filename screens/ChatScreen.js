import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: inputText },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY',
          },
        }
      );

      const newChatHistory = [
        ...chatHistory,
        { role: 'user', content: inputText },
        { role: 'assistant', content: response.data.choices[0].message.content.trim() },
      ];
      setChatHistory(newChatHistory);
      setInputText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {chatHistory.map((message, index) => (
        <Text key={index} style={{ color: message.role === 'user' ? 'blue' : 'green' }}>
          {message.content}
        </Text>
      ))}
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
