const API_BASE = import.meta.env.API_URL;

export const api = {
  login: async (username, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },
  signup: async (username, password) => {
    const res = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json();
  },
  getUsers: async (token) => {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  getMessages: async (token, otherUserId) => {
    const res = await fetch(`${API_BASE}/messages/${otherUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
  sendMessage: async (token, recipientId, content) => {
    const res = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipientId, content }),
    });
    return res.json();
  },
};
