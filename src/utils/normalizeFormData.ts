type NormalizerOptions = {
  emptyAsNull?: boolean;
  maxDepth?: number;
};

/**
 * Normalizes form data recursively
 * - Trims all string values
 * - Converts empty strings to null (if emptyAsNull=true)
 * - Converts "null"/"undefined" strings to null
 * - Handles nested objects and arrays
 * - Protects against deep object attacks (maxDepth)
 * - Skips Files, Buffers, and special objects
 */
export function normalizeFormData(
  input: any,
  options: NormalizerOptions = { emptyAsNull: true, maxDepth: 10 }
): any {
  const { emptyAsNull, maxDepth = 10 } = options;

  function normalizeValue(value: any, depth: number = 0): any {
    // Protection against deep object attacks (DoS)
    if (depth > maxDepth) {
      console.warn(
        `⚠️  Max depth (${maxDepth}) reached during normalization, skipping deeper levels`
      );
      return value;
    }

    // Handle strings
    if (typeof value === "string") {
      const trimmed = value.trim();

      // Convert empty strings, "null", "undefined" to null
      if (
        emptyAsNull &&
        (trimmed === "" ||
          trimmed.toLowerCase() === "null" ||
          trimmed.toLowerCase() === "undefined")
      ) {
        return null;
      }

      return trimmed;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      return value.map((item) => normalizeValue(item, depth + 1));
    }

    // Handle objects (but skip special types)
    if (value && typeof value === "object") {
      // Skip Date objects
      if (value instanceof Date) {
        return value;
      }

      // Skip Buffer objects (file uploads, binary data)
      if (Buffer.isBuffer(value)) {
        return value;
      }

      // Skip File-like objects (from express-fileupload)
      if (value.mimetype || value.data || value.mv) {
        return value;
      }

      // Skip other special object types
      if (
        value instanceof RegExp ||
        value instanceof Error ||
        value instanceof Map ||
        value instanceof Set
      ) {
        return value;
      }

      // Normalize plain objects
      const result: Record<string, any> = {};
      for (const [key, val] of Object.entries(value)) {
        result[key] = normalizeValue(val, depth + 1);
      }
      return result;
    }

    // Return primitive values as-is (number, boolean, null, undefined)
    return value;
  }

  return normalizeValue(input);
}
