import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const Container = ({ children }: PropsType) => {
  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-[#F5F6FA] font-rubik">
      {children}
    </main>
  );
};

export default Container;
