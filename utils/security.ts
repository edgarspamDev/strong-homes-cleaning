/**
 * Security utilities for form validation, sanitization, and abuse protection
 * Implements OWASP Top 10 best practices for static React applications
 */

// ============================================================================
// INPUT VALIDATION
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates name input (1-60 chars, letters + common punctuation)
 */
export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Name is required' };
  }

  if (trimmed.length < 1 || trimmed.length > 60) {
    return { isValid: false, error: 'Name must be between 1 and 60 characters' };
  }

  // Allow letters, spaces, hyphens, apostrophes, periods
  const namePattern = /^[a-zA-Z\s\-'.]+$/;
  if (!namePattern.test(trimmed)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods' };
  }

  return { isValid: true };
}

/**
 * Validates email using RFC-lite pattern (3-254 chars)
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  if (trimmed.length < 3 || trimmed.length > 254) {
    return { isValid: false, error: 'Email must be between 3 and 254 characters' };
  }

  // RFC-lite email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

/**
 * Validates phone number (7-20 chars, digits + common formatting)
 */
export function validatePhone(phone: string): ValidationResult {
  const trimmed = phone.trim();

  if (trimmed.length === 0) {
    return { isValid: true };
  }

  // Remove all non-digit characters for length check
  const digitsOnly = trimmed.replace(/\D/g, '');

  if (digitsOnly.length < 7 || digitsOnly.length > 20) {
    return { isValid: false, error: 'Phone number must have between 7 and 20 digits' };
  }

  // Allow digits, spaces, hyphens, parentheses, plus sign
  const phonePattern = /^[\d\s\-()+ ]+$/;
  if (!phonePattern.test(trimmed)) {
    return { isValid: false, error: 'Phone number can only contain digits, spaces, hyphens, parentheses, and plus sign' };
  }

  return { isValid: true };
}

/**
 * Validates message/text area (0-1000 chars)
 */
export function validateMessage(message: string): ValidationResult {
  const trimmed = message.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'Message is required' };
  }

  if (trimmed.length > 1000) {
    return { isValid: false, error: 'Message must be 1000 characters or less' };
  }

  return { isValid: true };
}

/**
 * Validates ZIP code (5 digits, Lake/Porter Counties allowlist)
 * NWI service area ZIP codes
 */
const VALID_ZIP_CODES = [
  // Lake County, IN
  '46320', '46321', '46322', '46323', '46324', '46327', '46341', '46342',
  '46373', '46375', '46376', '46377', '46394', '46401', '46402', '46403',
  '46404', '46405', '46406', '46407', '46408', '46409', '46410', '46411',
  '46312', '46319', '46356',

  // Porter County, IN
  '46301', '46303', '46304', '46307', '46308', '46310', '46311', '46347',
  '46360', '46361', '46368', '46383', '46385'
];

export function validateZipCode(zip: string): ValidationResult {
  const trimmed = zip.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'ZIP code is required' };
  }

  // Basic format check (5 digits or ZIP+4)
  const zipPattern = /^\d{5}(-\d{4})?$/;
  if (!zipPattern.test(trimmed)) {
    return { isValid: false, error: 'ZIP code must be 5 digits' };
  }

  // Extract base ZIP (first 5 digits)
  const baseZip = trimmed.substring(0, 5);

  // Check against service area allowlist
  if (!VALID_ZIP_CODES.includes(baseZip)) {
    return {
      isValid: false,
      error: 'Sorry, we currently only serve Lake and Porter Counties in Northwest Indiana. Please call us at (219) 615-9477 to discuss service availability.'
    };
  }

  return { isValid: true };
}

// ============================================================================
// INPUT SANITIZATION
// ============================================================================

/**
 * Sanitizes string by removing angle brackets and control characters
 * Prevents XSS injection attempts
 */
export function sanitizeString(input: string): string {
  if (!input) return '';

  return input
    .trim()
    // Remove angle brackets to prevent HTML injection
    .replace(/[<>]/g, '')
    // Remove control characters (except newlines and tabs for textarea)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Collapse multiple spaces into single space
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitizes phone number to a normalized format
 * Keeps only digits, spaces, hyphens, parentheses, and plus
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';

  return phone
    .trim()
    .replace(/[^\d\s\-()+ ]/g, '')
    .trim();
}

/**
 * Sanitizes email by trimming and lowercasing
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';

  return email
    .trim()
    .toLowerCase()
    .replace(/[<>]/g, '');
}

/**
 * Sanitizes message/textarea content
 * Preserves newlines but removes excessive whitespace
 */
export function sanitizeMessage(message: string): string {
  if (!message) return '';

  return message
    .trim()
    // Remove angle brackets
    .replace(/[<>]/g, '')
    // Remove control characters except newline and tab
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Collapse multiple spaces (but preserve single newlines)
    .replace(/ +/g, ' ')
    // Collapse multiple newlines into max 2
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ============================================================================
// RATE LIMITING / ABUSE PROTECTION
// ============================================================================

interface RateLimitState {
  attempts: number[];
  blockedUntil?: number;
}

const RATE_LIMIT_STORAGE_KEY = 'form_rate_limit';
const MAX_ATTEMPTS = 3;
const TIME_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minute cooldown after exceeding limit

/**
 * Gets current rate limit state from localStorage
 */
function getRateLimitState(): RateLimitState {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (!stored) return { attempts: [] };

    const parsed = JSON.parse(stored);
    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      blockedUntil: parsed.blockedUntil
    };
  } catch {
    return { attempts: [] };
  }
}

