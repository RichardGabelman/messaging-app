import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ConversationView = ({ otherUserId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token, user } = useAuth();

  useEffect(() => {
    const fetchConversation = async () => {
      setLoading(true);
      setError('');

      try {
        const conversation = await api.getConversation(token, otherUserId);

        setConversationId(conversation.id);
        setMessages(conversation.messages || []);

        const other = conversation.userA.id === user.id 
          ? conversation.userB 
          : conversation.userA;
        setOtherUser(other);

      } catch (err) {
        setError(err.message || 'Failed to load messages');
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [token, otherUserId, user.id]);

  const handleSendMessage = async (content) => {
    try {
      const newMessage = await api.sendMessage(token, conversationId, content);

      setMessages(prev => [...prev, {
        id: newMessage.id,
        content: newMessage.content,
        senderId: user.id,
        timestamp: newMessage.createdAt || new Date().toISOString()
      }]);

      return true;
    } catch (err) {
      console.log(err.message || 'Error sending message:', err);
      return false;
    }
  };

  if (loading) return <div>Loading conversation...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <header>
        <button onClick={onBack}>← Back</button>
        <h2>{otherUser?.username || `User ${otherUserId}`}</h2>
      </header>

      <MessageList messages={messages} currentUserId={user.id} />

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ConversationView;