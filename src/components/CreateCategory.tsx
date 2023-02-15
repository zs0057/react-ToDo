import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { categoriesState, categoryState, toDoState } from "../atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategories((prev) => [...prev, category]);
    setValue("category", "");
  };

  useEffect(() => {
    setCategories(() => ["TO_DO", "DOING", "DONE"]);
  }, []);

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "Please write a category",
        })}
        placeholder="Write a category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
