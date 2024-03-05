import { createContext, useState } from "react";
import dataJson from "./data.json";
import Container from "./components/container";
import Comment from "./components/comment";
import ReplyContainer from "./components/reply.container";

export type CommentDataType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies?: ReplyType[];
};

export type ReplyType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
};

type GlobalContextType = {
  replyActive: null | number;
  setReplyActive: (arg: number | null) => void;
};

export const UserContext = createContext(dataJson.currentUser);
export const GlobalContext = createContext<null | GlobalContextType>(null);

const user = dataJson.currentUser;

const App = () => {
  const [commentsData, setCommentsData] = useState<CommentDataType[]>(
    dataJson.comments
  );

  const [replyActive, setReplyActive] = useState<null | number>(null);

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const obj = {
      id: Math.round(Math.random() * 1000),
      content: message,
      createdAt: "now",
      score: 0,
      user: {
        image: {
          png: user.image.png,
          webp: user.image.webp,
        },
        username: user.username,
      },
      replies: [],
    };

    setCommentsData([...commentsData, obj]);
    setMessage("");
  };

  const handleReplyMessage = (id: number, message: string) => {
    const findComment = commentsData.find((com) => {
      if (com.id === id) {
        return com;
      }
    });

    if (!findComment) {
      return;
    }

    const obj = {
      id: Math.round(Math.random() * 1000),
      content: message,
      createdAt: "now",
      score: 0,
      replyingTo: findComment?.user.username,
      user: {
        image: {
          png: user.image.png,
          webp: user.image.webp,
        },
        username: user.username,
      },
    };

    const updateComments = commentsData.map((com) => {
      if (id === com.id) {
        return {
          ...com,
          replies:
            com.replies && com.replies?.length > 0
              ? [...com.replies, obj]
              : [obj],
        };
      } else {
        return com;
      }
    });

    setCommentsData(updateComments);
  };

  return (
    <Container>
      <UserContext.Provider value={user}>
        <GlobalContext.Provider value={{ replyActive, setReplyActive }}>
          <div className="flex flex-col gap-[25px] w-11/12 sm:w-fit items-center py-[20px]">
            {commentsData.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  data={comment}
                  handleReplyMessage={handleReplyMessage}
                />
              );
            })}
            <ReplyContainer
              title={"send"}
              buttonHandler={sendMessage}
              content={{ value: message, onChange: setMessage }}
            />
          </div>
        </GlobalContext.Provider>
      </UserContext.Provider>
    </Container>
  );
};

export default App;
