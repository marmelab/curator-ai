// src/utils/validateEmail.ts

/**
 * Validates if the given string is a valid email address.
 * @param email - The email string to validate.
 * @returns A boolean indicating whether the email is valid.
 */
export function validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  