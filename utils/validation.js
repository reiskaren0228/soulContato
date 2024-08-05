import Joi from "joi";

// Validacão para a inserção/atualização de um contato
export const contatoValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  sobrenome: Joi.string().max(150),
  email: Joi.string().email(),
  telefone: Joi.string().required(),
  observacoes: Joi.string().max(200),
  favorito: Joi.boolean(),
});

// Validação para a inserção/atualização de um usuário
export const usuarioValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});
