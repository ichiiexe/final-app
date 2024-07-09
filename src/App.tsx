import { useState } from "react";
import { Option } from "./components/Options";
import { Questions } from "./components/Questions";

function App() {
  const [quizStart, setQuizStart] = useState(false);
  const [currCategory, setCurrCategory] = useState("");

  const handleData = (data: any) => {
    setCurrCategory(data);
  };

  const handleActive = () => {
    setQuizStart(true);
  };

  const handleBack = () => {
    setQuizStart(false);
  };

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-blue-400">
      {!quizStart ? (
        <Option setData={handleData} setActive={handleActive} />
      ) : (
        <Questions input={currCategory} setBack={handleBack} />
      )}
    </div>
  );
}

export default App;
