// pages/api/payments/index.js
import dbConnect from '../../../utils/dbConnect';
import Payment from '../../../models/Payment';
import morgan from 'morgan';

const logger = morgan('combined');

export default async function handler(req, res) {
    logger(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ message: "Logging Error", error: err.message });
        }
        await dbConnect();

        switch (req.method) {
            case 'GET':
                try {
                    const payments = await Payment.find({});
                    res.status(200).json(payments);
                } catch (error) {
                    res.status(500).json({ message: "Unable to retrieve payments", error: error.message });
                }
                break;

            case 'POST':
                try {
                    const payments = await Payment.insertMany(req.body);
                    res.status(201).json(payments);
                } catch (error) {
                    console.error('Payment creation error:', error);  // Log full error details
                    res.status(400).json({ message: "Error creating payments", error: error.message });
                }
                break;
              
            default:
                res.status(405).end(); // Method Not Allowed
                break;
        }
      });
}
