/**
 * Return a truncated string to show in a message's body.
 * @param body String to truncate.
 * @returns A truncated string if its length exceed 50 characters.
 */
export const getMessageBody = (body: string): string => {
  return body.length > 50 ? `${body.substring(0, 50)}...` : body;
}