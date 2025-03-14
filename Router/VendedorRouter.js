const express = require("express"); // Importando a biblioteca "Express"; 
const router = express.Router(); // Atribuindo a variável uma instância de "Express Router"; 
const vendedorController = require("../Controller/VendedorController"); // Importando o controller de vendedor;
const WithAuth = require("../middleware/auth.js"); // Importando o middleware ; 

router.post("/vendedores", WithAuth, vendedorController.adicionarVendedor); // Rota de Post ; 
router.delete("/vendedores/:id", WithAuth, vendedorController.deletarVendedor); // Rota de Delete ; 
router.get("/vendedores", WithAuth, vendedorController.selecionarVendedores); // Rota de Get ; 
router.put("/vendedores/:id", WithAuth, vendedorController.atualizarVendedor); // Rota de Put ; 

module.exports = router; // Exportando o router para ser utilizado no index;