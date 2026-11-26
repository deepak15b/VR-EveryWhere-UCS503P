/**
 * API Service for VR Everywhere
 * Connects to Spring Boot REST API (default http://localhost:8080/api)
 * Features graceful auto-detection and fallback to local mock data when backend is not running.
 */

import { DESTINATIONS } from '../data/destinationsData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('vr_auth_token') || null;
    this.isBackendOnline = null; // null = untested, false = offline, true = online
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('vr_auth_token', token);
    } else {
      localStorage.removeItem('vr_auth_token');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  // Fetch all destinations
  async getDestinations() {
    if (this.isBackendOnline === false) {
      return DESTINATIONS;
    }

    try {
      const response = await fetch(`${BASE_URL}/destinations`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        this.isBackendOnline = false;
        return DESTINATIONS;
      }
      const data = await response.json();
      if (data.status === 'offline') {
        this.isBackendOnline = false;
        return DESTINATIONS;
      }
      this.isBackendOnline = true;
      return data;
    } catch {
      this.isBackendOnline = false;
      return DESTINATIONS;
    }
  }

  // Fetch destination by ID
  async getDestinationById(id) {
    if (this.isBackendOnline === false) {
      const dest = DESTINATIONS.find((d) => d.id === id);
      if (dest) return dest;
      throw new Error('Destination not found');
    }

    try {
      const response = await fetch(`${BASE_URL}/destinations/${id}`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) {
        this.isBackendOnline = false;
        const dest = DESTINATIONS.find((d) => d.id === id);
        if (dest) return dest;
        throw new Error('Destination not found');
      }
      const data = await response.json();
      if (data.status === 'offline') {
        this.isBackendOnline = false;
        const dest = DESTINATIONS.find((d) => d.id === id);
        if (dest) return dest;
      }
      return data;
    } catch {
      this.isBackendOnline = false;
      const dest = DESTINATIONS.find((d) => d.id === id);
      if (dest) return dest;
      throw new Error('Destination not found');
    }
  }

  // User Login (Spring Security + JWT)
  async login(username, password) {
    if (this.isBackendOnline === false) {
      return this.mockLogin(username);
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      if (data.status === 'offline') {
        this.isBackendOnline = false;
        return this.mockLogin(username);
      }
      this.setToken(data.token);
      this.isBackendOnline = true;
      return data;
    } catch {
      this.isBackendOnline = false;
      return this.mockLogin(username);
    }
  }

  mockLogin(username) {
    const mockUser = {
      id: `usr_${Date.now()}`,
      username: username || 'explorer',
      name: username ? (username.charAt(0).toUpperCase() + username.slice(1)) : 'Explorer',
      email: `${username || 'explorer'}@travel.com`,
      role: 'USER',
      joinedDate: 'November 2026',
      token: `jwt-token-${Date.now()}`
    };
    this.setToken(mockUser.token);
    return { user: mockUser, token: mockUser.token };
  }

  // User Signup
  async register(userData) {
    if (this.isBackendOnline === false) {
      return this.mockRegister(userData);
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Registration failed');
      const data = await response.json();
      if (data.status === 'offline') {
        this.isBackendOnline = false;
        return this.mockRegister(userData);
      }
      this.setToken(data.token);
      this.isBackendOnline = true;
      return data;
    } catch {
      this.isBackendOnline = false;
      return this.mockRegister(userData);
    }
  }

  mockRegister(userData) {
    const mockUser = {
      id: `usr_${Date.now()}`,
      username: userData.username,
      name: userData.name || userData.username,
      email: userData.email,
      role: "USER",
      joinedDate: "November 2026",
      token: `jwt-token-${Date.now()}`
    };
    this.setToken(mockUser.token);
    return { user: mockUser, token: mockUser.token };
  }

  // Save Favorite
  async toggleFavorite(destinationId, isFavorite) {
    if (this.isBackendOnline === false) return true;

    try {
      const response = await fetch(`${BASE_URL}/favorites/${destinationId}`, {
        method: isFavorite ? 'POST' : 'DELETE',
        headers: this.getHeaders(),
      });
      if (!response.ok) this.isBackendOnline = false;
      return response.ok;
    } catch {
      this.isBackendOnline = false;
      return true;
    }
  }

  // Record completed/entered tour
  async logTourSession(destinationId, durationSeconds = 60) {
    if (this.isBackendOnline === false) return;

    try {
      const response = await fetch(`${BASE_URL}/history`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ destinationId, durationSeconds, timestamp: new Date().toISOString() }),
      });
      if (!response.ok) {
        this.isBackendOnline = false;
      }
    } catch {
      this.isBackendOnline = false;
    }
  }
}

export const api = new ApiService();
export default api;
