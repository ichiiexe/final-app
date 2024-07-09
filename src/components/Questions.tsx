import { useEffect, useState } from "react";
import { getQuestions } from "../util/api";
import { Question } from "../interfaces/questions";
import { QuestionInput } from "./QuestionInput";
import { Results } from "./Results";

export function Questions(props: any) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAns, setSelectedAns] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [result, setResult] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [counter, setCounter] = useState<any>(30);
  const [score, setScore] = useState(0);

  const loader = async () => {
    const response = (await getQuestions(props.input)) as Question[];

    setQuestions(response);
    setHasLoaded(true);
  };

  useEffect(() => {
    const loader = async () => {
      const response = (await getQuestions(props.input)) as Question[];

      setQuestions(response);
      setHasLoaded(true);
    };

    loader();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);

    if (counter <= 0 && !result) {
      // random answer///
      const randomAnswer = Object.entries(questions[currIndex].answers).filter(
        (rando) => !rando.includes(null),
      );

      const randomValue: any =
        randomAnswer[
          Math.floor(
            Math.random() * Object.keys(questions[currIndex].answers).length,
          )
        ];

      console.log(randomValue);

      setSelectedAns(randomValue);
      clearTimeout(timer);
      handleNextQuest();
    } else if (counter <= 0 && result) {
      setCounter(30);
      setResult(false);
      setCurrIndex(0);
      setScore(0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  //handlers//

  const handleNextQuest = () => {
    console.log(questions);

    const multipleAnswer = Object.entries(
      questions[currIndex].correct_answers,
    ).filter((filtered) => filtered.includes("true"));

    setCurrIndex(currIndex + 1);

    //answer check//
    if (
      questions[currIndex].correct_answer !== null &&
      selectedAns === questions[currIndex].correct_answer
    ) {
      setScore(score + 1);
    } else if (
      questions[currIndex].correct_answer === null &&
      multipleAnswer[0].includes(selectedAns + "_correct")
    ) {
      setScore(score + 1);
    }

    if (currIndex !== questions.length - 1) {
      setCurrIndex(currIndex + 1);
      setCounter(30);
      clearTimeout(0);
    } else {
      setResult(true);
      setCounter(45);
    }

    setSelectedAns("");
  };

  //ANSWER SELECTION//
  const handleSelAns = (e?: any) => {
    setSelectedAns(e.target.value);
  };

  if (hasLoaded && !result) {
    const { question, answers, multiple_correct_answers } =
      questions[currIndex];
    return (
      <div className="flex w-2/3 flex-col rounded border-black/95 bg-white p-4 shadow-xl">
        <>
          <div className="flex items-center justify-between py-2 text-lg">
            <h1 className="rounded border bg-black/5 p-1 px-2 shadow-md">
              Question {currIndex + 1} of {questions.length}
            </h1>
            <h1 className="min-w-18 rounded border bg-black/5 p-1 px-2 shadow-md">
              ⏱️: {counter}
            </h1>
          </div>
        </>

        <div className="px-2">
          <h1 className="my-5 rounded border bg-black/5 p-3 px-2 text-lg font-bold italic shadow-md">
            {currIndex + 1}. {question}
          </h1>
          <div className="flex w-full flex-col gap-2">
            {Object.values(answers).map((answer, index) => {
              const value = Object.keys(answers);

              if (answer !== null) {
                return (
                  <QuestionInput
                    check={selectedAns === value[index]}
                    onChange={handleSelAns}
                    answer={answer}
                    key={index}
                    inputType={
                      multiple_correct_answers === "true" ? "checkbox" : "radio"
                    }
                    value={value[index]}
                  />
                );
              }
            })}
          </div>
        </div>
        <button
          className="mt-5 rounded border bg-green-500 p-2 font-bold text-white shadow-lg"
          onClick={handleNextQuest}
        >
          {currIndex !== questions.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    );
  } else if (!hasLoaded) {
    return <h1 className="text-2xl font-bold tracking-widest">LOADING...</h1>;
  } else if (hasLoaded && result) {
    return (
      <Results
        color={score < 5 ? "text-red-500" : "text-green-500"}
        questionLength={questions.length}
        score={score}
        scorePercentage={(score / questions.length) * 100}
        timer={counter}
        handleAgain={() => {
          setScore(0);
          setCurrIndex(0);
          setCounter(30);
          setResult(false);
          loader();
        }}
        handleOver={() => {
          setCounter(30);
          setResult(false);
          setCurrIndex(0);
          setScore(0);
        }}
        handleHome={props.setBack}
      />
    );
  }
}
