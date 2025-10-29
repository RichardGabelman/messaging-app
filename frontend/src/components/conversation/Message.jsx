const Message = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${isOwn ? 'own-message' : 'other-message'}`}>
      <div>
        {message.content}
      </div>
      <div>
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
};

export default Message;