/**
 * Saves rate limit state to localStorage
 */
function saveRateLimitState(state: RateLimitState): void {
  try {
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage might be disabled; gracefully degrade
  }
}

/**
 * Checks if form submission is allowed under rate limiting rules
 * Returns { allowed: true } or { allowed: false, waitMinutes: number }
 */
export function checkRateLimit(): { allowed: boolean; waitMinutes?: number } {
  const now = Date.now();
  const state = getRateLimitState();

  // Check if currently blocked
  if (state.blockedUntil && now < state.blockedUntil) {
    const waitMs = state.blockedUntil - now;
    const waitMinutes = Math.ceil(waitMs / 60000);
    return { allowed: false, waitMinutes };
  }

  // Clean up old attempts outside time window
  const recentAttempts = state.attempts.filter(
    timestamp => now - timestamp < TIME_WINDOW_MS
  );

  // Check if exceeded max attempts
  if (recentAttempts.length >= MAX_ATTEMPTS) {
    // Set blocked state
    const blockedUntil = now + COOLDOWN_MS;
    saveRateLimitState({
      attempts: recentAttempts,
      blockedUntil
    });

    const waitMinutes = Math.ceil(COOLDOWN_MS / 60000);
    return { allowed: false, waitMinutes };
  }

  return { allowed: true };
}

/**
 * Records a form submission attempt for rate limiting
 */
export function recordSubmitAttempt(): void {
  const now = Date.now();
  const state = getRateLimitState();

  // Add current attempt
  const attempts = [...state.attempts, now].filter(
    timestamp => now - timestamp < TIME_WINDOW_MS
  );

  saveRateLimitState({
    attempts,
    blockedUntil: state.blockedUntil
  });
}

/**
 * Resets rate limit state (for testing or admin purposes)
 */
export function resetRateLimit(): void {
  try {
    localStorage.removeItem(RATE_LIMIT_STORAGE_KEY);
  } catch {
    // Ignore errors
  }
}

// ============================================================================
// DOUBLE-SUBMIT PROTECTION
// ============================================================================

/**
 * Hook-style helper for managing submit state
 * Prevents double-submit and provides loading state
 */
export class SubmitGuard {
  private isSubmitting = false;

  canSubmit(): boolean {
    return !this.isSubmitting;
  }

  startSubmit(): boolean {
    if (this.isSubmitting) return false;
    this.isSubmitting = true;
    return true;
  }

  endSubmit(): void {
    this.isSubmitting = false;
  }
}

// ============================================================================
// HONEYPOT VALIDATION
// ============================================================================

/**
 * Checks if honeypot field was filled (indicates bot)
 * Returns true if submission should be blocked
 */
export function isHoneypotFilled(value: string): boolean {
  return value.trim().length > 0;
}

// ============================================================================
// COMPREHENSIVE FORM VALIDATION
// ============================================================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  _gotcha: string;
}

export interface QuoteFormData {
  zipCode: string;
  serviceType: string;
  bedrooms: string;
  bathrooms: string;
  frequency: string;
  name: string;
  phone: string;
  email: string;
  _gotcha: string;
}

/**
 * Validates entire contact form
 * Returns sanitized data or validation errors
 */
export function validateContactForm(data: ContactFormData): { isValid: true; sanitized: ContactFormData } |
  { isValid: false; errors: Record<string, string> } {

  const errors: Record<string, string> = {};

  // Honeypot check
  if (isHoneypotFilled(data._gotcha)) {
    return { isValid: false, errors: { _gotcha: 'Bot detected' } };
  }

  // Validate each field
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error!;
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error!;
  }

  const messageValidation = validateMessage(data.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.error!;
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  // Return sanitized data
  return {
    isValid: true,
    sanitized: {
      name: sanitizeString(data.name),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      message: sanitizeMessage(data.message),
      _gotcha: ''
    }
  };
}

/**
 * Validates entire quote form
 * Returns sanitized data or validation errors
 */
export function validateQuoteForm(data: QuoteFormData): { isValid: true; sanitized: QuoteFormData } |
  { isValid: false; errors: Record<string, string> } {

  const errors: Record<string, string> = {};

  // Honeypot check
  if (isHoneypotFilled(data._gotcha)) {
    return { isValid: false, errors: { _gotcha: 'Bot detected' } };
  }

  // Validate ZIP code
  const zipValidation = validateZipCode(data.zipCode);
  if (!zipValidation.isValid) {
    errors.zipCode = zipValidation.error!;
  }

  // Validate service type
  if (!data.serviceType || data.serviceType.trim().length === 0) {
    errors.serviceType = 'Please select a service type';
  }

  // Validate name
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error!;
  }

  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  // Validate phone
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error!;
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  // Return sanitized data
  return {
    isValid: true,
    sanitized: {
      zipCode: sanitizeString(data.zipCode),
      serviceType: sanitizeString(data.serviceType),
      bedrooms: sanitizeString(data.bedrooms),
      bathrooms: sanitizeString(data.bathrooms),
      frequency: sanitizeString(data.frequency),
      name: sanitizeString(data.name),
      email: sanitizeEmail(data.email),
      phone: sanitizePhone(data.phone),
      _gotcha: ''
    }
  };
}
