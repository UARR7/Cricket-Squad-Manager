import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { UserPlus, Users, Edit, Trash2, X, Ticket as Cricket } from 'lucide-react';

const API_URL = 'http://localhost:5001/players';

function App() {
  const [players, setPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    role: 'Batsman',
    team: ''
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(API_URL);
      setPlayers(response.data);
    } catch (error) {
      toast.error('Failed to fetch players');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentPlayer) {
        await axios.put(`${API_URL}/${currentPlayer._id}`, formData);
        toast.success('Player updated successfully');
      } else {
        await axios.post(API_URL, formData);
        toast.success('Player added successfully');
      }
      setIsModalOpen(false);
      setCurrentPlayer(null);
      resetForm();
      fetchPlayers();
    } catch (error) {
      toast.error(currentPlayer ? 'Failed to update player' : 'Failed to add player');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Player deleted successfully');
      fetchPlayers();
    } catch (error) {
      toast.error('Failed to delete player');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      role: 'Batsman',
      team: ''
    });
  };

  const openEditModal = (player) => {
    setCurrentPlayer(player);
    setFormData({
      name: player.name,
      age: player.age,
      role: player.role,
      team: player.team
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <Cricket className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">Cricket Squad Manager</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentPlayer(null);
              resetForm();
              setIsModalOpen(true);
            }}
            className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-50 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Player</span>
          </motion.button>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {players.map((player) => (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-xl p-6 transform transition-all hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{player.name}</h3>
                    <p className="text-gray-600">Age: {player.age}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(player)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(player._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                      {player.role}
                    </span>
                  </div>
                  <p className="text-gray-600">Team: {player.team}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {currentPlayer ? 'Edit Player' : 'Add New Player'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-rounder">All-rounder</option>
                    <option value="Wicketkeeper">Wicketkeeper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team
                  </label>
                  <input
                    type="text"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  {currentPlayer ? 'Update Player' : 'Add Player'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;