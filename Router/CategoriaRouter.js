const express = require("express"); // Importando a biblioteca "Express"; 
const router = express.Router(); // Atribuindo a variável uma instância de Express Router ; 
const categoriaController = require("../Controller/CategoriaController"); // Importando o controller de categorias ;
const WithAuth = require("../middleware/auth.js"); // Importando o middleware ; 

router.post("/categorias", WithAuth, categoriaController.adicionarCategoria); // Rota de POST ; 
router.get("/categorias", WithAuth, categoriaController.selecionarCategorias); // Rota de GET ; 
router.delete("/categorias/:id", WithAuth, categoriaController.deletarCategoria); // Rota de DELETE ; 
router.put("/categorias/:id", WithAuth, categoriaController.atualizarCategoria); // Rota de PUT ; 

module.exports = router; // Exportando o router para ser utilizado no Index ;