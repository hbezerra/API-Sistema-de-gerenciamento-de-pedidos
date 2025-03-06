const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose";

const pedidoSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    pedido: {type: String, required: true}, // Criando o campo "Pedido";
    endereco: {type: String, required: true}, // Criando o campo "Endereço";
    telefone: {type: mongoose.Schema.Types.Decimal128, required: true}, // Criando o campo "Telefone";
    // CHAVES ESTRANGEIRAS ;
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: "Categorias", required: true}, // Criando o campo "Categoria"; 
    vendedor: {type: mongoose.Schema.Types.ObjectId, ref: "Vendedores", required: true}, // Criando o campo "Vendedor" ;  
    cliente: {type: mongoose.Schema.Types.ObjectId, ref: "Clientes", required: true}, // Criando o campo "Cliente"; 
    
})

module.exports = mongoose.model("Pedidos", pedidoSchema); // Exportando o model de pedidos ; 