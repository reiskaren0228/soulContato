import express from "express";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import { Contato } from "./models/contato.js";
import { Usuario } from "./models/usuario.js";
import { contatoValidation, usuarioValidation } from "./utils/validation.js"; // Certifique-se de que essa importação está correta

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongo DB Conectado!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

// INSERÇÃO DE CONTATO [POST]
app.post("/contatos", async (req, res) => {
  // Valida os dados =>
  //error -> objeto com detalhes dos erros de validação
  //value -> são os dados do req.body
  const { error, value } = contatoValidation.validate(req.body);

  if (error) {
    // HTTP 400 - Bad Request => indica que a requisição tem dados inválidados
    res.status(400).json({ message: "Dados inválidos", error: error.details });
    return;
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = value;

  try {
    const novoContato = new Contato({
      nome,
      sobrenome,
      email,
      telefone,
      observacoes,
      favorito,
    });
    await novoContato.save();
    res.json({ message: "Contato criado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao adicionar um novo contato", error: err });
  }
});

// LISTAGEM DE CONTATOS [GET]
app.get("/contatos", async (req, res) => {
  const lista = await Contato.find();
  res.json(lista);
});

app.get("/contatos/:id", async (req, res) => {
  const contato = await Contato.findById(req.params.id).select("-__v");

  if (contato) {
    res.json(contato);
  } else {
    res.status(404).json({ message: "Contato não encontrado" });
  }
});

// ATUALIZAÇÃO DE CONTATO [PUT]
app.put("/contatos/:id", async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body);

  if (error) {
    // HTTP 400 - Bad Request => indica que a requisição tem dados inválidados
    res.status(400).json({ message: "Dados inválidos", error: error.details });
    return;
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = value;

  try {
    // Ele procura pelo contato indicado pelo ID, se existir ele será atualizado
    const contato = await Contato.findByIdAndUpdate(
      req.params.id,
      {
        nome,
        sobrenome,
        email,
        telefone,
        observacoes,
        favorito,
      },
      { new: true } // Para retornar o documento atualizado
    );

    if (contato) {
      res.json({ message: "Contato atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Contato não encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o contato", error: err });
  }
});

// REMOÇÃO DE CONTATO [DELETE]
app.delete("/contatos/:id", async (req, res) => {
  try {
    const contato = await Contato.findByIdAndDelete(req.params.id);

    if (contato) {
      res.json({ message: "Contato removido com sucesso!" });
    } else {
      res.status(404).json({ message: "Contato não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover o contato", error: err });
  }
});

// Usuarios[GET, POST, PUT, DELETE]

// LISTAGEM DE USUÁRIOS [GET]
app.get("/usuario", async (req, res) => {
  const listaUsuario = await Usuario.find();
  res.json(listaUsuario);
});

app.get("/usuario/:id", async (req, res) => {
  const usuario = await Contato.findById(req.params.id).select("-__v");

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ message: "Usuário não encontrado" });
  }
});

//INSERÇÃO DE Usuário [POST]
app.post("/usuario", async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body);

  if (error) {
    // HTTP 400 - Bad Request => indica que a requisição tem dados inválidados
    res.status(400).json({ message: "Dados inválidos", error: error.details });
    return;
  }

  const { nome, email, senha } = value;

  try {
    const novoUsuario = new Usuario({
      nome,
      email,
      senha,
    });
    await novoUsuario.save();
    res.json({ message: "Usuário criado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao adicionar um novo usuário", error: err });
  }
});

// ATUALIZAÇÃO DE USUÁRIO [PUT]
// Atualização e Validação do Usuario

app.put("/usuario/:id", async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body);

  if (error) {
    res.status(400).json({ message: "Dados inválidos", error: error.details });
    return;
  }

  const { nome, email, senha } = value;

  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      {
        nome,
        email,
        senha,
      },
      { new: true } // Para retornar o documento atualizado
    );

    if (usuario) {
      res.json({ message: "Usuário atualizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o usuário", error: err });
  }
});

// REMOÇÃO DE USUÁRIO [DELETE]
app.delete("/usuario/:id", async (req, res) => {
  try {
    const usuarioDeletado = await Usuario.findByIdAndDelete(req.params.id);

    if (usuarioDeletado) {
      res.json({ message: "Usuário removido com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover o usuário", error: err });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
