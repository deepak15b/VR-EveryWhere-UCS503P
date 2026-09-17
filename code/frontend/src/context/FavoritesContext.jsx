import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const saved = localStorage.getItem(getFavoritesKey(user?.id));
    return saved ? JSON.parse(saved) : ["taj-mahal"]; // Taj Mahal favorited by default for demo
  });

  const [tourHistory, setTourHistory] = useState(() => {
    const saved = localStorage.getItem(getTourHistoryKey(user?.id));
    return saved ? JSON.parse(saved) : defaultTourHistory;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setFavorites([]);
      setTourHistory([]);
      return;
    }

    const savedFavorites = localStorage.getItem(getFavoritesKey(user.id));
    const savedTourHistory = localStorage.getItem(getTourHistoryKey(user.id));

    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : ["taj-mahal"]);
    setTourHistory(savedTourHistory ? JSON.parse(savedTourHistory) : defaultTourHistory);
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      localStorage.setItem(getFavoritesKey(user.id), JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user?.id]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      localStorage.setItem(getTourHistoryKey(user.id), JSON.stringify(tourHistory));
    }
  }, [tourHistory, isAuthenticated, user?.id]);

  const toggleFavorite = async (destinationId) => {
    if (!isAuthenticated) {
      return;
    }

    const isFav = favorites.includes(destinationId);
    let nextFavorites;
    if (isFav) {
      nextFavorites = favorites.filter((id) => id !== destinationId);
    } else {
      nextFavorites = [...favorites, destinationId];
    }
    setFavorites(nextFavorites);
    await api.toggleFavorite(destinationId, !isFav);
  };

  const isFavorite = (destinationId) => {
    return favorites.includes(destinationId);
  };

  const recordTourSession = (destination) => {
    const newEntry = {
      id: `hist-${Date.now()}`,
      destinationId: destination.id,
      destinationName: destination.name,
      visitedAt: new Date().toISOString(),
      durationMinutes: Math.floor(Math.random() * 8) + 5
    };
    setTourHistory((prev) => [newEntry, ...prev.slice(0, 19)]);
    api.logTourSession(destination.id, 300);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        tourHistory,
        recordTourSession,
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