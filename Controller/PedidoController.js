const mongoose = require("mongoose"); // Importando a biblioteca mongoose ;
const Pedido = require("../Model/Pedido"); // Importando o model de pedidos ; 
const Cliente = require("../Model/Cliente"); // Importando o model de clientes ; 
const Vendedor = require("../Model/Vendedor"); // Importando o model de vendedores ; 
const Categoria = require("../Model/Categoria");

const selecionarPedidos = async (req, res) => { // Função responsável por selecionar todos os pedidos cadastrados no banco de dados ;
    try {
        const pedidos = await Pedido.find().populate("categoria").populate("vendedor").populate("cliente"); // Selecionando todos os pedidos cadastrados no banco de dados e atribuindo a variável ; 
        return res.status(200).json(pedidos); // Retornando todos os pedidos cadastrados no banco de dados ; 
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao selecionar pedidos cadastrados no banco de dados!" }); // Mensagem de erro ; 
    }
}

const adicionarPedido = async (req, res) => { // Função responsável por adicionar um pedido no banco de dados; 
    try {
        let {pedido, endereco, telefone, categoria, vendedor, cliente} = req.body; // Recuperando os dados e atribuindo as variáveis; 

        if (!pedido || !endereco || !cliente || !telefone || !categoria || !vendedor) { // Verificando se todos os dados são válidos;
            return res.status(400).json({ message: "Erro ao adicionar pedido! Todos os campos são obrigatórios" }); // Atribuindo a mensagem de erro ;
        }

        if (!mongoose.Types.ObjectId.isValid(categoria) || !mongoose.Types.ObjectId.isValid(vendedor) || !mongoose.Types.ObjectId.isValid(cliente)) { // Caso o ID da categoria, do vendedor ou do cliente não sejam válidos ; 
            return res.status(400).json({ message: "Erro ao adicionar pedido! Categoria, vendedor ou cliente inválidos." }); // Atribuindo a mensagem de erro ;
        }

        if(isNaN(telefone)) { // Caso o número de telefone não seja um número ; 
            return res.status(400).json({message: "Erro ao adicionar pedido! Número de telefone inválido"}); // Atribuindo a mensagem de erro ; 
        }


        const pedidoVinculadoCliente = await Pedido.findOne({cliente}); // Verificando se o cliente já possui um pedido cadastrado ;
        if(pedidoVinculadoCliente) {return res.status(400).json({message: "Erro ao adicionar pedido! O cliente já possui um pedido cadastrado"});} // Atribuindo a mensagem de erro ;
    

        const novoPedido = await Pedido.create({ // Salvando o novo pedido no banco de dados ; 
            pedido,
            endereco,
            telefone,
            categoria,
            vendedor, 
            cliente
        })

        if(novoPedido) { // Caso o pedido tenha sido adicionado no banco de dados ; 
            await Vendedor.findByIdAndUpdate(vendedor, {$push: {pedidos: novoPedido._id}}, {new: true}) // Vinculando o pedido adicionado ao vendedor ; 
            await Categoria.findByIdAndUpdate(categoria, {$push: {pedidos: novoPedido._id}}, {new: true}) // Vinculando o pedido adicionado a categoria ;
            await Cliente.findByIdAndUpdate(cliente, {$push: {pedidos: novoPedido._id}}, {new: true}) // Vinculando o pedido adicionado ao cliente ; 
            return res.status(201).json({message: `O pedido: ${novoPedido.pedido} foi adicionado com sucesso!`}); // Retornando a mensagem de sucesso ; 
        }
        else { // Caso o pedido não tenha sido adicionado no banco de dados ; 
            return res.status(400).json({message: "Erro ao adicionar pedido! Verifique os dados e tente novamente"}); // Retornando a mensagem de erro ; 
        }
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao adicionar pedido no banco de dados!" }); // Atribuindo a mensagem de erro ; 
    }
}

