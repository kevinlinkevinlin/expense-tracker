import categories from "./categories";

interface Props {
  onSelect: (category: string) => void;
}

const ExpenseFilter = ({ onSelect }: Props) => {
  return (
    <select
      className="form-select"
      onChange={(event) => onSelect(event.target.value)}
    >
      <option value="All Categories">All Categories</option>
      {categories.map((categ) => (
        <option key={categ} value={categ}>
          {categ}
        </option>
      ))}
    </select>
  );
};

export default ExpenseFilter;
