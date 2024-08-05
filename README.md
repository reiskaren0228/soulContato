# Projeto de Backend com Express e MongoDB

Este é um projeto de backend utilizando Node.js com Express e MongoDB. O projeto inclui um servidor RESTful para gerenciar usuários.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para criar o servidor e as rotas.
- **MongoDB**: Banco de dados NoSQL para armazenar dados.
- **Insomnia**: Ferramenta para testar as APIs.
- **VSCode**: Editor de código.

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seuusuario/seurepositorio.git
   cd seurepositorio
   ```

2. Instale as dependências
   
   ```bash
   npm install
   ```
3.  Configure o MongoDB

    - ** Certifique-se de que o MongoDB está rodando em sua máquina. Atualize a string de conexão no arquivo de configuração (se necessário).**

4.  Inicie o servidor
   
   ```bash
   npm install
   ```
O servidor estará rodando em http://localhost:3001.

## Endpoints
- Criar Usuário POST /usuario
- Listar Usuários GET /usuario
- Obter Usuário GET /usuario/:id
- Atualizar Usuário PUT /usuario/:id
- Deletar Usuário DELETE /usuario/:id
- Testando com Insomnia
Para testar os endpoints, você pode usar o Insomnia. Importe o arquivo de configuração da API (se disponível) ou crie suas próprias requisições conforme os endpoints listados acima.

## Contribuição
Sinta-se à vontade para contribuir com o projeto enviando um pull request.

## Licença
Este projeto está licenciado sob a Licença MIT.
