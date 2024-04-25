const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const productsController = require('../controllers/products');

// Rotas de autenticação
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Rotas de usuários (exemplos)
router.get('/users', usersController.listUsers);
router.post('/users', usersController.createUser);
router.get('/users/:id', usersController.getUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

// Rotas de produtos (exemplos)
router.get('/products', productsController.listProducts);
router.post('/products', productsController.createProduct);
router.get('/products/:id', productsController.getProduct);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

// ... (Rotas para outras funcionalidades do seu aplicativo)

module.exports = router;