import { ObjectId } from "mongoose"

export interface BookDefinition {
  _id: ObjectId;
  author: string;
  published: Date;
  genre: string;
  description: string;
  img: string;
  link: string;
  created: Date;
  modified: Date;
  title: string;
}
