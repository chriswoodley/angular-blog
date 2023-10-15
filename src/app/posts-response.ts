import { Post } from "./post";

export interface PostsResponse {
  limit: number,
  posts: Post[],
  skip: number,
  total: number
}
