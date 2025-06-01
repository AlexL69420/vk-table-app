import express from 'express';
import axios from 'axios';
import validateUserData from './validation.mjs';
import cors from 'cors';

const app = express();
const PORT = 5000;
const JSON_SERVER_URL = 'http://localhost:3000';

app.use(express.json());

// Настройка cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
    
  }));

// Обработка preflight-запросов
app.options('*', cors());   

// Получить всех пользователей
app.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Создать нового пользователя
app.post('/users', async (req, res) => {
  try {
    const validationErrors = validateUserData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const defaultUser = {
      status: 'active',
      skills: []
    };

    const userData = {
      ...defaultUser,
      ...req.body
    };

    const response = await axios.post(`${JSON_SERVER_URL}/users`, userData);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Обновить пользователя
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Проверяем существование пользователя
    const existingUser = await axios.get(`${JSON_SERVER_URL}/users/${id}`);
    
    const validationErrors = validateUserData(req.body, true);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Сохраняем неизменяемые поля
    const updatedUser = {
      ...existingUser.data,
      ...req.body,
      id: existingUser.data.id // Гарантируем, что ID не изменится
    };

    const response = await axios.put(`${JSON_SERVER_URL}/users/${id}`, updatedUser);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Удалить пользователя
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${JSON_SERVER_URL}/users/${id}`);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Получить пользователя по ID
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JSON_SERVER_URL}/users/${id}`);
    
    if (!response.data) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Express server running on ${PORT}`);
});