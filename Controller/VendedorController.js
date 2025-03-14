const mongoose = require("mongoose");
const Vendedor = require("../Model/Vendedor"); // Importando o model de vendedor ; 
const Pedido = require("../Model/Pedido"); // Importando o model de pedidos ; 

const adicionarVendedor = async (req, res) => { // Função responsável por adicionar um vendedor no banco de dados;
    try {
        let {name} = req.body; // Recuperando o nome informado pelo usuário ; 
   
        if(!name) { // Caso o nome informada seja inválido ; 
            return res.status(400).json({message: "Todos os campos são obrigatórios"}); // Retornando a mensagem de erro ; 
        }

        name = name.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 

        const vendedorExistente = await Vendedor.findOne({name}); // Selecionando no banco de dados um vendedor onde o nome seja igual ao nome informado pelo usuário para verificação; 
       
        if(vendedorExistente) { // Caso já exista um vendedor com nome informado; 
            return res.status(409).json({message: `Erro ao adicionar vendedor! Já existe um vendedor com o nome informado!`}); // Atribuindo a mensagem de erro ; 
        }    
        
        const novoVendedor = await Vendedor.create({ // Criando o novo vendedor no banco de dados;
            name // Atribuindo o nome informado pelo usuário ao campo nome ; 
        })

        const retornoUser = novoVendedor ? res.status(201).json({ message: `O novo vendedor: ${novoVendedor.name}, foi adicionado com sucesso!`}) : res.status(400).json({message: "Erro ao adicionar vendedor"}); // Atribuindo a mensagem de erro ou de sucesso baseada na condição ; 
        return retornoUser ; 
    }
    catch (error) {
        res.status(500).json({message: "Erro ao adicionar vendedor no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const deletarVendedor = async (req, res) => { // Função responsável por excluir um vendedor no banco de dados ; 
    try {
        let {id} = req.params; // Recuperando o ID do vendedor que será excluído ; 

        if (!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID não seja um ObjectId válido ; 
            return res.status(400).json({ message: "Erro ao excluir vendedor! O ID é inválido" }); // Atribuindo a mensagem de erro ; 
        }
        
        const vendedorAssociadoPedido = await Pedido.findOne({vendedor: id}); // Verificando se o vendedor está associado a algum pedido antes de ser excluído ; 
        if(vendedorAssociadoPedido) { // Caso o vendedor esteja associado a algum pedido ;
            return res.status(400).json({message: "Erro ao excluir vendedor! Ele está sendo referenciado na tabela de pedidos"}); // Atribuindo a mensagem de erro ; 
        }

        const vendedorRemovido = await Vendedor.findByIdAndDelete(id); // Excluindo o vendedor do banco de dados ; 
        const retornoUser = vendedorRemovido ? res.status(200).json({message: "O vendedor foi excluído com sucesso!"}) : res.status(404).json({message: "Erro ao excluir vendedor! O ID informado não é válido"}); // Atribuindo a mensagem de erro ou de sucesso baseada na condição ; 
        return retornoUser;
    } catch(error) {
        res.status(500).json({message: "Erro ao excluir vendedor no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const selecionarVendedores = async (req, res) => { // Função responsável por selecionar todos os vendedores cadastrados no banco de dados; 
    try {
        const vendedoresCadastrados = await Vendedor.find(); // Selecionando todos os vendedores cadastrados e atribuindo a variável; 
        return res.status(200).json(vendedoresCadastrados); // Retornando todos os vendedores cadastrados no banco de dados;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao selecionar vendedores no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const atualizarVendedor = async (req, res) => { // Função responsável por atualizar os dados de um vendedor no banco de dados ; 
    let {id} = req.params; // Recuperando o ID; 
    let {name} = req.body; // Recuperando o nome a ser atualizado; 

    if(!name || !id) { // Caso o nome ou o id informados sejam inválidos ; 
        return res.status(400).json({message: "Todos os campos são obrigatórios"}); // Atribuindo a mensagem de erro ; 
    }

    if (!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID não seja um ObjectId válido ; 
        return res.status(400).json({ message: "Erro ao atualizar vendedor! O ID é inválido"}); // Atribuindo a mensagem de erro ; 
    }

    name = name.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 
    
    const vendedorExistente = await Vendedor.findOne({name}); // Selecionando no banco de dados um vendedor onde o nome seja igual ao nome informado pelo usuário para verificação; 
       
    if(vendedorExistente) { // Caso já exista um vendedor com nome informado; 
        return res.status(409).json({message: `Erro ao adicionar vendedor! Já existe um vendedor com o nome informado!`}); // Atribuindo a mensagem de erro;
    }

    let vendedorAtualizado = await Vendedor.findByIdAndUpdate({id}, {name}); // Atualizando o vendedor no banco de dados ; 
    const retornoUser = vendedorAtualizado ? res.status(200).json({message: `O vendedor de ID: ${vendedorAtualizado.id} foi atualizado com sucesso!`}) : res.status(400).json({message: "Erro ao atualizar vendedor"}); // Atribuindo a mensagem de sucesso ou de erro baseada na condição ; 
    return retornoUser;
}


module.exports = {adicionarVendedor, deletarVendedor, selecionarVendedores, atualizarVendedor}; // Exportando as funções para serem utilizadas no router;