import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    //get vai listar todas as transações cadastradas
    const transactions = transactionsRepository.all();

    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});




transactionRouter.post('/', (request, response) => {
  try {
    // busca todos os valores title, value, type para criar a transação 
    //pega do corpo
    const { title, value, type } = request.body;

    //uso do repositório
    //cria 
    const createTransaction = new CreateTransactionService(
      transactionsRepository//passa a instância do repositório
    );

    //o execute vai executar a criação da transaction
    //e vai retornar a criação de uma trasação
    //executa e realmente cria a transação e retorna
    const transaction = createTransaction.execute({
      //passa os valores que temos
      title,
      value,
      type
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }


});

export default transactionRouter;
