import React, { useState, useMemo } from 'react';
import { Search, Filter, Globe, MapPin, Sparkles, SlidersHorizontal } from 'lucide-react';
import { DESTINATIONS, CATEGORIES, CONTINENTS } from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'reviews' | 'name'

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesContinent =
        selectedContinent === 'All' || item.continent === selectedContinent;

      return matchesSearch && matchesCategory && matchesContinent;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedContinent, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-extrabold text-cyan-400 mb-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Destination Explorer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore 360° Virtual Destinations
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Filter through our curated collection of verified global heritage landmarks. Every site includes an interactive 360° spherical photosphere with walkable waypoints and audio guides.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#070d19]/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            placeholder="Search by destination name, country, or architecture (e.g. Taj Mahal, Rome, Paris, Gothic)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#030712] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
          />
        </div>

        {/* Filter Pills & Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-slate-800">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs text-slate-400 font-bold mr-1 shrink-0">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Continents & Sorting */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">Region:</span>
              <select
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400"
              >
                {CONTINENTS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Popular</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-cyan-400">{filteredDestinations.length}</strong> destinations with verified 360° photospheres
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedContinent !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedContinent('All');
              }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-[#070d19] border border-slate-800">
            <Sparkles className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Destinations Match Your Query</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search criteria or resetting filters to see available world sites.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
