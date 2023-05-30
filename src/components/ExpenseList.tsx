import styles from "./ExpenseList.module.css";

export interface Expense {
  description: string;
  cost: number;
  category: string;
  id: number;
}

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) {
    return null;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Description</th>
          <th className={styles.th}>Cost</th>
          <th className={styles.th}>Category</th>
          <th className={styles.th}></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td className={styles.td}>{expense.description}</td>
            <td className={styles.td}>{expense.cost.toFixed(2)}</td>
            <td className={styles.td}>{expense.category}</td>
            <td className={styles.td}>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className={styles.td}>Total</td>
          <td className={styles.td}>
            $
            {expenses
              .reduce((total, expense) => total + expense.cost, 0)
              .toFixed(2)}
          </td>
          <td className={styles.td}></td>
          <td className={styles.td}></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
