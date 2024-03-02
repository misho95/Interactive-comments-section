import Comment from "./components/comment";
import Avatar from "./assets/avatar.png";
import { createContext, useState } from "react";
import ReplayContainer from "./components/replay.container";

export type CommentDataType = {
  id: number;
  likes: number;
  userId: number;
  userName: string;
  date: string;
  avatar: string;
  comment: string;
  replay?: {
    id: number;
    likes: number;
    userName: string;
    userId: number;
    date: string;
    avatar: string;
    sendTo: {
      id: number;
      userName: string;
    };
    comment: string;
  }[];
};

const commentsData: CommentDataType[] = [
  {
    id: 1,
    likes: 12,
    userId: 123,
    userName: "amyrobson",
    date: "1 month ago",
    avatar: Avatar,
    comment:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
  },
  {
    id: 2,
    likes: 5,
    userName: "maxblagun",
    userId: 111,
    date: "2 weeks ago",
    avatar: Avatar,
    comment:
      "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    replay: [
      {
        id: 3,
        likes: 4,
        userName: "ramsesmiron",
        userId: 444,
        date: "1 week ago",
        avatar: Avatar,
        sendTo: {
          id: 111,
          userName: "maxblagun",
        },
        comment:
          " If you’re still new, I’d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.",
      },
      {
        id: 4,
        likes: 2,
        userName: "juliusomo",
        userId: 555,
        date: "2 days ago",
        avatar: Avatar,
        sendTo: {
          id: 111,
          userName: "ramsesmiron",
        },
        comment:
          "I couldn’t agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      },
    ],
  },
];

const user = {
  id: 555,
  userName: "juliusomo",
  avatar: Avatar,
};

export const ActiveContext = createContext<any>(null);

const App = () => {
  const [activeReplay, setActiveReplay] = useState<null | number>(null);

  return (
    <ActiveContext.Provider value={{ activeReplay, setActiveReplay, user }}>
      <div className="flex min-h-screen justify-center items-center bg-[#E9EBF0] py-6">
        <div className="w-11/12 md:w-[730px] flex flex-col gap-3 h-fit">
          {commentsData.map((com) => {
            return (
              <div key={com.id} className="flex flex-col gap-3">
                <Comment data={com} />
                {com.replay && (
                  <div className="flex gap-4 pl-3">
                    <div className="w-[4px] bg-[#979797]" />
                    <div className="flex flex-col gap-3">
                      {com.replay.map((rep) => {
                        return <Comment key={rep.id} data={rep} />;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <ReplayContainer title={"send"} />
        </div>
      </div>
    </ActiveContext.Provider>
  );
};

export default App;
