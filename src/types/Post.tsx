import { Comment } from "./Comment";

// Type definition for a post
export type Post = {
  id: string;
  title: string;
  date: Date;
  board_name: string;
  body: string;
  image?: string;
  likes: number;
  dislikes: number;
  views: number;
  authorId: string;
};
