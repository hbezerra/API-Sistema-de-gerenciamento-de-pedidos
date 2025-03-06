const express = require("express"); // Importando a biblioteca "Express"; 
const router = express.Router(); // Atribuindo a variável uma instância de "Express Router" ; 
const clienteController = require("../Controller/ClienteController"); // Importando o controller de clientes ; 
const WithAuth = require("../middleware/auth.js"); // Importando o middleware ; 

router.get("/clientes", WithAuth, clienteController.selecionarClientes); // Rota de GET ; 
router.post("/clientes", WithAuth, clienteController.adicionarCliente); // Rota de POST ; 
router.delete("/clientes/:id", WithAuth, clienteController.excluirCliente); // Rota de DELETE ; 
router.put("/clientes/:id", WithAuth, clienteController.atualizarCliente); // Rota de PUT ;  

module.exports = router; // Importando o router para ser utilizado no index ; 