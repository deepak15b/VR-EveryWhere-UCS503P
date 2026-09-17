/**
 * API Service for VR Everywhere
 * Connects to Spring Boot REST API (default http://localhost:8080/api)
 * Features auto-fallback to local mock data when backend is not running.
 */

import { DESTINATIONS } from '../data/destinationsData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('vr_auth_token') || null;
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
    try {
      const response = await fetch(`${BASE_URL}/destinations`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.info('Backend unavailable or offline. Using local destination catalogue fallback:', err.message);
      return DESTINATIONS;
    }
  }

  // Fetch destination by ID
  async getDestinationById(id) {
    try {
      const response = await fetch(`${BASE_URL}/destinations/${id}`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.info(`Backend offline. Loading local fallback for destination [${id}]`);
      const dest = DESTINATIONS.find((d) => d.id === id);
      if (dest) return dest;
      throw new Error('Destination not found');
    }
  }

  // User Login (Spring Security + JWT)
  async login(username, password) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (err) {
      console.info('Backend auth offline, using demo authenticated session:', err.message);
      // Demo session fallback
      const mockUser = {
        id: "usr_student_1024",
        username: username || "deepak_tiet",
        name: username === "deepak_tiet" ? "Deepak" : (username || "Explorer"),
        email: `${username || 'student'}@thapar.edu`,
        role: "USER",
        joinedDate: "September 2026",
        token: "mock-jwt-token-ucs503p"
      };
      this.setToken(mockUser.token);
      return { user: mockUser, token: mockUser.token };
    }
  }

  // User Signup
  async register(userData) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Registration failed');
      const data = await response.json();
      this.setToken(data.token);
      return data;
    } catch (err) {
      console.info('Backend registration offline, creating local session');
      const mockUser = {
        id: `usr_${Date.now()}`,
        username: userData.username,
        name: userData.name || userData.username,
        email: userData.email,
        role: "USER",
        joinedDate: "September 2026",
        token: "mock-jwt-token-ucs503p"
      };
      this.setToken(mockUser.token);
      return { user: mockUser, token: mockUser.token };
    }
  }

  // Save Favorite
  async toggleFavorite(destinationId, isFavorite) {
    try {
      const response = await fetch(`${BASE_URL}/favorites/${destinationId}`, {
        method: isFavorite ? 'POST' : 'DELETE',
        headers: this.getHeaders(),
      });
      return response.ok;
    } catch {
      return true; // Local storage handles persistence
    }
  }

  // Record completed/entered tour
  async logTourSession(destinationId, durationSeconds = 60) {
    try {
      await fetch(`${BASE_URL}/history`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ destinationId, durationSeconds, timestamp: new Date().toISOString() }),
      });
    } catch {
      // Local fallback logged in context
    }
  }
}

export const api = new ApiService();
export default api;
