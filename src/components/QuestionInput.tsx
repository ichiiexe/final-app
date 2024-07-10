export function QuestionInput(props: any) {
  return (
    <label
      className="flex items-center gap-2 rounded border bg-white p-2 shadow-sm"
      key={props.index}
    >
      <input
        onChange={props.onChange}
        checked={props.check}
        name="selection"
        type={props.inputType}
        value={props.value}
      />
      {props.answer}
    </label>
  );
}
