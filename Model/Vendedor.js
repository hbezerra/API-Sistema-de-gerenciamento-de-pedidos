const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose"; 

const vendedorSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    name: {type: String, required:true, lowercase: true},  // Criando o campo "Nome";
    pedidos: [{type: mongoose.Schema.Types.ObjectId, ref: "Pedidos", required: true}] // Criando o campo pedidos ; 
})

module.exports = mongoose.model("Vendedores", vendedorSchema); // Exportando o model de vendedor ; 
