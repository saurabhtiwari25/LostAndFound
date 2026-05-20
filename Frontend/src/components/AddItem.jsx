import React, { useState } from 'react';
import ItemService from '../services/itemService';

const AddItem = ({ onNavigate }) => {
    const [item, setItem] = useState({
        title: '',
        description: '',
        location: '',
        found: false
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setItem({ ...item, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await ItemService.createItem(item);
            const newItemId = response.data.id;

            if (selectedFile) {
                await ItemService.uploadImage(newItemId, selectedFile);
            }

            alert("Item reported successfully!");
            onNavigate('list');
        } catch (err) {
            console.error(err);
            alert("Failed to add item. Please check the backend connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <h2>Report Lost or Found Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Item Title</label>
                    <input name="title" placeholder="e.g., iPhone 13, Keys" onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Description</label>
                    <textarea name="description" rows="3" onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Location</label>
                    <input name="location" placeholder="Where was it seen?" onChange={handleChange} required />
                </div>

                <div className="input-group checkbox">
                    <input type="checkbox" name="found" id="found" onChange={handleChange} />
                    <label htmlFor="found">I have already found this item</label>
                </div>

                <div className="input-group">
                    <label>Upload Photo (Optional)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>

                <button type="submit" className="primary-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Post Item'}
                </button>
            </form>
        </div>
    );
};

export default AddItem;