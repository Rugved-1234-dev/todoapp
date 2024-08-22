import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      console.log("Success:", result);
      navigate("/signin");
    } catch (error) {
      alert("Sign up failed: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <form className="flex flex-col gap-2" onSubmit={submitForm}>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                className="border-[1.5px] border-slate-600 py-2 rounded-sm px-1"
                onChange={handleChange}
                value={signUpData.username}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border-[1.5px] border-slate-600 py-2 rounded-sm px-1"
                onChange={handleChange}
                value={signUpData.email}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className="border-[1.5px] border-slate-600 py-2 rounded-sm px-1"
                onChange={handleChange}
                value={signUpData.password}
              />
            </div>
            <button
              className="w-full mt-3 bg-slate-800 text-white py-2 px-1 rounded-sm"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <span className="underline text-blue-400">
              <Link to="/signin">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
