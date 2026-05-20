import React, { useState, useEffect } from 'react';
import ItemService from '../services/itemService';

const ItemList = ({ onNavigate, onSelectItem }) => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await ItemService.getAllItems(0, 100);
            setItems(res.data.content);
        } catch (err) {
            console.error("Error fetching items", err);
        }
    };

    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="item-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Reported Items</h2>
                <button 
                    onClick={() => onNavigate('add')} 
                    className="primary-btn" 
                    style={{ width: 'auto', padding: '8px 16px', fontSize: '14px' }}
                >
                    + Report New Item
                </button>
            </div>

            <input 
                type="text" 
                placeholder="Search items instantly..." 
                className="search-bar"
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ width: '100%', boxSizing: 'border-box', marginBottom: '20px', padding: '12px' }}
            />

            <div className="table-responsive" style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #eee' }}>
                            <th style={{ padding: '15px' }}>Title</th>
                            <th style={{ padding: '15px' }}>Location</th>
                            <th style={{ padding: '15px' }}>Status</th>
                            <th style={{ padding: '15px', textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* MAP: Converting data objects into HTML rows */}
                        {filteredItems.map(item => (
                            <tr 
                                key={item.id} 
                                onClick={() => {
                                    onSelectItem(item.id);
                                    onNavigate('detail');
                                }}
                                style={{ 
                                    borderBottom: '1px solid #eee', 
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                                className="item-row-hover"
                            >
                                <td style={{ padding: '15px', fontWeight: 'bold', color: '#333' }}>{item.title}</td>
                                <td style={{ padding: '15px', color: '#666' }}>{item.location}</td>
                                <td style={{ padding: '15px' }}>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '12px', 
                                        fontSize: '12px', 
                                        fontWeight: 'bold',
                                        background: item.found ? '#d4edda' : '#f8d7da',
                                        color: item.found ? '#155724' : '#721c24'
                                    }}>
                                        {item.found ? "✅ Found" : "❌ Lost"}
                                    </span>
                                </td>
                                <td style={{ padding: '15px', textAlign: 'center' }}>
                                    <button 
                                        className="link-text" 
                                        style={{ background: 'none', border: 'none', padding: 0, textDecoration: 'none', fontWeight: '500' }}
                                    >
                                        View →
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredItems.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                    No items found.
                </div>
            )}
        </div>
    );
};

export default ItemList;