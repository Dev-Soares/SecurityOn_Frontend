export interface UserCounts {
  posts: number;
  complaints: number;
  articles: number;
  friends: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  _count: UserCounts;
}
