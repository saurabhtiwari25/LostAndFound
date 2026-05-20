import axios from '../api/axiosConfig';

const ItemService = {

    getAllItems: async (page = 0, size = 10) => {
        return await axios.get(`/items?page=${page}&size=${size}`);
    },

    createItem: async (itemData) => {
        return await axios.post('/items', itemData);
    },

    uploadImage: async (id, file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        return await axios.post(`/items/${id}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    getItemById: async (id) => {
        return await axios.get(`/items/${id}`);
    },

    deleteItem: async (id) => {
        return await axios.delete(`/items/${id}`);
    },

    updateItem: async (id, itemData) => {
        return await axios.put(`/items/${id}`, itemData);
    },

    searchItems: async (keyword) => {
        return await axios.get(`/items/search?keyword=${keyword}`);
    }
};

export default ItemService;