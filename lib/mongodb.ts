import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.error('Invalid/Missing environment variable: "MONGODB_URI"');
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Define a custom type for the global object
interface CustomNodeJsGlobal extends NodeJS.Global {
  _mongoClientPromise: Promise<MongoClient>;
}

declare const global: CustomNodeJsGlobal;

if (process.env.NODE_ENV === 'development') {
  console.log('Environment: Development');
  // In development mode, use a global variable so the client is not reinitialized on every hot reload.
  if (!global._mongoClientPromise) {
    console.log('Creating new MongoClient instance');
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  } else {
    console.log('Using existing MongoClient instance');
  }
  clientPromise = global._mongoClientPromise;
} else {
  console.log('Environment: Production');
  // In production mode, it's best to not use a global variable.
  console.log('Creating new MongoClient instance');
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

clientPromise.then(() => console.log('MongoClient connected successfully'))
             .catch((error) => console.error('MongoClient connection error:', error));

// Export the client promise.
export { clientPromise };
