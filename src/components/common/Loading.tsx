export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[100dvh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-(--text)">Cargando...</p>
      </div>
    </div>
  );
};
