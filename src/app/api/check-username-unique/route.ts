import { z } from 'zod'
import UserModel from '@/models/User'
import dbConnect from '@/lib/dbConnect'
import { usernameValidation } from '@/schemas/signUpSchema'

const UsernameQuerySchema = z.object({
  username: usernameValidation,
})

export async function GET(request: Request) {
  await dbConnect()

  try {
    const { searchParams } = new URL(request.url)
    const queryParam = {
      username: searchParams.get('username'),
    }
    const result = UsernameQuerySchema.safeParse(queryParam)

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || []
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid username',
        },
        {
          status: 400,
        }
      )
    }

    const { username } = result.data

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    })

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: 'Username already exists',
        },
        {
          status: 409,
        }
      )
    }

    return Response.json(
      {
        success: true,
        message: 'Username is unique',
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in checking username: ', error)
    return Response.json(
      {
        success: false,
        message: 'Error in checking username. Please try again later.',
      },
      {
        status: 500,
      }
    )
  }
}