const deletarPedido = async (req, res) => { // Função responsável por deletar um pedido no banco de dados ; 
    try {
        
        let { id } = req.params; // Recuperando o ID no parâmetro da requisição ; 

        if (!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID não seja um ObjectId válido ; 
            return res.status(400).json({ message: "Erro ao excluir vendedor! O ID é inválido" }); // Atribuinfo a mensagem de erro ; 
        }

        const pedidoRemovido = await Pedido.findByIdAndDelete(id); // Buscando o pedido no banco de dados e deletando ;
        
        if(pedidoRemovido) { // Caso o pedido seja removido com sucesso! ; 
            await Vendedor.findByIdAndUpdate(pedidoRemovido.vendedor, {$pull: {pedidos:id}}, {new: true}) // Excluindo o ID do pedido do array de vendedores vinculados ; 
            await Cliente.findByIdAndUpdate(pedidoRemovido.cliente, {$pull: {pedidos:id}}, {new: true}) // Excluindo o ID do pedido do array de clientes vinculados ;
            await Categoria.findByIdAndUpdate(pedidoRemovido.categoria, {$pull: {pedidos: id}}, {new: true}) // Excluindo o ID do pedido do arrau de categoria vinculados
            return res.status(200).json({messagem: "O pedido foi excluído com sucesso!"}); // Retornando a mensagem de sucesso ; 
        }
        else { // Caso o pedido não tenha sido removido ; 
            return res.status(404).json({message: "Erro ao deletar pedido! O ID informado não é válido"}); // Retornando a mensagem de erro ; 
        }
        
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao deletar pedido no banco de dados!" }); // Atribuindo a mensagem de erro ; 
    }
}

const atualizarPedido = async (req, res) => { // Função responsável por atualizar pedido no banco de dados ; 
    try {
        let {id} = req.params; // Recuperando o ID do pedido e atribuindo a variável ; 
        let { pedido, endereco, telefone, categoria, vendedor, cliente } = req.body; // Recuperando os dados e atribuindo as variáveis; 

        if (!mongoose.Types.ObjectId.isValid(id)) { // Caso o ID não seja um ObjectId válido ; 
            return res.status(400).json({ message: "Erro ao atualizar pedido! O ID é inválido" }); // Atribuindo a mensagem de erro ; 
        }

        if(isNaN(telefone)) { // Caso o número de telefone não seja um número ; 
            return res.status(400).json({message: "Erro ao adicionar pedido! Número de telefone inválido"}); // Atribuindo a mensagem de erro ; 
        }

        if (!pedido || !endereco  || !telefone || !categoria || !vendedor || !cliente) { // Verificando se todos os dados são válidos;
            return res.status(400).json({ message: "Erro ao atualizar pedido! Todos os campos são obrigatórios" }); // Atribuindo a mensagem de erro ;
        }

        if (!mongoose.Types.ObjectId.isValid(categoria) || !mongoose.Types.ObjectId.isValid(vendedor) || !mongoose.Types.ObjectId.isValid(cliente)) { // Caso o ID da categoria, do vendedor ou do cliente não sejam válidos ; 
            return res.status(400).json({ message: "Erro ao atualizar pedido! Categoria, vendedor ou cliente inválidos." }); // Atribuindo a mensagem de erro ;
        }

        const pedidoVinculadoCliente = await Pedido.findOne({cliente}); // Verificando se o cliente já possui um pedido cadastrado ;
        if(pedidoVinculadoCliente) {return res.status(400).json({message: "Erro ao atualizar pedido! O cliente já possui um pedido cadastrado"});} // Atribuindo a mensagem de erro ;

        const pedidoAtualizado = await Pedido.findByIdAndUpdate(id, {pedido, endereco, telefone, categoria: new mongoose.Types.ObjectId(String(categoria)), vendedor: new mongoose.Types.ObjectId(String(vendedor)), cliente: new mongoose.Types.ObjectId(String(cliente))}); // Fazendo o Update no banco de dados ; 
        const retornoUser = pedidoAtualizado ? res.status(200).json({message: `O pedido de ID: ${pedidoAtualizado.id} foi atualizado com sucesso!`}) : res.status(400).json({message: "Erro ao atualizar pedido no banco de dados!"}); // Atribuindo a mensagem de errou ou sucesso baseado na condição ; 
        return retornoUser;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar pedido no banco de dados!" }); // Atribuindo a mensagem de erro ; 
    }
}

module.exports = { selecionarPedidos, adicionarPedido, deletarPedido, atualizarPedido }; // Exportando as funções para serem utilizadas pelo router ; 