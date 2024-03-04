import { createContext, useState } from "react";
import dataJson from "./data.json";
import Container from "./components/container";
import Comment from "./components/comment";

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
  replies: {
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
  }[];
};

export const ActiveContext = createContext<any>(null);

const App = () => {
  const [commentsData, setCommentsData] = useState<CommentDataType[]>(
    dataJson.comments
  );

  return (
    <Container>
      <Comment />
    </Container>
  );
};

export default App;
