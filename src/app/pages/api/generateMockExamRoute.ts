import { NextApiRequest, NextApiResponse } from 'next';
import { clientPromise } from '@/lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { subjects, numberOfQuestions } = req.body;

    try {
        const client = await clientPromise;
        const db = client.db('QuestionBank');
        const questions = await Promise.all(
            subjects.map(async (subject: string) => {
                const subjectQuestions = await db.collection('JEE').find({ subject }).toArray();
                return subjectQuestions;
            })
        );

        const allQuestions = questions.flat();
        const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions);

        res.json({ questions: selectedQuestions });
    } catch (error) {
        console.error('Error generating mock exam:', error);
        res.status(500).json({ error: 'An error occurred while generating the mock exam' });
    }
};

export default handler;
