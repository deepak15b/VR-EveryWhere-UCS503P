import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();
const getFavoritesKey = (userId) => `vr_user_favorites_${userId || 'anonymous'}`;
const getTourHistoryKey = (userId) => `vr_tour_history_${userId || 'anonymous'}`;

const defaultTourHistory = [
  {
    id: "hist-1",
    destinationId: "taj-mahal",
    destinationName: "Taj Mahal",
    visitedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    durationMinutes: 12
  }
];

export function FavoritesProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  const [favorites, setFavorites] = useState(() => {
    if (!user || user?.isGuest) {
      const anonSaved = localStorage.getItem('vr_user_favorites_anonymous');
      if (anonSaved === '["taj-mahal"]') {
        localStorage.removeItem('vr_user_favorites_anonymous');
        return [];
      }
      return anonSaved ? JSON.parse(anonSaved) : [];
    }
    const saved = localStorage.getItem(getFavoritesKey(user.id));
    return saved ? JSON.parse(saved) : [];
  });

  const [tourHistory, setTourHistory] = useState(() => {
    if (!user || user?.isGuest) {
      return [];
    }
    const saved = localStorage.getItem(getTourHistoryKey(user.id));
    return saved ? JSON.parse(saved) : defaultTourHistory;
  });

  useEffect(() => {
    if (!user || user?.isGuest) {
      const anonSaved = localStorage.getItem('vr_user_favorites_anonymous');
      if (anonSaved === '["taj-mahal"]') {
        localStorage.removeItem('vr_user_favorites_anonymous');
        setFavorites([]);
      } else {
        setFavorites(anonSaved ? JSON.parse(anonSaved) : []);
      }
      setTourHistory([]);
      return;
    }

    const keyFav = getFavoritesKey(user.id);
    const keyHist = getTourHistoryKey(user.id);

    const savedFavorites = localStorage.getItem(keyFav);
    const savedTourHistory = localStorage.getItem(keyHist);

    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    setTourHistory(savedTourHistory ? JSON.parse(savedTourHistory) : defaultTourHistory);
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    const keyFav = getFavoritesKey(user?.id);
    localStorage.setItem(keyFav, JSON.stringify(favorites));
  }, [favorites, user?.id]);

  useEffect(() => {
    const keyHist = getTourHistoryKey(user?.id);
    localStorage.setItem(keyHist, JSON.stringify(tourHistory));
  }, [tourHistory, user?.id]);

  const toggleFavorite = useCallback(async (destinationId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(destinationId);
      const nextFavorites = isFav ? prev.filter((id) => id !== destinationId) : [...prev, destinationId];
      if (isAuthenticated) {
        api.toggleFavorite(destinationId, !isFav).catch(() => {});
      }
      return nextFavorites;
    });
  }, [isAuthenticated]);

  const isFavorite = useCallback((destinationId) => {
    return favorites.includes(destinationId);
  }, [favorites]);

  const recordTourSession = useCallback((destination) => {
    if (!destination) return;
    const newEntry = {
      id: `hist-${Date.now()}`,
      destinationId: destination.id,
      destinationName: destination.name,
      visitedAt: new Date().toISOString(),
      durationMinutes: Math.floor(Math.random() * 8) + 5
    };
    setTourHistory((prev) => [newEntry, ...prev.slice(0, 19)]);
    api.logTourSession(destination.id, 300);
  }, []);

  const logHotspotInteraction = useCallback((destinationId) => {
    try {
      const statsKey = 'vr_session_stats';
      const raw = localStorage.getItem(statsKey);
      const stats = raw ? JSON.parse(raw) : { totalHotspotsInteracted: 0, byDestination: {} };
      stats.totalHotspotsInteracted = (stats.totalHotspotsInteracted || 0) + 1;
      if (destinationId) {
        stats.byDestination[destinationId] = (stats.byDestination[destinationId] || 0) + 1;
      }
      localStorage.setItem(statsKey, JSON.stringify(stats));
    } catch (e) {}
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        tourHistory,
        recordTourSession,
        logHotspotInteraction,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}