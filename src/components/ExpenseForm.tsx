import categories from "./categories";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(1, "Description is required.")
    .max(50, { message: "Description cannot be more than 50 characters." }),
  cost: z.number({ invalid_type_error: "Cost is required." }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data), reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="cost" className="form-label">
          Cost
        </label>
        <input
          {...register("cost", { valueAsNumber: true })}
          id="cost"
          type="number"
          step="any"
          className="form-control"
        />
        {errors.cost && <p className="text-danger">{errors.cost.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option></option>
          {categories.map((categ) => (
            <option key={categ} value={categ}>
              {categ}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
