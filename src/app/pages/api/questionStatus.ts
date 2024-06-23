import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/mongodb';

const handler = withApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession(req, res);
    const userId = session?.user.sub;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const { questionId, status } = req.body;

    try {
        const client = await clientPromise;
        const db = client.db('QuestionBank');
        const result = await db.collection('userQuestionStatus').updateOne(
            { userId, questionId },
            { $set: { status } },
            { upsert: true }
        );

        res.json({ message: 'Question status updated successfully' });
    } catch (error) {
        console.error('Error updating question status:', error);
        res.status(500).json({ error: 'An error occurred while updating question status' });
    }
});

export default handler;
