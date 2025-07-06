import Link from "next/link";

export default function Header() {
  return (
    <div className="relative w-screen bg-(--principal-secondary-color) border border-b-2 border-(--shadow) p-4 flex justify-center items-center mb-2 flex-shrink-0">
      <Link href="/dashboard" className="cursor-pointer absolute md:left-20 left-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-(--text)  icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </Link>
      <div className="flex text-center items-center">
        <h1 className="text-lg font-bold">Matemáticas</h1>
        <div className="mx-2 w-[4px] h-[4px] bg-(--text) rounded-full"></div>
        <div className="flex justify-center items-center">
          {/* <div className=" flex content-center justify-center items-center text-xs bg-red-200 border-1 border-red-600  text-red-600 px-2 py-0.5 mr-2 rounded-full">
              <div className="mr-0.5 w-[8px] h-[8px] bg-red-600 rounded-full"></div>
              <span className="m-0 p-0 text-xs/tight">Difícil</span>
            </div> */}
          <span className="text-[1rem]/tight">Álgebra</span>
        </div>
      </div>
    </div>
  );
}
