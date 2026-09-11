import React, { useState, useMemo } from 'react';
import { Search, Filter, Globe, MapPin, Sparkles } from 'lucide-react';
import { DESTINATIONS, CATEGORIES, CONTINENTS } from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedContinent, setSelectedContinent] = useState('All');

  // Filter destinations based on query, category, and continent
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
    });
  }, [searchQuery, selectedCategory, selectedContinent]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-cyan-400 mb-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Destination Explorer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Explore Virtual Destinations
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Search and filter across our curated collection of world-renowned historical sites and cultural wonders.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#0f1422] border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by destination (e.g. Taj Mahal, Colosseum, Peru, Giza)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs text-slate-400 font-semibold mr-1 shrink-0">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Continents */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-400 font-semibold">Region:</span>
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              {CONTINENTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-slate-400">
            Showing <strong className="text-cyan-400">{filteredDestinations.length}</strong> destination(s)
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedContinent !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedContinent('All');
              }}
              className="text-xs text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0f1422] rounded-2xl border border-dashed border-slate-800">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No destinations found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any destination matching "{searchQuery}". Try clearing search keywords or selecting another category.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
