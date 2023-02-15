import { Categories, categoriesState, IToDo, toDoState } from "../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(event);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categories.map((availableCategory) => (
        <button
          name={availableCategory}
          disabled={availableCategory === category}
          key={availableCategory}
          onClick={onClick}
        >
          {availableCategory}
        </button>
      ))}
    </li>
  );
}

export default ToDo;
