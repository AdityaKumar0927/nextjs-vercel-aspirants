import { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('QuestionBank');

    switch (req.method) {
      case 'GET':
        const courses = await db.collection('courses').find({}).toArray();
        res.status(200).json(courses);
        break;
      case 'POST':
        const course = req.body;
        const result = await db.collection('courses').insertOne(course);
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
