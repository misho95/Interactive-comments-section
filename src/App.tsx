import { useState } from "react";
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

const App = () => {
  const [commentsData, setCommentsData] = useState<CommentDataType[]>(
    dataJson.comments
  );

  return (
    <Container>
      <div className="flex flex-col gap-[25px]">
        {commentsData.map((comment) => {
          return <Comment key={comment.id} data={comment} />;
        })}
      </div>
    </Container>
  );
};

export default App;
