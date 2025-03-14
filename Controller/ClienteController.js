const mongoose = require("mongoose"); // Importando a biblioteca mongoose ;
const Cliente = require("../Model/Cliente"); // Importando o model de cliente ; 
const Pedido = require("../Model/Pedido"); // Importando o model de pedidos ; 

const selecionarClientes = async (req, res) => { // Função responsável por selecionar todos os clientes cadastrados no banco de dados ; 
    try {
        const clientes = await Cliente.find(); // Selecionando todos os clientes cadastrados no banco de dados e atribuindo a variável ; 
        return res.status(200).json(clientes); // Retornando os clientes cadastrados no banco de dados ; 
    }
    catch (error) {
        res.status(500).json({message: "Erro ao selecionar os clientes cadastrados no banco de dados!"}); // Atribuindo a mensagem de erro;
    }
}

const adicionarCliente = async (req, res) => { // Função responsável por adicionar um cliente no banco de dados ; 
    try {
        let {nome, email} = req.body; // Recuperando os dados informados pelo usuário e atribuindo as variáveis ; 
        if(!nome || !email) { // Caso o nome ou email informados pelo usuário estejam nulo ; 
            return res.status(400).json({message: "Erro ao adicionar cliente no banco de dados! Todos os campos são obrigatórios"}); // Atribuindo a mensagem de erro ; 
        }

        email = email.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 

        const clienteExistente = await Cliente.findOne({email}); // Verificando se existe um cliente cadastrado com o e-mail informado ; 
        if(clienteExistente) { // Caso já exista um cliente com o email informado ; 
            return res.status(400).json({message: "Erro ao adicionar cliente no banco de dados! O e-mail informado já existe!"}); // Atribuindo a mensagem de erro ; 
        }

        const novoCliente = await Cliente.create({ // Criando o novo cliente no banco de dados ; 
            nome, 
            email
        })

        const retornoUser = novoCliente ? res.status(200).json({message: `O novo cliente: "${novoCliente.nome}" foi adicionado com sucesso!`}) : res.status(400).json({message: "Erro ao adicionar cliente!"}); // Atribuindo a mensagem de sucesso ou de erro baseado na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao adicionar cliente no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const excluirCliente = async (req, res) => { // Função responsável por excluir um cliente no banco de dados ; 
    try {
        let {id} = req.params; // Recuperando o ID do cliente a ser excluído ; 

        if(!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID seja inválido ; 
            return res.status(400).json({message: "Erro ao excluir cliente! O ID informado é inválido!"}); // Atribuindo a mensagem de erro ; 
        }

        const clienteAssociadoPedido = await Pedido.findOne({cliente: id}); // Verificando se o cliente a ser excluído está sendo associado a algum pedido ; 
        if(clienteAssociadoPedido) { // Caso o cliente esteja associado a algum pedido ; 
            return res.status(400).json({message: "Erro ao excluir cliente! O cliente está associado a um pedido."}); // Atribuindo a mensagem de erro ; 
        }
    
        const clienteDeletado = await Cliente.findByIdAndDelete(id); // Excluindo o cliente no banco de dados e atribuindo a variável o resultado ; 
        const retornoUser = clienteDeletado ? res.status(200).json({message:"O cliente foi deletado com sucesso!"}) : res.status(404).json({message:"Erro ao excluir cliente. Não foi possível achar um cliente com o ID informado!"}); // Atribuindo a mensagem de erro ou de sucesso baseado na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao excluir cliente do banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

const atualizarCliente = async (req, res) => { // Função responsável por atualizar um cliente no banco de dados ; 
    try {
        const {id} = req.params; // Recuperando o ID do cliente a ser atualizado ; 
        let {nome, email} = req.body; // Recuperando o novo nome e e-mail;

        if(!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID seja inválido ; 
            return res.status(400).json({message: "Erro ao atualizar cliente! O ID informado é inválido!"}); // Atribuindo a mensagem de erro ; 
        }
    
        if(!nome || !email) { // Caso o nome ou email informados pelo usuário estejam nulo ; 
            return res.status(400).json({message: "Erro ao atualizar cliente no banco de dados! Todos os campos são obrigatórios"}); // Atribuindo a mensagem de erro ; 
        }

        email = email.trim().toLowerCase(); // Eliminando espaços em brancos e trasformando tudo em minúsculas ; 

        const clienteExistente = await Cliente.findOne({email}); // Verificando se existe um cliente cadastrado com o e-mail informado ; 
        if(clienteExistente) {
            return res.status(400).json({message: "Erro ao adicionar cliente no banco de dados! O e-mail informado já existe!"}); // Atribuindo a mensagem de erro ; 
        }

        let clienteAtualizado = await Cliente.findByIdAndUpdate(id, {nome, email}); 
        let retornoUser = clienteAtualizado ? res.status(200).json({message: `O cliente de ID: ${clienteAtualizado.id} foi atualizado com sucesso!`}) : res.status(404).json({message: `Erro ao atualizar cliente! Não foi possível encontrar nenhum cliente com o ID informado!`}); // Atribuindo a mensagem de sucesso ou de erro baseado na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({message: "Erro ao atualizar cliente no banco de dados!"}); // Atribuindo a mensagem de erro ; 
    }
}

module.exports = {selecionarClientes, adicionarCliente, excluirCliente, atualizarCliente}; // Exportando as funções para ser utilizadas no router ; 