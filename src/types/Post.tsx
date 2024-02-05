import { Comment } from "./Comment";

// Type definition for a post
export type Post = {
  id: string;
  title: string;
  date: Date;
  board: string;
  body: string;
  image?: string;
  author: string;
  authorId: string;
  comments: Comment[];
};
