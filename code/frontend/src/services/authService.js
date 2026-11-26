const USERS_STORAGE_KEY = 'vr_auth_users';

const DEFAULT_USERS = [
  {
    id: 'usr_demo_1',
    username: 'demo_user',
    password: 'password123',
    name: 'Demo Explorer',
    email: 'demo@vreverywhere.com',
    role: 'USER',
    joinedDate: 'November 2026',
  },
  {
    id: 'usr_demo_2',
    username: 'traveler',
    password: 'password123',
    name: 'Global Traveler',
    email: 'traveler@vreverywhere.com',
    role: 'USER',
    joinedDate: 'November 2026',
  },
];

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase();
}

function getStoredUsers() {
  const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (!savedUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }

  try {
    return JSON.parse(savedUsers);
  } catch {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function createDemoToken(userId) {
  return `local-auth-${userId}-${Date.now()}`;
}

export const authService = {
  async login(username, password) {
    await delay();

    const cleanUsername = normalizeUsername(username);
    const cleanPassword = String(password || '');

    if (!cleanUsername || !cleanPassword) {
      throw new Error('Please enter both username and password.');
    }

    const users = getStoredUsers();
    const user = users.find((item) => normalizeUsername(item.username) === cleanUsername);

    if (!user || user.password !== cleanPassword) {
      throw new Error('Invalid username or password.');
    }

    return {
      user: sanitizeUser(user),
      token: createDemoToken(user.id),
    };
  },

  async register(userData) {
    await delay();

    const username = normalizeUsername(userData.username);
    const password = String(userData.password || '');
    const name = String(userData.name || '').trim();
    const email = String(userData.email || '').trim().toLowerCase();

    if (!name || !email || !username || !password) {
      throw new Error('Please fill in all registration fields.');
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address.');
    }

    const users = getStoredUsers();
    const userExists = users.some(
      (item) => normalizeUsername(item.username) === username || item.email.toLowerCase() === email,
    );

    if (userExists) {
      throw new Error('An account with this username or email already exists.');
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      username,
      password,
      name,
      email,
      role: 'USER',
      joinedDate: new Date().toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      }),
    };

    saveUsers([...users, newUser]);

    return {
      user: sanitizeUser(newUser),
      token: createDemoToken(newUser.id),
    };
  },

  async lookupAccount(identifier) {
    await delay();

    const cleanId = String(identifier || '').trim().toLowerCase();
    if (!cleanId) {
      throw new Error('Please enter your registered email address or username.');
    }

    const users = getStoredUsers();
    const user = users.find(
      (item) => item.email.toLowerCase() === cleanId || normalizeUsername(item.username) === cleanId,
    );

    if (!user) {
      throw new Error('No account found matching this email address or username.');
    }

    return {
      username: user.username,
      email: user.email,
      name: user.name,
    };
  },

  async resetPassword(identifier, newPassword) {
    await delay();

    const cleanId = String(identifier || '').trim().toLowerCase();
    const cleanPassword = String(newPassword || '');

    if (!cleanId) {
      throw new Error('Please specify your registered email or username.');
    }

    if (!cleanPassword || cleanPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }

    const users = getStoredUsers();
    const userIndex = users.findIndex(
      (item) => item.email.toLowerCase() === cleanId || normalizeUsername(item.username) === cleanId,
    );

    if (userIndex === -1) {
      throw new Error('No account found to reset password.');
    }

    users[userIndex].password = cleanPassword;
    saveUsers(users);

    const updatedUser = users[userIndex];
    return {
      success: true,
      message: 'Password reset successfully! You can now log in.',
      user: sanitizeUser(updatedUser),
      token: createDemoToken(updatedUser.id),
    };
  },
};
