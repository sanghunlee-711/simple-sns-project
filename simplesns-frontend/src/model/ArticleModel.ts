export interface UserData {
  id: number;
  nick: string;
  email: string;
}

export interface CommentsData {
  id: number;
  PostId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  User: UserData;
}
export interface ContentsData {
  id: number;
  title: string;
  titleImgUrl: string;
  nick: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  User: UserData;
  Comments: CommentsData[];
}
