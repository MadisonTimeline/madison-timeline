import { Comment } from "./Comment";

// Type definition for a post
export type Post = {
  id: string;
  title: string;
  date: Date;
  board: string;
  body: string;
  image?: string;
  likes: number;
  author: string;
  authorId: string;
  comments: Comment[];
};
