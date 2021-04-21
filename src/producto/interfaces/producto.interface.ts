import { Document } from 'mongoose';
export interface Producto extends Document {
  readonly name: string;
  readonly description: string;
  readonly imgURL: string;
  readonly price: number;
  readonly createAt: Date;
}
