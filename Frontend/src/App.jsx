import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import Login from './components/Login';
import Register from './components/Register';
import AddItem from './components/AddItem';
import ItemDetail from './components/ItemDetail';
import SearchItem from './components/SearchItem';
import Footer from './components/Footer';

const App = () => {
    const [view, setView] = useState('list');
    const [selectedItemId, setSelectedItemId] = useState(null);

    const renderView = () => {
        switch(view) {
            case 'list': 
                return <ItemList onNavigate={setView} onSelectItem={setSelectedItemId} />;
            case 'search':
                return <SearchItem onNavigate={setView} onSelectItem={setSelectedItemId} />;
            case 'detail':
                return <ItemDetail itemId={selectedItemId} onBack={() => setView('list')} />;
            case 'login': 
                return <Login onNavigate={setView} />;
            case 'register': 
                return <Register onNavigate={setView} />;
            case 'add': 
                return <AddItem onNavigate={setView} />;
            default: 
                return <ItemList onNavigate={setView} onSelectItem={setSelectedItemId} />;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar onNavigate={setView} currentView={view} />
            <main className="container" style={{ flex: '1 0 auto' }}>
                {renderView()}
            </main>
            <Footer />
        </div>
    );
};

export default App;