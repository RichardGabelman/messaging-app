import { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setSending(true);
    const success = await onSendMessage(content.trim());

    if (success) {
      setContent('');
    }
    setSending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        disabled={sending}
      />
      <button type="submit" disabled={sending || !content.trim()}>
        {sending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default MessageInput;