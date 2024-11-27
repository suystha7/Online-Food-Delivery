"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FormButton } from "@/components/FormButton";
import { FormInput } from "@/components/FormInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Email validation
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Password validation (at least 8 characters, one number)
  const validatePassword = (password: string) =>
    /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Email Validation
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email" }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    // Password Validation
    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters and contain a number",
      }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (valid) {
      console.log("Form submitted:", { email, password });
      // Redirect to Sign In page after successful registration
      router.push("/signin");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6  rounded-lg">
        <h2 className="text-center">SIGN IN</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            error={errors.email}
          />

          {/* Password Input */}
          <div className="relative">
            <FormInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordVisible ? "text" : "password"} // Toggle between text and password type
              error={errors.password}
            />
            <div
              className="absolute top-11 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}{" "}
            </div>
          </div>
          <FormButton type="submit">Sign In</FormButton>
        </form>
        <p className="text-center text-sm">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
