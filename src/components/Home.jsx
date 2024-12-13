// src/components/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { getItems, deleteItem, addItem, updateItem } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../themes/Home.css';

function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchItems() {
      const data = await getItems(token);
      if (data.error) {
        setError(data.error);
        if (data.error === 'Token inválido' || data.error === 'Token expirado') {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/login');
        }
      } else {
        setItems(data);
      }
    }
    fetchItems();
  }, [token, navigate, setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleDelete = async (id) => {
    const data = await deleteItem(token, id);

    if (data.success) {
      setItems(items.filter((item) => item.id !== id));
    } else {
      setError(data.error || 'Erro ao excluir item');
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) {
      setError('O nome do item não pode ser vazio');
      return;
    }

    const data = await addItem(token, newItemName.trim());

    if (data.success) {
      setItems([...items, data.item]);
      setNewItemName('');
      setError('');
    } else {
      setError(data.error);
    }
  };

  const handleEditInitiate = (item) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
    setError('');
  };

  const handleEditCancel = () => {
    setEditingItemId(null);
    setEditingItemName('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItemName.trim()) {
      setError('O nome do item não pode ser vazio');
      return;
    }

    const data = await updateItem(token, editingItemId, editingItemName.trim());

    if (data.success) {
      setItems(
        items.map((item) =>
          item.id === editingItemId ? { ...item, name: data.item.name } : item
        )
      );
      setEditingItemId(null);
      setEditingItemName('');
      setError('');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="header">
        <h2>Prova de Desenvolvimento Web</h2>
      </div>

      {/* Mensagem de erro */}
      {error && <div className="error-message">{error}</div>}

      {/* Formulário para adicionar novo item */}
      <form className="add-item-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Nome do novo item"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button type="submit">Adicionar Item</button>
      </form>

      {/* Lista de itens */}
      <h3>Seus Itens:</h3>
      {items.length === 0 ? (
        <p>Você não tem itens.</p>
      ) : (
        <ul className="items-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              {editingItemId === item.id ? (
                <form className="edit-item-form" onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                  />
                  <button type="submit">Salvar</button>
                  <button type="button" onClick={handleEditCancel}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <span>{item.name}</span>
                  <div className="item-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditInitiate(item)}
                      title="Editar item"
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(item.id)}
                      title="Excluir item"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
    </div>
  );
}

export default Home;
