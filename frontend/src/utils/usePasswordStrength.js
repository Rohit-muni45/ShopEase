import { useState, useMemo } from "react";

const usePasswordStrength = (password) => {
  const checks = useMemo(() => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }, [password]);

  const score = useMemo(() => {
    return Object.values(checks).filter(Boolean).length;
  }, [checks]);

  const strength = useMemo(() => {
    if (score <= 1 || score === 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    if (score === 5) return "Strong";
  }, [score]);

  const isValid = score === 5;

  return {
    checks,
    score,
    strength,
    isValid,
  };
};

export default usePasswordStrength;