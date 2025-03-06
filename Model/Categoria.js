const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose";

const categoriaSchema = new mongoose.Schema({ // Criando a tabela no banco de dados ; 
    name: {type: String, required: true}, // Criando o campo "Nome";
    slug: {type: String, required: true} // Criando o campo "Slug" ; 
})

module.exports = mongoose.model("Categorias", categoriaSchema); // Exportando o model de categoria ; 