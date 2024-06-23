import { MongoClient } from 'mongodb';

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
}

declare module '@/*' {
    const content: any;
    export default content;
  }
  
declare module 'clsx';


declare module 'clsx' {
    export type ClassValue = string | number | null | undefined | { [key: string]: any } | ClassValue[];
    export default function clsx(...inputs: ClassValue[]): string;
  }
  