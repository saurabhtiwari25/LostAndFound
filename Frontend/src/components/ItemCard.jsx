import React from 'react';

const ItemCard = ({ item, onClick }) => {
    return (
        <div 
            onClick={onClick}
            style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #eaeaea',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
            className="item-card-hover"
        >
            {/* Image section */}
            <div style={{ height: '180px', background: '#f5f5f5', position: 'relative', overflow: 'hidden' }}>
                {item.imagePath ? (
                    <img 
                        src={`http://localhost:8080${item.imagePath}`} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#aaa', flexDirection: 'column', gap: '5px' }}>
                        <span style={{ fontSize: '32px' }}>📦</span>
                        <span style={{ fontSize: '12px', fontWeight: '500' }}>No Image Attached</span>
                    </div>
                )}
                {/* Status Badge */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    background: item.found ? '#d4edda' : '#f8d7da',
                    color: item.found ? '#155724' : '#721c24',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    {item.found ? " Found" : " Lost"}
                </div>
            </div>

            {/* Content section */}
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{item.title}</h3>
                
                <p style={{ 
                    margin: '0 0 16px 0', 
                    fontSize: '14px', 
                    color: '#666', 
                    flexGrow: 1, 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden',
                    lineHeight: '1.4'
                }}>
                    {item.description}
                </p>

                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888' }}>
                    <span> {item.location}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
