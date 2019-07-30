// Utilities

/**
 * Strip a string to the specified maximum length (starting from the end and prepending the string if necessary).
 * @param string        string to trim
 * @param maxLength     maximum length (non-inclusive of prependString) to be returned
 * @param prependString string to prepend to the 'string' argument
 * @returns {string}
 */
export const stripToLength = (
  string: string,
  maxLength: number = 25,
  prependString: string = null
): string => {
  if (string.length <= maxLength) {
    return string;
  }

  const trimmed = string.slice(string.length - maxLength);

  return prependString === null ? trimmed : prependString + trimmed;
};

const ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';

/**
 * Generates a unique id based on ID_ALPHABET and the specified length.
 * @param length The required ID length.
 * @returns {string}
 */
export const generateId = (length: number = 8): string => {
  let id = '';

  for (let i = 0; i < length; i++) {
    // Generate a random character from ID_ALPHABET
    id += ID_ALPHABET.charAt(Math.floor(Math.random() * ID_ALPHABET.length));
  }

  return id;
};

/**
 * Clamps the value between the minimum and maximum
 * @param value  value to clamp
 * @param min    minimum to keep
 * @param max    maximum to keep
 * @return {number}
 */
export const clamp = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }

  return value;
};

// From https://material-ui.com/components/progress/
/**
 * Maps non-standard values (e.g. between 35 and 160) to the 0-100 range
 * @param value  value to normalise
 * @param min    minimum expected
 * @param max    maximum expected
 * @return {number}
 */
export const normalise = (value: number, min: number, max: number) =>
  ((value - min) * 100) / (max - min);

/**
 * Opposite of `normalise` - takes a value between zero and one and maps it to a custom scale
 * @param zeroToOneValue
 * @param newMin
 * @param newMax
 * @return {number}
 */
export const mapZeroToOneToCustomScale = (
  zeroToOneValue: number,
  newMin: number,
  newMax: number
) => (newMax - newMin) * zeroToOneValue;
