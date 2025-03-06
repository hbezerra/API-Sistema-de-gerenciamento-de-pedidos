const express = require("express"); // Importando a biblioteca "Express"; 
const router = express.Router(); // Atribuindo a variável uma instância de Express Router ; 
const pedidoController = require("../Controller/PedidoController"); // Importando o controller de pedidos ;
const WithAuth = require("../middleware/auth.js"); // Importando o middleware ; 

router.get("/pedidos", WithAuth, pedidoController.selecionarPedidos); // Rota de GET ; 
router.post("/pedidos", WithAuth, pedidoController.adicionarPedido); // Rota de POST ;
router.delete("/pedidos/:id", WithAuth, pedidoController.deletarPedido); // Rota de DELETE ;
router.put("/pedidos/:id", WithAuth, pedidoController.atualizarPedido); // Rotda de PUT ; 

module.exports = router ; // Exportando o router para ser utilizado no index ; 