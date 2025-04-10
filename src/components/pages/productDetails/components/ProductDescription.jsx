import React, { useState } from 'react';
import '../style/ProductDescription.css';

const ProductDescription = ({ description, specifications = [] }) => {
  const [activeTab, setActiveTab] = useState('description');
  
  // Convert newlines to HTML line breaks
  const formatDescription = (text) => {
    if (!text) return '';
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, i) => {
      if (paragraph.trim().startsWith('- ')) {
        // This is a list
        const items = paragraph.split('\n');
        return (
          <ul key={i} className="description-list">
            {items.map((item, j) => (
              <li key={j}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      } else if (paragraph.trim().startsWith('Warning:')) {
        // This is a warning
        return (
          <div key={i} className="description-warning">
            <span className="warning-icon">⚠️</span>
            <p>{paragraph}</p>
          </div>
        );
      } else {
        // Regular paragraph
        return <p key={i}>{paragraph}</p>;
      }
    });
  };
  
  return (
    <div className="product-description-section">
      {/* Tabs */}
      <div className="description-tabs">
        <button 
          className={`tab ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        
        {specifications && specifications.length > 0 && (
          <button 
            className={`tab ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="description-content">
        {activeTab === 'description' && (
          <div className="description-text">
            {formatDescription(description)}
          </div>
        )}
        
        {activeTab === 'specs' && (
          <div className="specifications">
            <table className="specs-table">
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <th>{spec.name}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Mystical Border */}
      <div className="mystical-border"></div>
    </div>
  );
};

export default ProductDescription; 