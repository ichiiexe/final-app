import { useEffect, useState } from "react";
import { getCategories } from "../util/api";
import { Category } from "../interfaces/category";

export function Option({ setData, setActive }: any) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getData() {
      const fetchedData = (await getCategories()) as Category[];
      setCategories(fetchedData);
    }

    getData();
  }, []);

  const handleCurrCategory = (e: any) => {
    setData(e?.target.value);
  };

  return (
    <div className="flex w-1/3 flex-col gap-5 rounded-md border border-black/40 bg-white p-10 shadow-xl">
      <div className="flex flex-col gap-5">
        <label className="text-center text-2xl font-semibold">
          Select category:
        </label>
        <select onChange={handleCurrCategory} className="rounded border p-1">
          <option value="">Any</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={setActive}
        className="rounded bg-green-500 p-2 font-bold text-white"
      >
        Start Quiz
      </button>
    </div>
  );
}
