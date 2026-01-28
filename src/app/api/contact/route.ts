/**
 * API Route Handler for Contact Form Submissions
 * Implements Resend email integration with validation and error handling
 * Requirements: 1.1, 1.3, 1.4, 2.4, 3.1, 3.4, 4.1, 6.2, 6.3, 6.5
 */

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContactForm, type ContactFormData } from '@/lib/validation';
import { generateEmailHTML } from '@/lib/email-template';

/**
 * Response structure for success
 */
interface SuccessResponse {
  success: true;
  message: string;
}

/**
 * Response structure for errors
 */
interface ErrorResponse {
  success: false;
  error: string;
  details?: string;
}

/**
 * Union type for API responses
 */
type APIResponse = SuccessResponse | ErrorResponse;

/**
 * POST handler for contact form submissions
 * Requirement 1.1: Send email when visitor submits valid contact form
 * Requirement 1.3: Email has clear subject line indicating portfolio contact form
 * Requirement 1.4: Return success response when email is delivered
 * Requirement 2.4: Return error response for validation failures
 * Requirement 3.1: Return error response when Resend service returns error
 * Requirement 3.4: Return error response when API key is missing or invalid
 * Requirement 4.1: Retrieve Resend API key from environment variables
 * Requirement 6.2: Only accept POST requests
 * Requirement 6.5: Return appropriate HTTP status codes
 */
export async function POST(request: Request): Promise<NextResponse<APIResponse>> {
  try {
    // Requirement 4.1: Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not configured. Please contact the site administrator.',
          details: process.env.NODE_ENV === 'development' ? 'RESEND_API_KEY is missing' : undefined
        },
        { status: 500 }
      );
    }

    if (!process.env.PORTFOLIO_OWNER_EMAIL) {
      console.error('PORTFOLIO_OWNER_EMAIL environment variable is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service is not configured. Please contact the site administrator.',
          details: process.env.NODE_ENV === 'development' ? 'PORTFOLIO_OWNER_EMAIL is missing' : undefined
        },
        { status: 500 }
      );
    }

    // Parse request body
    let body: ContactFormData;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request format. Please ensure all fields are filled correctly.'
        },
        { status: 400 }
      );
    }

    // Requirement 2.4: Validate form data using validation module
    const validation = validateContactForm(body);
    
    if (!validation.valid) {
      // Return 400 error for validation failures
      return NextResponse.json(
        {
          success: false,
          error: validation.errors.join(', ')
        },
        { status: 400 }
      );
    }

    // Initialize Resend client with API key from environment
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Generate email HTML using template module
    const emailHTML = generateEmailHTML(body);

    // Requirement 1.1, 1.3: Send email via Resend with proper configuration
    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Use verified domain in production
        to: process.env.PORTFOLIO_OWNER_EMAIL,
        subject: 'New Contact Form Submission', // Requirement 1.3: Clear subject line
        html: emailHTML,
        replyTo: body.email // Allow portfolio owner to reply directly to visitor
      });
    } catch (resendError) {
      // Requirement 3.1: Handle Resend service errors
      console.error('Resend API error:', resendError);
      
      // Security: Ensure API key is never logged or exposed in error messages
      // API keys follow the pattern: re_[alphanumeric characters]
      // We replace any occurrence with [REDACTED] to prevent accidental exposure
      const errorMessage = resendError instanceof Error ? resendError.message : 'Unknown error';
      const sanitizedError = errorMessage.replace(/re_[a-zA-Z0-9]+/g, '[REDACTED]');
      
      console.error('Sanitized error:', sanitizedError);
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send message. The email service is temporarily unavailable. Please try again later.',
          details: process.env.NODE_ENV === 'development' ? sanitizedError : undefined
        },
        { status: 500 }
      );
    }

    // Requirement 1.4: Return 200 success response when email sends successfully
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      },
      { status: 200 }
    );

  } catch (error) {
    // Requirement 3.3: Log errors with sufficient debugging info without exposing sensitive data
    console.error('Contact form error:', error);
    
    // Security: Sanitize error messages to prevent API key exposure
    // This is a safety net in case errors bubble up from unexpected sources
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const sanitizedError = errorMessage.replace(/re_[a-zA-Z0-9]+/g, '[REDACTED]');
    
    console.error('Sanitized error:', sanitizedError);

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? sanitizedError : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 * Requirement 6.2: Only accept POST requests for form submissions
 * Requirement 6.3: Return 405 Method Not Allowed for non-POST requests
 */
export async function GET(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Please use POST to submit the contact form.'
    },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function PUT(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Please use POST to submit the contact form.'
    },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function DELETE(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Please use POST to submit the contact form.'
    },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function PATCH(): Promise<NextResponse<ErrorResponse>> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Please use POST to submit the contact form.'
    },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}
