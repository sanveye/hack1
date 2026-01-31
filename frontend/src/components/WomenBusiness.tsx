import React, { useState } from 'react';
import './WomenBusiness.css';

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  image?: string;
  website?: string;
}

const WomenBusiness: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [businesses] = useState<Business[]>([
    {
      id: 1,
      name: 'Glossier',
      category: 'makeup',
      description: 'Glossier is a beauty brand that focuses on simple, natural-looking makeup and skincare.',
      image: 'glossier.png',
      website: 'https://www.glossier.com'
    },
    {
      id: 2,
      name: 'Spanx',
      category: 'makeup',
      description: 'Cruelty-free, vegan makeup made with natural ingredients.',
      image: 'spanx.png',
      website: 'https://www.spanx.com'
    },
    {
      id: 3,
      name: 'Rhode',
      category: 'makeup',
      description: 'Rhode is a skincare brand founded by Hailey Bieber that focuses on simple, effective products for daily use.',
      image: 'rhode.png',
      website: 'https://rhode.com'
    },
    {
      id: 4,
      name: 'In-N-Out Burger',
      category: 'restaurants',
      description: 'A popular fast-food chain known for its fresh ingredients and secret menu.',
      image: 'inout.png',
      website: 'https://www.in-n-out.com'
    },
    {
      id: 5,
      name: 'Merle Norman Cosmetics',
      category: 'makeup',
      description: 'A cosmetics company known for its high-quality skincare and makeup products.',
      image: 'merlenorman.png',
      website: 'https://www.merlenorman.com'
    },
    {
      id: 6,
      name: 'Fenty Beauty',
      category: 'makeup',
      description: 'Fenty is a beauty brand known for its wide range of inclusive makeup shades designed for all skin tones',
      image: 'fenty.png',
      website: 'https://www.fentybeauty.com'
    },
    {
      id: 7,
      name: 'Rare Beauty',
      category: 'makeup',
      description: 'Rare Beauty is a cosmetics brand founded by Selena Gomez that focuses on self-expression and inclusivity.',
      image: 'rarebeauty.png',
      website: 'https://www.rarebeauty.com'
    },
    {
      id: 8,
      name: 'Chanel',
      category: 'makeup',
      description: 'Chanel is a luxury fashion and beauty brand known for its high-end makeup, skincare, perfumes, and style.',
      image: 'chanel.png',
      website: 'https://www.chanel.com'
    },
    {
      id: 9,
      name: 'Primrose Bakery',
      category: 'restaurants',
      description: 'A family owned bakery known for its cupcakes, cakes, and sweet treats made with classic recipes.',
      image: 'primrose.png',
      website: 'https://www.primrosebakery.com'
    },
    {
      id: 10,
      name: 'Blogilates',
      category: 'shopping',
      description: 'A fitness and lifestyle brand that has activewear, workout plans, and wellness products.',
      image: 'blogilates.png',
      website: 'https://www.blogilates.com'
    },
    {
      id: 11,
      name: 'Reformation',
      category: 'shopping',
      description: 'A women-owned sustainable clothing brand known for trendy styles and eco-friendly practices.',
      image: 'reformation.png',
      website: 'https://www.thereformation.com'
    },
    {
      id: 12,
      name: 'Reformation',
      category: 'shopping',
      description: 'A women-owned sustainable clothing brand known for trendy styles and eco-friendly practices.',
      image: 'reformation.png',
      website: 'https://www.thereformation.com'
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
