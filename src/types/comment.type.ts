export type Comment = {
  text: string;
  commentDate: Date;
  commentRating: 1 | 2 | 3 | 4 | 5;
  commentAuthorId: number;
}
