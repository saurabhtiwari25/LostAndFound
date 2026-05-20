import React, { useState, useEffect } from 'react';
import ItemService from '../services/itemService';
import ItemCard from './ItemCard';

const SearchItem = ({ onNavigate, onSelectItem }) => {
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, LOST, FOUND
    const [locationInput, setLocationInput] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            if (query.trim() !== '') {
                response = await ItemService.searchItems(query);
                let fetched = response.data;
                
                if (statusFilter !== 'ALL') {
                    const checkFound = statusFilter === 'FOUND';
                    fetched = fetched.filter(item => item.found === checkFound);
                }
                if (locationInput.trim() !== '') {
                    fetched = fetched.filter(item => 
                        item.location.toLowerCase().includes(locationInput.toLowerCase())
                    );
                }
                setItems(fetched);
            } else if (locationInput.trim() !== '') {

                const isFound = statusFilter === 'FOUND';
                if (statusFilter === 'ALL') {
                    const resFound = await axiosConfigGet(`/items/filter?location=${locationInput}&found=true`);
                    const resLost = await axiosConfigGet(`/items/filter?location=${locationInput}&found=false`);
                    const res = await ItemService.getAllItems(0, 100);
                    let fetched = res.data.content || [];
                    
                    fetched = fetched.filter(item => 
                        item.location.toLowerCase().includes(locationInput.toLowerCase())
                    );
                    setItems(fetched);
                } else {
                    // Call getAllItems and filter by location and found
                    const res = await ItemService.getAllItems(0, 100);
                    let fetched = res.data.content || [];
                    const checkFound = statusFilter === 'FOUND';
                    fetched = fetched.filter(item => 
                        item.found === checkFound && 
                        item.location.toLowerCase().includes(locationInput.toLowerCase())
                    );
                    setItems(fetched);
                }
            } else {
                const res = await ItemService.getAllItems(0, 100);
                let fetched = res.data.content || [];
                
                if (statusFilter !== 'ALL') {
                    const checkFound = statusFilter === 'FOUND';
                    fetched = fetched.filter(item => item.found === checkFound);
                }
                setItems(fetched);
            }
        } catch (err) {
            console.error("Search failed:", err);
            setError("Could not complete the search. Please make sure the backend is connected.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, statusFilter, locationInput]);

    return (
        <div className="search-container" style={{ padding: '10px 0' }}>
            <div className="search-header" style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '10px' }}>Advanced Search & Filter</h2>
                <p style={{ color: '#666', margin: '0 0 20px 0' }}>Find reported items in real-time by keyword, location, and status.</p>
                
                <form onSubmit={handleSearch} style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
                        
                        {/* Keyword search */}
                        <div className="input-group" style={{ margin: 0 }}>
                            <label style={{ fontSize: '13px', color: '#555', marginBottom: '6px' }}>Item Title / Keyword</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search e.g. Keys, Wallet..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 10px 10px 35px', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px' }}>🔍</span>
                            </div>
                        </div>

                        {/* Location filter */}
                        <div className="input-group" style={{ margin: 0 }}>
                            <label style={{ fontSize: '13px', color: '#555', marginBottom: '6px' }}>Location</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="e.g. Library, Cafe..."
                                    value={locationInput}
                                    onChange={(e) => setLocationInput(e.target.value)}
                                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 10px 10px 35px', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px' }}>📍</span>
                            </div>
                        </div>

                        {/* Status filter */}
                        <div className="input-group" style={{ margin: 0 }}>
                            <label style={{ fontSize: '13px', color: '#555', marginBottom: '6px' }}>Status</label>
                            <select 
                                value={statusFilter} 
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff' }}
                            >
                                <option value="ALL">All Statuses</option>
                                <option value="LOST">❌ Lost Items</option>
                                <option value="FOUND">✅ Found Items</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <div className="search-results">
                {loading && <div style={{ textAlign: 'center', padding: '30px', color: '#666' }}>Searching items...</div>}
                {error && <div style={{ color: '#dc3545', textAlign: 'center', padding: '15px', background: '#f8d7da', borderRadius: '6px', marginBottom: '20px' }}>{error}</div>}
                
                {!loading && items.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '12px', border: '1px dashed #ccc', color: '#777' }}>
                        <span style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}>🔍</span>
                        <strong>No items found matching your filters.</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#999' }}>Try adjusting your keyword or location search.</p>
                    </div>
                )}

                {!loading && items.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {items.map(item => (
                            <ItemCard 
                                key={item.id} 
                                item={item} 
                                onClick={() => {
                                    onSelectItem(item.id);
                                    onNavigate('detail');
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchItem;