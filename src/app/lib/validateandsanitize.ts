interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

type ValidationRule = (value: any) => string | null;

interface ValidationRules {
  [key: string]: ValidationRule[];
}

export const validateAndSanitize = (data: { [key: string]: any }, validationRules: ValidationRules): ValidationResult => {
  const errors: { [key: string]: string } = {};

  // Iterate over each field in the data object and validate/sanitize it
  Object.entries(data).forEach(([fieldName, value]) => {
    if (validationRules[fieldName]) {
      validationRules[fieldName].forEach((rule) => {
        const errorMessage = rule(value);
        if (errorMessage) {
          errors[fieldName] = errorMessage;
        }
      });
    }
  });

  // If there are no errors, return isValid as true
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const isValidEmail: ValidationRule = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }

  // Implement email validation logic here
  // You can use regular expressions or libraries like validator.js
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }

  return null;
};

export const psd: ValidationRule = (password: string): string | null => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character'
  }
  return null
}

