import Transaction from '../models/Transaction';
//o repositorio vai criar novos dados, buscar os dados

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}


class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    //precisa ter acesso a todas as transições q estão aqui private transactions: Transaction[];
    return this.transactions;
  }

  public getBalance(): Balance {
    // vai retorna  income, outcome, total
    const { income, outcome } = this.transactions.reduce((acumulator: Balance, transaction: Transaction) => {
      switch (transaction.type) {
        case "income":
          acumulator.income += transaction.value;
          break;

        case "outcome":
          acumulator.outcome += transaction.value;
          break;
        default:
          break;
      }
      return acumulator;
    },
      {
        income: 0,
        outcome: 0,
        total: 0,
      });

    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateRepositoryDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    })
    //inserir a transaction na  private transactions: Transaction[];
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
