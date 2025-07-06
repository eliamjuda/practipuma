import ReactKatex from "@pkasila/react-katex";

export default function OptionCard() {

  const answer = '$f(x) = \\frac{3}{x}$'

  return (
    <button
      className={
        "cursor-pointer px-1 py-4 border-1 transition-colors hover:border-(--shadow-hover) border-(--shadow) w-full bg-(--principal-secondary-color) rounded-lg mb-3"
      }
      disabled={true}
      // onClick={() => setSelected(opt.key)}
    >
      <div className=" text-left h-auto">
        <span className="bg-(--principal-main-color) rounded-lg mr-4 border-1 border-(--shadow) py-2 px-4">
          A
        </span>
        <span>
            <ReactKatex>{answer}</ReactKatex>
        </span>
      </div>
    </button>
  );
}
