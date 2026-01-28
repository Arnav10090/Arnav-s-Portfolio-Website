/**
 * Integration tests for contact API route
 * Tests the complete flow with mocked Resend service
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST, GET, PUT, DELETE, PATCH } from './route';

// Mock Resend SDK
const mockSend = vi.fn();
vi.mock('resend', () => {
  return {
    Resend: class MockResend {
      emails = {
        send: mockSend
      };
    }
  };
});

// Mock environment variables
const originalEnv = process.env;

describe('Contact API Route Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      RESEND_API_KEY: 're_test_key_123',
      PORTFOLIO_OWNER_EMAIL: 'owner@example.com',
      NODE_ENV: 'test'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('POST /api/contact', () => {
    it('should successfully send email with valid data', async () => {
      mockSend.mockResolvedValue({ id: 'email-123' });

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to connect.'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Thank you');
      expect(mockSend).toHaveBeenCalledTimes(1);
      
      const sendCall = mockSend.mock.calls[0][0];
      expect(sendCall.to).toBe('owner@example.com');
      expect(sendCall.subject).toBe('New Contact Form Submission');
      expect(sendCall.replyTo).toBe('john@example.com');
      expect(sendCall.html).toContain('John Doe');
      expect(sendCall.html).toContain('john@example.com');
      expect(sendCall.html).toContain('Hello, I would like to connect.');
    });

    it('should reject empty name', async () => {
      const invalidData = {
        name: '',
        email: 'john@example.com',
        message: 'Hello'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Name');
    });

    it('should reject invalid email format', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Hello'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Email');
    });

    it('should reject empty message', async () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: ''
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Message');
    });

    it('should reject whitespace-only fields', async () => {
      const invalidData = {
        name: '   ',
        email: 'john@example.com',
        message: '   '
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should handle Resend API errors gracefully', async () => {
      mockSend.mockRejectedValue(new Error('Resend service unavailable'));

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('try again later');
    });

    it('should return error when RESEND_API_KEY is missing', async () => {
      delete process.env.RESEND_API_KEY;

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('not configured');
    });

    it('should return error when PORTFOLIO_OWNER_EMAIL is missing', async () => {
      delete process.env.PORTFOLIO_OWNER_EMAIL;

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('not configured');
    });

    it('should handle malformed JSON gracefully', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Invalid request format');
    });

    it('should sanitize API key from error messages', async () => {
      mockSend.mockRejectedValue(
        new Error('API key re_abc123xyz is invalid')
      );

      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      // API key should be redacted in response
      if (data.details) {
        expect(data.details).not.toContain('re_abc123xyz');
        expect(data.details).toContain('[REDACTED]');
      }
    });

    it('should handle special characters in form data', async () => {
      mockSend.mockResolvedValue({ id: 'email-123' });

      const specialData = {
        name: "O'Brien-Smith",
        email: 'test+tag@example.co.uk',
        message: 'Hello! I\'m interested. Can we discuss? <test>'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(specialData)
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(1);
      
      const sendCall = mockSend.mock.calls[0][0];
      // HTML should be escaped in email
      expect(sendCall.html).toContain('&lt;test&gt;');
      expect(sendCall.html).not.toContain('<test>');
    });
  });

  describe('HTTP Method Validation', () => {
    it('should reject GET requests with 405', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Method not allowed');
      expect(response.headers.get('Allow')).toBe('POST');
    });

    it('should reject PUT requests with 405', async () => {
      const response = await PUT();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Method not allowed');
    });

    it('should reject DELETE requests with 405', async () => {
      const response = await DELETE();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Method not allowed');
    });

    it('should reject PATCH requests with 405', async () => {
      const response = await PATCH();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Method not allowed');
    });
  });

  describe('Complete Integration Flow', () => {
    it('should handle complete successful submission flow', async () => {
      mockSend.mockResolvedValue({ id: 'email-123' });

      const formData = {
        name: 'Jane Smith',
        email: 'jane@company.com',
        message: 'I am interested in discussing a software engineering opportunity.'
      };

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Submit form
      const response = await POST(request);
      const data = await response.json();

      // Verify response
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBeTruthy();

      // Verify email was sent with correct data
      expect(mockSend).toHaveBeenCalledTimes(1);
      const emailConfig = mockSend.mock.calls[0][0];
      
      expect(emailConfig.from).toContain('Portfolio Contact');
      expect(emailConfig.to).toBe('owner@example.com');
      expect(emailConfig.subject).toBe('New Contact Form Submission');
      expect(emailConfig.replyTo).toBe('jane@company.com');
      expect(emailConfig.html).toContain('Jane Smith');
      expect(emailConfig.html).toContain('jane@company.com');
      expect(emailConfig.html).toContain('software engineering opportunity');
      
      // Verify HTML structure
      expect(emailConfig.html).toContain('<!DOCTYPE html>');
      expect(emailConfig.html).toContain('From');
      expect(emailConfig.html).toContain('Email Address');
      expect(emailConfig.html).toContain('Message');
    });
  });
});
