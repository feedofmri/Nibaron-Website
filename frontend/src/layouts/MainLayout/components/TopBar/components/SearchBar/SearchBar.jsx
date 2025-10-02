import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../../../../../../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 300);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nibaron_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const performSearch = async (searchQuery) => {
    setIsLoading(true);
    try {
      // Replace mockResults with real API call
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    if (value.trim()) {
      setIsLoading(true);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      addToRecentSearches(query.trim());
      navigate(`/marketplace?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (result) => {
    addToRecentSearches(result.title);

    switch (result.type) {
      case 'product':
        navigate(`/products/${result.id}`);
        break;
      case 'farmer':
        navigate(`/farmers/${result.id}`);
        break;
      case 'category':
        navigate(`/marketplace?category=${result.title.toLowerCase()}`);
        break;
      default:
        navigate(`/marketplace?search=${encodeURIComponent(result.title)}`);
    }

    setQuery(result.title);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    navigate(`/marketplace?search=${encodeURIComponent(searchTerm)}`);
    setIsOpen(false);
  };

  const addToRecentSearches = (searchTerm) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('nibaron_recent_searches', JSON.stringify(updated));
  };

  const clearQuery = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'product': return '🌾';
      case 'farmer': return '👨‍🌾';
      case 'category': return '📂';
      default: return '🔍';
    }
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-container">
          <Search size={20} className="search-icon" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder="Search crops, farmers, regions..."
            className="search-input"
            autoComplete="off"
          />

          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="clear-button"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="search-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading && (
              <div className="search-loading">
                <div className="loading-spinner" />
                <span>Searching...</span>
              </div>
            )}

            {!isLoading && query && results.length > 0 && (
              <div className="search-results">
                <div className="results-header">
                  <span className="results-count">{results.length} results</span>
                </div>

                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    className="result-item"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="result-icon">
                      {result.image ? (
                        <img src={result.image} alt="" className="result-image" />
                      ) : (
                        <span className="result-emoji">{getResultIcon(result.type)}</span>
                      )}
                    </div>

                    <div className="result-content">
                      <div className="result-title">{result.title}</div>
                      <div className="result-subtitle">{result.subtitle}</div>
                    </div>

                    {result.price && (
                      <div className="result-price">{result.price}</div>
                    )}

                    {result.badge && (
                      <div className="result-badge">{result.badge}</div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {!isLoading && query && results.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <div className="no-results-text">
                  <div>No results found for "{query}"</div>
                  <div className="no-results-suggestion">
                    Try searching for rice, wheat, or farmer names
                  </div>
                </div>
              </div>
            )}

            {!query && recentSearches.length > 0 && (
              <div className="recent-searches">
                <div className="recent-header">
                  <Clock size={16} />
                  <span>Recent Searches</span>
                </div>

                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="recent-item"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <Clock size={14} className="recent-icon" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            )}

            {!query && !recentSearches.length && (
              <div className="search-suggestions">
                <div className="suggestions-header">
                  <TrendingUp size={16} />
                  <span>Popular Searches</span>
                </div>

                {['Boro Rice', 'Organic Potato', 'Premium Wheat', 'Fresh Vegetables'].map((suggestion) => (
                  <button
                    key={suggestion}
                    className="suggestion-item"
                    onClick={() => handleRecentSearchClick(suggestion)}
                  >
                    <TrendingUp size={14} className="suggestion-icon" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
