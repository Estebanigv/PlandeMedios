/**
 * Rate Limiting Utility
 *
 * Simple in-memory rate limiter to prevent spam and abuse.
 * For production with multiple servers, consider using Redis or similar.
 *
 * Implementation uses sliding window approach for accurate rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
  attempts: number[];
}

/**
 * In-memory store for rate limit data
 * Key: IP address or identifier
 * Value: Rate limit entry with count and reset time
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limit configuration
 */
export const RATE_LIMIT_CONFIG = {
  // Maximum requests allowed in the time window
  maxRequests: 3,

  // Time window in milliseconds (15 minutes)
  windowMs: 15 * 60 * 1000,

  // Cleanup interval to remove old entries (1 hour)
  cleanupIntervalMs: 60 * 60 * 1000,
};

/**
 * Cleanup old rate limit entries periodically
 * Prevents memory leaks from abandoned entries
 */
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Set up periodic cleanup
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupOldEntries, RATE_LIMIT_CONFIG.cleanupIntervalMs);
}

/**
 * Check if a request should be rate limited
 *
 * Uses sliding window algorithm to track requests over time.
 *
 * @param identifier - Unique identifier (typically IP address)
 * @param maxRequests - Maximum requests allowed (defaults to config)
 * @param windowMs - Time window in milliseconds (defaults to config)
 * @returns Rate limit result with allowed status and metadata
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = RATE_LIMIT_CONFIG.maxRequests,
  windowMs = RATE_LIMIT_CONFIG.windowMs
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // First request from this identifier
  if (!entry) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
      attempts: [now],
    });

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  // Reset window if expired
  if (entry.resetTime < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
      attempts: [now],
    });

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  // Filter out attempts outside the sliding window
  const recentAttempts = entry.attempts.filter(
    (timestamp) => timestamp > now - windowMs
  );

  // Check if limit exceeded
  if (recentAttempts.length >= maxRequests) {
    const oldestAttempt = Math.min(...recentAttempts);
    const retryAfter = Math.ceil((oldestAttempt + windowMs - now) / 1000);

    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter,
    };
  }

  // Update entry with new attempt
  const newAttempts = [...recentAttempts, now];
  rateLimitStore.set(identifier, {
    count: newAttempts.length,
    resetTime: entry.resetTime,
    attempts: newAttempts,
  });

  return {
    allowed: true,
    remaining: maxRequests - newAttempts.length,
    resetTime: entry.resetTime,
  };
}

/**
 * Extract client IP from request
 *
 * Checks various headers that might contain the real IP
 * when behind proxies or load balancers.
 *
 * @param request - Incoming request object
 * @returns Client IP address or 'unknown'
 */
export function getClientIP(request: Request): string {
  // Check common proxy headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // Take first IP in the list
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  // Fallback - in production this should rarely happen
  return 'unknown';
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or manual intervention
 *
 * @param identifier - Unique identifier to reset
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Get current rate limit status without incrementing
 *
 * @param identifier - Unique identifier to check
 * @returns Current rate limit status
 */
export function getRateLimitStatus(identifier: string) {
  const entry = rateLimitStore.get(identifier);
  const now = Date.now();

  if (!entry || entry.resetTime < now) {
    return {
      remaining: RATE_LIMIT_CONFIG.maxRequests,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
  }

  return {
    remaining: Math.max(0, RATE_LIMIT_CONFIG.maxRequests - entry.count),
    resetTime: entry.resetTime,
  };
}
