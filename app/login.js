"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/loginAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();

    if (res.ok) {
      setMessage("Login successful!");
      router.push("/Home");
    } else {
      setMessage(data.response);
    }
  };

  return (
    <main>
      <div className="flex justify-center self-center">
        <div className="bg-gray-100 bg h-full flex bg-Header bg-no-repeat bg-HeaderTop bg-bottomTop">
          <div className="w-3/5 p-5 flex justify-center items-center">
            <div className="flex flex-col justify-center p-32 items-center">
              <img src="org.png" className="w-7/12"></img>
              <p className="text-xl text-center w-9/12">
                Selamat Datang di Dashboard Data Member{" "}
                <span className="font-extrabold">HUMIC Engineering</span>
              </p>
              <img src="humic.png" className="w-20 mt-4"></img>
            </div>
          </div>{" "}
          {/* Sign in section */}
          <div className="w-2/5 bg-white text-black m-4 rounded-2xl py-52 px-32">
            <h1 className="font-semibold text-2xl mb-3 text-center">LOGIN</h1>
            <p className="text-xl text-left font-light mb-1">
              Login as an admin user
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="Username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-md mt-3 py-3 px-3 border-gray-400 border text-black "
              />
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md mt-3 border-gray-400 py-3 px-3 border text-black "
              />
              <p>{message}</p>
              <input
                type="submit"
                className="w-full rounded-md mt-3 bg-blue-600 hover:bg-sky-700 py-3 text-white cursor-pointer"
                value="Login"
              />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
