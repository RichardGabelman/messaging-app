import Message from './Message';

const MessageList = ({ messages, currentUserId }) => {
  if (messages.length === 0) {
    return <div>No messages yet. Start the conversation!</div>
  }

  return (
    <div>
      {messages.map(message => (
        <Message 
          key={message.id}
          message={message}
          isOwn={message.senderId === currentUserId}
        />
      ))}
    </div>
  );
};

export default MessageList