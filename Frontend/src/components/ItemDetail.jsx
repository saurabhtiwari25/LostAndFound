import React, { useState, useEffect, useContext } from 'react';
import ItemService from '../services/itemService';
import { AuthContext } from '../context/AuthContext';

const ItemDetail = ({ itemId, onBack }) => {
    const [item, setItem] = useState(null);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadItem();
    }, [itemId]);

    const loadItem = async () => {
        try {
            const response = await ItemService.getItemById(itemId);
            setItem(response.data);
        } catch (err) {
            console.error("Could not load item details", err);
        }
    };

    const handleToggleStatus = async () => {
        if (!item) return;
        setLoading(true);
        try {
            const updatedData = {
                title: item.title,
                description: item.description,
                location: item.location,
                found: !item.found
            };
            const response = await ItemService.updateItem(item.id, updatedData);
            setItem(response.data);
            alert(`Item successfully marked as ${!item.found ? 'Found' : 'Lost'}!`);
        } catch (err) {
            console.error("Error updating item status", err);
            alert("Failed to update item status. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        setLoading(true);
        try {
            await ItemService.deleteItem(itemId);
            alert("Item deleted successfully!");
            onBack();
        } catch (err) {
            console.error("Error deleting item", err);
            alert("Failed to delete item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!item) return <div className="container">Loading...</div>;

    return (
        <div className="form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <button onClick={onBack} className="link-text" style={{ border: 'none', background: 'none', marginBottom: '20px', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                ← Back to List
            </button>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ margin: 0 }}>{item.title}</h2>
                <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    background: item.found ? '#d4edda' : '#f8d7da',
                    color: item.found ? '#155724' : '#721c24'
                }}>
                    {item.found ? "✅ Found" : "❌ Lost"}
                </span>
            </div>

            <p style={{ marginTop: '20px' }}><strong>📍 Location:</strong> {item.location}</p>
            <p style={{ color: '#666' }}><strong>📅 Reported on:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
            
            <p><strong>📝 Description:</strong></p>
            <div className="description-text" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '6px', whiteSpace: 'pre-wrap', borderLeft: '4px solid #007bff', marginBottom: '20px' }}>
                {item.description}
            </div>
            
            {item.imagePath && (
                <div className="image-container" style={{ marginBottom: '25px' }}>
                    <strong>Attached Photo:</strong>
                    <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', marginTop: '10px' }}>
                        <img 
                            src={`http://localhost:8080${item.imagePath}`} 
                            alt={item.title} 
                            style={{ width: '100%', height: 'auto', display: 'block' }} 
                        />
                    </div>
                </div>
            )}

            {user && (
                <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
                    <button 
                        onClick={handleToggleStatus} 
                        disabled={loading}
                        className="primary-btn" 
                        style={{ 
                            flex: 1, 
                            background: item.found ? '#ffc107' : '#28a745',
                            color: item.found ? '#212529' : '#fff'
                        }}
                    >
                        {loading ? 'Processing...' : item.found ? 'Mark as Lost' : 'Mark as Found'}
                    </button>
                    <button 
                        onClick={handleDeleteItem} 
                        disabled={loading}
                        className="primary-btn" 
                        style={{ 
                            width: 'auto', 
                            background: '#dc3545',
                            padding: '12px 20px'
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemDetail;