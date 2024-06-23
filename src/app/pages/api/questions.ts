import { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db('QuestionBank');
        const questions = await db.collection('JEE').find({}).toArray();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'An error occurred while fetching questions' });
    }
};

export default handler;
