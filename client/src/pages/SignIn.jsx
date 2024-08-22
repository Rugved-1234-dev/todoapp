import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [signData, setSignData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      navigate("/");
      localStorage.setItem("token", result.token);
      localStorage.setItem("name",  result.name);

    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          <form className="flex flex-col gap-2" onSubmit={submitForm}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="border-[1.5px] border-slate-600 py-2 rounded-sm px-1"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="border-[1.5px] border-slate-600 py-2 rounded-sm px-1"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-3 bg-slate-800 text-white py-2 px-1 rounded-sm"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <span>
              <Link to="/signup" className="underline text-blue-400">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
