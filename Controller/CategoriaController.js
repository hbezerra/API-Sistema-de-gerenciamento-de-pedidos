const mongoose = require("mongoose"); // Importando a biblioteca "Mongoose"; 
const Categoria = require("../Model/Categoria"); // Importando o model de Categoria ; 
const slugify = require("slugify"); // Importando a biblioteca "Slugfy";
const Pedido = require("../Model/Pedido"); // Importando o model de pedidos; 

const adicionarCategoria = async (req, res) => { // Função responsável por adicionar uma categoria no banco de dados ; 
    try {
        let {name} = req.body; // Recuperando o nome da categoria ;
        
        if(!name) { // Caso o nome da categoria seja inválido ; 
            return res.status(400).json({message: "Todos os campos são obrigatórios"}); // Retornando a mensagem de erro ; 
        }

        name = name.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 

        const categoriaExistente = await Categoria.findOne({name}); // Selecionando no banco de dados, uma categoria que estaja com o mesmo nome que a categoria informada pelo usuário ; 
       
        if(categoriaExistente) { // Caso já exista uma categoria com o nome informado ; 
            return res.status(409).json({message: "Erro ao adicionar categoria! Já existe uma categoria com o nome informado!"}); // Atribuindo uma mensagem de erro ; 
        }

        const novaCategoria = await Categoria.create ({ // Criando a nova categoria ; 
            name, 
            slug: slugify(name)
        })

        const retornoUser = novaCategoria ? res.status(201).json({message: `Categoria: ${novaCategoria.name} adicionada com sucesso!`}) : res.status(400).json({message: "Erro ao adicionar categoria!"}); // Atribuindo a mensagem de sucesso ou de erro baseado na condiição ; 
        return retornoUser; 
    }
    catch (error) {
        res.status(500).json({message: "Erro ao adicionar categoria"}); // Atribuindo a mensagem de erro;
    }
}

const selecionarCategorias = async (req, res) => { // Função responsável por selecionar todas as categorias cadastradas no banco de dados ; 
    try {
        const categorias = await Categoria.find(); // Selecionando todas as categorias cadastradas no banco de dados e atribuindo a variável ;
        return res.status(200).json(categorias); // Retornando as categorias cadastradas no banco de dados;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao selecionar categorias cadastradas no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const deletarCategoria = async (req, res) => { // Função responsável por deletar uma categoria cadastrada no banco de dados ; 
    try {
        let {id} = req.params; // Recuperando o ID;

        if (!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID não seja um ObjectId válido ; 
            return res.status(400).json({ message: "Erro ao excluir categoria! O ID é inválido" }); // Retornando a mensagem de erro ; 
        }


        const pedidoVinculadoCategoria = await Pedido.findOne({categoria: id }); // Verificando se a categoria está vinculada a um pedido para remoção ; 
        if(pedidoVinculadoCategoria) { // Caso a categoria esteja vinculada a um pedido
            return res.status(400).json({message: "Erro ao excluir categoria! A categoria está vinculada a um pedido existente"}); // Atribuindo a mensagem de erro ; 
        }

        
        const categoriaRemovida = await Categoria.findByIdAndDelete(id); // Deletando a categoria no banco de dados;
    
        const retornoUser = categoriaRemovida ? res.status(200).json({message: "A categoria foi removida com sucesso!"}) : res.status(404).json({message: "Erro ao excluir categoria! O ID é inválido"}); // Atribuindo a mensagem de erro ou sucesso baseado na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao excluir categoria!"}); // Atribuindo a mensagem de erro ;
    }
}

const atualizarCategoria = async (req, res) => { // Função responsável por atualizar uma categoria cadastrada no bando de dados . 
    let {id} = req.params; // Recuperando o ID ; 
    let {name} = req.body; // Recuperando o nome ; 

    if(!name || !id ) { // Caso o nome da categoria ou o ID seja inválido ; 
        return res.status(400).json({message: "Todos os campos são obrigatórios"}); // Atribuindo a mensagem de erro ; 
    }

    if (!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID não seja um ObjectId válido ; 
        return res.status(400).json({ message: "Erro ao atualizar categoria! O ID é inválido" }); // Atribuindo a mensagem de erro ; 
    }
        
    name = name.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 

    const idValido = await Categoria.findById(id); // Verificando se existe no banco de dados uma categoria com o ID informado ; 
    if(!idValido) {return res.status(404).json({message: "Erro ao atualizar categoria! O ID é inválido!"})}; // Atribuindo a mensagem de erro ; 

    const categoriaExistente = await Categoria.findOne({name}); // Selecionando uma categoria com o nome informado ; 
    if(categoriaExistente && categoriaExistente._id.toString() !== id) {return res.status(400).json({message: "Erro ao atualizar categoria! Já existe uma categoria com o nome informado!"})}; // Retornando a mensagem de erro ; 

    let categoriaAtualizada = await Categoria.findByIdAndUpdate(id, {name, slug: slugify(name)}); // Fazendo o update da categoria no banco de dados ; 
    const retornoUser = categoriaAtualizada ? res.status(200).json({message: `A categoria de ID: ${categoriaAtualizada.id} foi atualizada com sucesso!`}) : res.status(404).json({message: "Erro ao atualizar categoria"}); // Atribuindo a mensagem de sucesso ou de erro baseada na condição ; 
    return retornoUser;
}

module.exports = {adicionarCategoria, selecionarCategorias, deletarCategoria, atualizarCategoria}; // Exportando as funções para serem utilizados pelo router ; 