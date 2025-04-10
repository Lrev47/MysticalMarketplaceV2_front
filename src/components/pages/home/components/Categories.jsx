import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../../redux/slices/categorySlice';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.categories);

  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Log what we received from Redux state when categories change
  useEffect(() => {
    console.log('Categories component state:', { 
      categoriesLength: categories?.length || 0,
      loading, 
      error,
      categoriesSample: categories?.slice(0, 4).map(cat => ({
        id: cat.id,
        name: cat.name, 
        description: cat.description
      })) || 'none'
    });
  }, [categories, loading, error]);

  // Icon mapping based on category name/type
  const getCategoryIcon = (categoryName, categoryId) => {
    // Log category name for debugging
    console.log('Mapping icon for category:', categoryName, 'with ID:', categoryId);
    
    // Direct mapping by ID (add your actual category IDs here if needed)
    const idMappings = {
      // Replace these IDs with your actual category IDs from the database
      '1': '🧪', // Potions 
      '2': '⚡', // Wands
      '3': '💎', // Crystals
      '4': '📚', // Books
      '5': '🔮', // Amulets
      '6': '🌿', // Herbs
      '7': '🔥', // Ritual tools
      '8': '🐉', // Creatures
      '9': '👘', // Clothing
      '10': '🏺', // Artifacts
      // Add more mappings for your specific category IDs
    };
    
    // Check if we have a direct ID mapping first
    if (categoryId && idMappings[categoryId.toString()]) {
      console.log(`Found direct ID mapping for category ID ${categoryId}`);
      return idMappings[categoryId.toString()];
    }
    
    // Handle null/undefined category names
    if (!categoryName) {
      console.log('Category name is null or undefined, using default icon');
      return '✨';
    }
    
    const name = categoryName.toLowerCase().trim();
    console.log('Normalized category name for matching:', name);
    
    // More flexible matching with broader terms
    // Potions category
    if (name.includes('potion') || name.includes('elixir') || name.includes('brew') || 
        name.includes('philter') || name.includes('draught') || name.includes('liquid')) {
      console.log('Matched as potion category');
      return '🧪';
    } 
    // Wands category
    else if (name.includes('wand') || name.includes('staff') || name.includes('rod') || 
             name.includes('scepter') || name.includes('magic stick')) {
      console.log('Matched as wand category');
      return '⚡';
    } 
    // Crystal category
    else if (name.includes('crystal') || name.includes('gem') || name.includes('stone') || 
             name.includes('mineral') || name.includes('jewel') || name.includes('rock')) {
      console.log('Matched as crystal category');
      return '💎';
    } 
    // Book category
    else if (name.includes('book') || name.includes('tome') || name.includes('scroll') || 
             name.includes('grimoire') || name.includes('spellbook') || name.includes('codex')) {
      console.log('Matched as book category');
      return '📚';
    } 
    // Magical objects category
    else if (name.includes('amulet') || name.includes('talisman') || name.includes('necklace') || 
             name.includes('pendant') || name.includes('charm') || name.includes('medallion')) {
      console.log('Matched as amulet/talisman category');
      return '🔮';
    } 
    // Herbs category
    else if (name.includes('herb') || name.includes('plant') || name.includes('ingredient') || 
             name.includes('root') || name.includes('leaf') || name.includes('flower')) {
      console.log('Matched as herb category');
      return '🌿';
    } 
    // Ritual tools category
    else if (name.includes('ritual') || name.includes('tool') || name.includes('implement') || 
             name.includes('altar') || name.includes('candle') || name.includes('incense')) {
      console.log('Matched as ritual tool category');
      return '🔥';
    } 
    // Creatures category
    else if (name.includes('creature') || name.includes('familiar') || name.includes('beast') || 
             name.includes('animal') || name.includes('pet') || name.includes('companion')) {
      console.log('Matched as creature category');
      return '🐉';
    } 
    // Clothing category
    else if (name.includes('clothing') || name.includes('robe') || name.includes('cloak') || 
             name.includes('garment') || name.includes('hat') || name.includes('apparel')) {
      console.log('Matched as clothing category');
      return '👘';
    } 
    // Artifacts category
    else if (name.includes('artifact') || name.includes('relic') || name.includes('antique') || 
             name.includes('ancient') || name.includes('historic') || name.includes('treasure')) {
      console.log('Matched as artifact category');
      return '🏺';
    }
    
    // Add direct mappings for common category names that might not contain the keywords
    const directMappings = {
      'potions': '🧪',
      'wands': '⚡',
      'crystals': '💎',
      'books': '📚',
      'amulets': '🔮',
      'herbs': '🌿',
      'rituals': '🔥',
      'creatures': '🐉',
      'clothing': '👘',
      'artifacts': '🏺',
      'magic': '✨',
      'spells': '🌟',
      'divination': '🔮',
      'enchantments': '✨',
      'talismans': '🔮',
      'magical items': '✨',
      'rings': '💍',
      'gear': '⚔️',
      'accessories': '👑'
    };
    
    // Check for direct matches
    for (const [key, icon] of Object.entries(directMappings)) {
      if (name === key) {
        console.log(`Direct match found for ${key}`);
        return icon;
      }
    }
    
    // If no match, log and return default
    console.log('No icon match found, using default icon');
    return '✨';
  };

  // Get description based on category name
  const getCategoryDescription = (categoryName) => {
    const name = categoryName ? categoryName.toLowerCase() : '';
    
    if (name.includes('potion') || name.includes('elixir')) {
      return 'Magical brews for any ailment';
    } else if (name.includes('wand') || name.includes('staff')) {
      return 'Channel your inner power';
    } else if (name.includes('crystal') || name.includes('gem')) {
      return 'Ancient stones of wisdom';
    } else if (name.includes('book') || name.includes('tome')) {
      return 'Knowledge of the ages';
    } else if (name.includes('amulet') || name.includes('talisman')) {
      return 'Wear the power of magic';
    } else if (name.includes('herb') || name.includes('ingredient')) {
      return 'Essential elements for brewing';
    } else if (name.includes('ritual') || name.includes('tool')) {
      return 'Equipment for your magical practice';
    } else if (name.includes('creature') || name.includes('familiar')) {
      return 'Mystical companions for your journey';
    } else if (name.includes('clothing') || name.includes('robe')) {
      return 'Dress for magical success';
    } else if (name.includes('artifact') || name.includes('relic')) {
      return 'Rare items of historical importance';
    }
    
    // Default description
    return 'Explore our mystical collection';
  };

  // Show loading state
  if (loading && !categories.length) {
    return (
      <section className="categories-section">
        <h2 className="section-title">Explore Magic Categories</h2>
        <div className="loading-container" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <LoadingSpinner />
          <p>Discovering magical realms...</p>
        </div>
      </section>
    );
  }

  // Show error message if fetch failed
  if (error && !categories.length) {
    return (
      <section className="categories-section">
        <h2 className="section-title">Explore Magic Categories</h2>
        <div className="error-message" style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
          <p>Failed to retrieve categories. The crystal ball is cloudy.</p>
          <button 
            style={{ 
              marginTop: '1rem', 
              padding: '10px 20px', 
              backgroundColor: 'rgba(79, 157, 233, 0.2)',
              color: '#ffffff',
              border: '1px solid rgba(79, 157, 233, 0.5)',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
            onClick={() => dispatch(fetchAllCategories())}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="categories-section" style={{ 
      backgroundColor: 'rgba(22, 33, 62, 0.7)', 
      backdropFilter: 'blur(3px)',
      boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(79, 157, 233, 0.2)',
      border: '1px solid rgba(79, 157, 233, 0.2)'
    }}>
      <h2 className="section-title">Explore Magic Categories</h2>
      <p className="section-description">
        Browse our mystical collection by category to find exactly what your enchanted journey requires.
      </p>
      
      <div className="categories-grid">
        {categories.slice(0, 4).map(category => (
          <a 
            href={`/product-listing?category=${category.id}`} 
            className={`category-card ${category.name?.toLowerCase().replace(/\s+/g, '-') || ''}`} 
            key={category.id}
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              backdropFilter: 'blur(2px)',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(79, 157, 233, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="category-icon">{getCategoryIcon(category.name, category.id)}</div>
            <h3>{category.name}</h3>
            <p>{category.description || getCategoryDescription(category.name)}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Categories; 