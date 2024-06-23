import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { clientPromise } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('QuestionBank');

    switch (req.method) {
      case 'GET':
        const questions = await db.collection('questions').find({}).toArray();
        res.status(200).json(questions);
        break;
      case 'POST':
        const question = req.body;
        const result = await db.collection('questions').insertOne(question);
        res.status(201).json(result);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
