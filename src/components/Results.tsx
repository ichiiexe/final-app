export function Results(props: any) {
  return (
    <>
      <div className="flex w-2/3 flex-col gap-5 rounded border-black/95 bg-white p-6 text-xl font-semibold shadow-xl">
        <div>
          <h1 className="flex justify-between">
            Total Questions: <span>{props.questionLength}</span>
          </h1>
          <h1 className="flex justify-between">
            Correct Answers: <span>{props.score}</span>
          </h1>
        </div>

        <div className="flex justify-between border-t pt-4">
          <h1>Score:</h1>
          <h1>
            <span className={props.color}>{props.scorePercentage}</span>%
          </h1>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t pt-4">
          <button
            className="rounded bg-green-500 p-2 text-white shadow-md"
            onClick={props.handleAgain}
          >
            Try again➡️
          </button>
          <button
            className="rounded bg-red-500 p-2 text-white shadow-md"
            onClick={props.handleOver}
          >
            Start over 🔁
          </button>
        </div>
      </div>
      <h1 className="text-black/50">
        Auto restart in <span className="font-bold">{props.timer}</span> seconds
      </h1>
      <h1 className="text-[10px] text-black/50">
        or select new category{" "}
        <button className="underline" onClick={props.handleHome}>
          here
        </button>
      </h1>
    </>
  );
}
