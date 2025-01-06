import type { NextApiRequest, NextApiResponse } from 'next'
import { initMongoDB } from '../../src/db/initMongoDB'
import User from '../../src/db/models/user'
import bcrypt from 'bcryptjs'
type Data = {
  message: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required', error: 'Email is required' })
    }

    try {
      await initMongoDB()
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists', error: 'User already exists' });
      }

      // Генерація випадкового пароля (для демонстрації)
      const password = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
      console.error('Error during registration:', error)
      res.status(500).json({ message: 'Internal Server Error', error: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed', error: 'Method Not Allowed' })
  }
}