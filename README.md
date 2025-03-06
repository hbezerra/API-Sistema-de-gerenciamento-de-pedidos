<h1>📦 Sistema de Gerenciamento de Pedidos</h1>

<p>Este repositório contém a implementação do back-end de um sistema de gerenciamento de pedidos, desenvolvido com <strong>Node.js</strong> e <strong>MongoDB</strong>. A autenticação de usuários é feita utilizando <strong>JSON Web Token (JWT)</strong>, garantindo segurança no acesso às funcionalidades do sistema.</p>

<p>O projeto inclui operações de CRUD, integração com o banco de dados MongoDB e middleware de autenticação para proteger rotas sensíveis.</p>

<h3>📂 Entidades</h3>
<ul>
    <li>📁 <strong>Categorias</strong> (nome, slug)</li>
    <li>🏪 <strong>Vendedor</strong> (nome)</li>
    <li>🧑‍💼 <strong>Cliente</strong> (nome, email, [pedidos])</li>
    <li>📝 <strong>Pedido</strong> (pedido, endereço, telefone, categoria, vendedor, cliente)</li>
</ul>

<h3>🚀 Tecnologias Utilizadas</h3>
<ul>
    <li>🟢 <strong>Node.js</strong> - Ambiente de execução JavaScript</li>
    <li>⚡ <strong>Express</strong> - Framework para criação de APIs</li>
    <li>🗄️ <strong>MongoDB + Mongoose</strong> - Banco de dados NoSQL e ODM</li>
    <li>🔐 <strong>JSON Web Token (JWT)</strong> - Autenticação segura</li>
    <li>🔑 <strong>bcrypt</strong> - Hash de senhas</li>
</ul>

<h3>🛠 Funcionalidades Implementadas</h3>
<ul>
    <li>✅ Cadastro e autenticação de usuários</li>
    <li>📦 CRUD de pedidos, clientes, vendedores e categorias</li>
    <li>🔗 Associação entre pedidos, clientes, vendedores e categorias</li>
    <li>🔒 Middleware de autenticação JWT para rotas protegidas</li>
</ul>

<h3>⚙️ Instalação e Execução</h3>
<pre>
# Clone o repositório
git clone https://github.com/hbezerra/API-Sistema-de-gerenciamento-de-pedidos

# Acesse o diretório do projeto
cd API-Sistema-de-gerenciamento-de-pedidos

# Instale as dependências
npm install

# Execute o servidor
npm start
</pre>

<h3>📬 Contato</h3>
<ul>
    <li>Email: <a href="mailto:hbezerradev@gmail.com">hbezerradev@gmail.com</a></li>
</ul>
