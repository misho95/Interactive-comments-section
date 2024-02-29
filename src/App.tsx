import Comment from "./components/comment";

const App = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-[#E9EBF0]">
      <div className="w-[730px] flex flex-col gap-3">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default App;
