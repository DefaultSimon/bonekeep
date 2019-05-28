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
export const generateSoundId = (length: number = 8): string => {
  let id = '';

  for (let i = 0; i < length; i++) {
    // Generate a random character from ID_ALPHABET
    id += ID_ALPHABET.charAt(Math.floor(Math.random() * ID_ALPHABET.length));
  }

  return id;
};
