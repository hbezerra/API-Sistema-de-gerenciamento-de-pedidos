//IMPORT DE BIBLIOTECAS ; 
const express = require("express"); // Importando a biblioteca "Express"; 
const bodyParser = require("body-parser"); // Importando a biblioteca "Body-parser"; 

// IMPORT DE ARQUIVOS ; 
const db = require("./database/db"); // Importando a conexão com o banco de dados;
const vendedorRouter = require("./Router/VendedorRouter"); // Importando o router de vendedor;
const categoriaRouter = require("./Router/CategoriaRouter"); // Importando o router de categoria;
const pedidoRouter = require("./Router/PedidoRouter"); // Importando o router de pedidos;
const clienteRouter = require("./Router//ClienteRouter"); // Importando o router de clientes;
const userRouter = require("./Router//UserRouter"); // Importando o router de usuário;

// UTILIZAÇÃO DE BIBLIOTECAS ; 

const app = express(); // Atribuindo a variável uma instância de "Express";
app.use(bodyParser.json()); // Fazendo com que o corpo das requisições sejam lidos como JSON;
app.use("/", userRouter); // Utilizando o router de usuário ; 
app.use("/api", vendedorRouter); // Utilizando o router de vendedor; 
app.use("/api", categoriaRouter); // Utilizando o router de categoria; 
app.use("/api", pedidoRouter); // Utilizando o router de pedidos ; 
app.use("/api", clienteRouter); // Utilizando o router de clientes ; 

// SERVIDOR ; 
const PORT = 3000; // Atribuindo a variável, a porta no qual o servidor será rodado ; 
app.listen(PORT, () => { // Iniciando o servidor ; 
    console.log("Servidor iniciado com sucesso! LocalHost:3000"); // Mensagem de sucesso!
})
