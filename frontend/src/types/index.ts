/** @format */

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export interface Feedback {
  uuid: string;
  feedback: string;
  sentimentLabel: "Good" | "Bad" | "Neutral";
  user: string;
  createdAt: string;
}
