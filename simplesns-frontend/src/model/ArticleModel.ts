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

export interface HashtagsData {
  PostHashtag: {
    HashtagId: number;
    PostId: number;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
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
  Hashtags: HashtagsData[];
}
