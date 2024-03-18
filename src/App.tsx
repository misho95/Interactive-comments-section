import { createContext, useEffect, useState } from "react";
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
  replies?: ReplyType[];
};

type GlobalContextType = {
  replyActive: null | number;
  setReplyActive: (arg: number | null) => void;
  handleReplyMessage: (id: number, message: string, reply: boolean) => void;
  handleDelete: (id: number, reply: boolean) => void;
  activeEdit: null | number;
  setActiveEdit: (arg: null | number) => void;
  handleEdit: (id: number, message: string, reply: boolean) => void;
};

export const UserContext = createContext(dataJson.currentUser);
export const GlobalContext = createContext<null | GlobalContextType>(null);

const user = dataJson.currentUser;

const App = () => {
  const [commentsData, setCommentsData] = useState<CommentDataType[]>(
    dataJson.comments
  );

  const [replyActive, setReplyActive] = useState<null | number>(null);
  const [activeEdit, setActiveEdit] = useState<null | number>(null);

  const [message, setMessage] = useState("");

  const findReplies = (id: number) => {
    for (const comment of commentsData) {
      // Check if replies exist and is an array
      if (comment.replies && Array.isArray(comment.replies)) {
        for (const reply of comment.replies) {
          if (reply.id === id) {
            return { parentId: comment.id, reply: reply };
          }
        }
      }
    }
    return null;
  };

  const sendMessage = () => {
    if (!message) {
      return;
    }

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

  const handleReplyMessage = (id: number, message: string, reply: boolean) => {
    if (!message) {
      return;
    }
    if (!reply) {
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
    } else {
      const replies = findReplies(id);
      if (replies) {
        const { parentId, reply } = replies;

        const findComment = commentsData.find((com) => {
          if (com.id === parentId) {
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
          replyingTo: reply.user.username,
          user: {
            image: {
              png: user.image.png,
              webp: user.image.webp,
            },
            username: user.username,
          },
        };

        const updateComments = commentsData.map((com) => {
          if (com.id === parentId) {
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
      }
      //
    }
  };

  const handleDelete = (id: number, reply: boolean) => {
    if (reply) {
      const replyData = findReplies(id);
      if (replyData) {
        const { parentId } = replyData;

        const updateComments = commentsData.map((com) => {
          if (com.id === parentId) {
            return {
              ...com,
              replies: com.replies?.filter((r) => {
                if (r.id !== id) {
                  return r;
                }
              }),
            };
          } else {
            return com;
          }
        });

        setCommentsData(updateComments);
      }
    } else {
      const updateComments = commentsData.filter((com) => {
        if (com.id !== id) {
          return com;
        }
      });

      setCommentsData(updateComments);
    }
  };

  const handleEdit = (id: number, message: string, reply: boolean) => {
    if (reply) {
      const replyData = findReplies(id);
      if (replyData) {
        const { parentId, reply } = replyData;
        const newObj = {
          ...reply,
          content: message,
        };
        const updateComments = commentsData.map((com) => {
          if (com.id === parentId) {
            return {
              ...com,
              replies: com.replies
                ? com.replies.map((r) => {
                    if (r.id === id) {
                      return newObj;
                    } else {
                      return r;
                    }
                  })
                : [],
            };
          } else {
            return com;
          }
        });

        setCommentsData(updateComments);
        setActiveEdit(null);
      }
    } else {
      const updateComments = commentsData.map((com) => {
        if (com.id === id) {
          return {
            ...com,
            content: message,
          };
        } else {
          return com;
        }
      });

      setCommentsData(updateComments);
      setActiveEdit(null);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }, 50);
  }, []);

  return (
    <Container>
      <UserContext.Provider value={user}>
        <GlobalContext.Provider
          value={{
            replyActive,
            setReplyActive,
            handleReplyMessage,
            handleDelete,
            activeEdit,
            setActiveEdit,
            handleEdit,
          }}
        >
          <div className="flex flex-col gap-[25px] w-11/12 sm:w-fit items-center py-[20px]">
            {commentsData.map((comment) => {
              return <Comment key={comment.id} data={comment} />;
            })}
            <ReplyContainer
              title={"send"}
              buttonHandler={sendMessage}
              content={{ value: message, onChange: setMessage }}
              reply={false}
            />
          </div>
        </GlobalContext.Provider>
      </UserContext.Provider>
    </Container>
  );
};

export default App;
