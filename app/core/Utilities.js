// Utilities

// eslint-disable-next-line import/prefer-default-export
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
