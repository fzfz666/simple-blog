export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
}

export interface PostsData {
  posts: Post[];
  total: number;
  totalPages: number;
}