import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import { Expense } from "./components/ExpenseList";

function App() {
  const [selectedCateg, setSelectedCateg] = useState("All Categories");

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const visibleItems =
    selectedCateg === "All Categories"
      ? expenses
      : expenses.filter(
          (expense: Expense) => expense.category === selectedCateg
        );

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-4">
        <ExpenseFilter onSelect={(category) => setSelectedCateg(category)} />
      </div>
      <ExpenseList
        expenses={visibleItems}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
    </div>
  );
}

export default App;
