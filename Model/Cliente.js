const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose"; 

const clienteSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    nome: {type: String, required: true, lowercase: true}, // Criando o campo "Nome"; 
    email: {type: String, required: true, unique: true, lowercase: true}, // Criando o campo "Email";
    pedidos: {type: mongoose.Schema.Types.ObjectId, ref: "Pedidos"} // Criando o campo pedido vinculado a esse cliente ; 
})

module.exports = mongoose.model("Clientes", clienteSchema); // Exportando o model de clientes ; 