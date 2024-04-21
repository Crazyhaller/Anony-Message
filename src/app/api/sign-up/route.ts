import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/User'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from '@/helpers/sendVerificationEmail'

export async function POST(request: Request) {
  await dbConnect()

  try {
    const { username, email, password } = await request.json()
  } catch (error) {
    console.error('Error signing up: ', error)
    return Response.json(
      {
        success: false,
        message: 'Error signing up',
      },
      {
        status: 500,
      }
    )
  }
}
