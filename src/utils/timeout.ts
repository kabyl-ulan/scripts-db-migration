/**
 * Timeout wrapper for async operations
 * Prevents operations from hanging indefinitely
 *
 * @param promise - The promise to wrap with timeout
 * @param timeoutMs - Timeout in milliseconds
 * @param errorMessage - Error message to throw on timeout
 * @returns Promise that resolves or rejects based on race condition
 *
 * @example
 * await withTimeout(connectToDB(), 10000, "Database connection timeout");
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(errorMessage)), timeoutMs)),
  ]);
}
