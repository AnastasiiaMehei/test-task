"use client";
import React, { useState } from 'react';
import { Button, Input, Tooltip } from "@nextui-org/react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { Icon } from "@iconify/react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Мінімальна довжина паролю
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Валідація полів
    const isEmailFormatValid = validateEmail(email);
    const isPasswordFormatValid = validatePassword(password);
    const doPasswordsMatch = password === confirmPassword;

    setIsEmailValid(isEmailFormatValid);
    setIsPasswordValid(isPasswordFormatValid);
    setIsConfirmPasswordValid(doPasswordsMatch);

    if (!isEmailFormatValid) {
      setErrorMessage("Будь ласка, введіть коректну email адресу");
      return;
    }

    if (!isPasswordFormatValid) {
      setErrorMessage("Пароль повинен містити мінімум 6 символів");
      return;
    }

    if (!doPasswordsMatch) {
      setErrorMessage("Паролі не співпадають");
      return;
    }

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Реєстрація успішна!");
        // Очистка форми після успішної реєстрації
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(data.error || "Помилка реєстрації");
      }
    } catch (error) {
      setErrorMessage("Помилка з'єднання з сервером");
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false} mode="popLayout">
            <m.form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit}
            >
              {errorMessage && (
                <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-500 text-sm mb-2">{successMessage}</div>
              )}
              
              <Input
                autoFocus
                isRequired
                label="Email Address"
                type="email"
                validationState={isEmailValid ? "valid" : "invalid"}
                value={email}
                onValueChange={(value) => {
                  setIsEmailValid(true);
                  setEmail(value);
                  setErrorMessage("");
                }}
                errorMessage={!isEmailValid && "Введіть коректний email"}
              />
              <Input
                isRequired
                label="Password"
                type="password"
                validationState={isPasswordValid ? "valid" : "invalid"}
                value={password}
                onValueChange={(value) => {
                  setIsPasswordValid(true);
                  setPassword(value);
                  setErrorMessage("");
                }}
                errorMessage={!isPasswordValid && "Мінімум 6 символів"}
              />
              <Input
                isRequired
                label="Confirm Password"
                type="password"
                validationState={isConfirmPasswordValid ? "valid" : "invalid"}
                value={confirmPassword}
                onValueChange={(value) => {
                  setIsConfirmPasswordValid(true);
                  setConfirmPassword(value);
                  setErrorMessage("");
                }}
                errorMessage={!isConfirmPasswordValid && "Паролі не співпадають"}
              />
              <Button 
                fullWidth 
                color="primary" 
                type="submit"
                isDisabled={!email || !password || !confirmPassword}
              >
                Register
              </Button>
            </m.form>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </div>
  );
}
