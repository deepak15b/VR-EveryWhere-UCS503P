const USERS_STORAGE_KEY = 'vr_auth_users';

const DEFAULT_USERS = [
  {
    id: 'usr_student_1024',
    username: 'deepak_tiet',
    password: 'tiet2026',
    name: 'Deepak',
    email: 'deepak@thapar.edu',
    role: 'USER',
    joinedDate: 'September 2026',
  },
  {
    id: 'usr_demo_student',
    username: 'student_demo',
    password: 'password123',
    name: 'Student Demo',
    email: 'student@thapar.edu',
    role: 'USER',
    joinedDate: 'September 2026',
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
};