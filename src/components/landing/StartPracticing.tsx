interface StartPracticingProps {
  text: string;
  visual: React.ReactNode;
}

export const StartPracticing: React.FC<StartPracticingProps>  = ({ text, visual }) =>  {
  return (
    <section className="flex flex-col items-center justify-center mb-50">
      <div className="bg-gradient-to-b from-(--premium-color-2) to-(--premium-color-1) text-white mt-12 md:mt-24 p-12 md:p-24 rounded-4xl shadow-lg max-w-3xl w-full text-center">
        
        <div className={`flex justify-center mb-8`}>
            {visual} 
        </div>

        <h2 className="text-2xl md:text-4xl font-bold">
          {text}
        </h2>


      </div>
    </section>
  );
}