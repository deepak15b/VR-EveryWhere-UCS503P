import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('vr_user_favorites');
    return saved ? JSON.parse(saved) : ["taj-mahal"]; // Taj Mahal favorited by default for demo
  });

  const [tourHistory, setTourHistory] = useState(() => {
    const saved = localStorage.getItem('vr_tour_history');
    return saved ? JSON.parse(saved) : [
      {
        id: "hist-1",
        destinationId: "taj-mahal",
        destinationName: "Taj Mahal",
        visitedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
        durationMinutes: 12
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('vr_user_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('vr_tour_history', JSON.stringify(tourHistory));
  }, [tourHistory]);

  const toggleFavorite = async (destinationId) => {
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
