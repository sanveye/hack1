import React, { useState } from 'react';
import './WomenBusiness.css';

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  image?: string;
  website?: string;
}

const WomenBusiness: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [businesses] = useState<Business[]>([
    {
      id: 1,
      name: 'Bluebird Bakery',
      category: 'restaurants',
      description: 'Fresh pastries, sandwiches, and locally roasted coffee. Cozy spot for study sessions.',
      location: 'Seattle, WA',
      image: '/images/bluebird.jpg',
      website: 'https://bluebirdbakery.example'
    },
    {
      id: 2,
      name: 'Luna Cosmetics',
      category: 'makeup',
      description: 'Cruelty-free, vegan makeup made with natural ingredients.',
      location: 'Portland, OR',
      image: '/images/luna.png',
      website: 'https://luna-cosmetics.example'
    },
    {
      id: 3,
      name: 'Stride Athletics',
      category: 'fitness',
      description: 'Community-first fitness studio offering barre, pilates, and HIIT classes.',
      location: 'Austin, TX',
      image: '/images/stride.jpg',
      website: 'https://strideathletics.example'
    }
  ]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'restaurants', label: 'Restaurants' },
    { value: 'shopping', label: 'Shopping Stores' },
    { value: 'makeup', label: 'Makeup & Beauty' },
    { value: 'fitness', label: 'Fitness & Wellness' },
    { value: 'services', label: 'Services' }
  ];

  const filteredBusinesses = selectedCategory === 'all' 
    ? businesses 
    : businesses.filter(b => b.category === selectedCategory);

  return (
    <div className="women-business-container">
      <h2 className="women-business-title">Women-Owned Businesses 💼</h2>
      <p className="women-business-subtitle">Support local women entrepreneurs</p>

      <div className="category-filter">
        <label htmlFor="category">Filter by Category:</label>
        <select 
          id="category"
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="businesses-grid">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map(business => (
            <div key={business.id} className="business-card">
              <div className="business-card-content">
                <h3 className="business-name">{business.name}</h3>
                <p className="business-category">{business.category}</p>
                <p className="business-description">{business.description}</p>
                <p className="business-location">📍 {business.location}</p>
                {business.website && (
                  <a className="business-website" href={business.website} target="_blank" rel="noopener noreferrer">
                    Visit site
                  </a>
                )}
              </div>
              <div className="business-card-image">
                <img src={business.image || '/images/placeholder.png'} alt={business.name} />
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No businesses found in this category yet.</p>
            <p className="empty-subtitle">Check back soon for amazing women-owned businesses!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenBusiness;
