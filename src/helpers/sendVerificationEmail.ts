import { resend } from '@/lib/resend'
import VerificationEmail from '../../email/VerificationEmail'
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(
  email: string,
  username: string,
  verificationCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Anony Message Verification Code',
      react: VerificationEmail({ username: username, otp: verificationCode }),
    })
    return {
      success: true,
      message: 'Email sent',
    }
  } catch (emailError) {
    console.log('Error sending email: ', emailError)
    return {
      success: false,
      message: 'Error sending email',
    }
  }
}
