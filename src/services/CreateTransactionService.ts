import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

//regra de negócio da criação da transação
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (!["income", "outcome"].includes(type)){
      throw new Error("Esta operação não é do tipo income ou outcome");
    }

      //vai retornar os 3 valores mas vamos utilizar só o total return {income, outcome, total,};
      const { total } = this.transactionsRepository.getBalance();
    if (type == "outcome" && total < value) {
      throw new Error("Você não pode fazer esta operação, saldo insuficiente");

    }


    //usa o repositório
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction;
  }
}

export default CreateTransactionService;
