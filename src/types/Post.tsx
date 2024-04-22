import { Comment } from "./Comment";
import Delta from "quill-delta";

// Type definition for a post
export type Post = {
  id: string;
  title: string;
  date: Date;
  board_names: string[];
  body: Delta;
  image?: string;
  likes: number;
  dislikes: number;
  views: number;
  author_id: string;
  liked_users: string[];
  disliked_users: string[];
};
