"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegMember = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.namalengkap) {
      setError("namalengkap", { type: "manual", message: "Nama wajib diisi" });
      return;
    }
    if (!data.username) {
      setError("username", { type: "manual", message: data.password.length });
      return;
    }
    if (!data.email) {
      setError("email", { type: "manual", message: "Email wajib diisi" });
      return;
    }
    if (!data.password || data.password.length < 7) {
      setError("password", {
        type: "manual",
        message: "Password kurang dari 7 karakter",
      });

      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Konfirmasi password tidak cocok",
      });
      return;
    }
    console.log(data);

    try {
      const res = await fetch("http://localhost:5000/auth/registerMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namalengkap: data.namalengkap,
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Registrasi berhasil!");
        router.push("/Home");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <div className="bg-white shadow-xl w-2/3 h- text-black rounded-xl flex flex-col mt-3 p-14">
      <h1 className="font-semibold mb-5">Register Akun Member</h1>
      <hr></hr>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="float-left">
          <label htmlFor="namalengkap" className="block mt-2 mb-1">
            Nama Lengkap
          </label>
          <input
            {...register("namalengkap")}
            id="namalengkap"
            type="text"
            name="namalengkap"
            placeholder="Nama Member"
            className="mb-2 text-sm"
          />
          {errors.namalengkap && <p>{errors.namalengkap.message}</p>}
        </div>
        <div className="float-left">
          <label htmlFor="email" className="block mt-2 mb-1">
            Email Member
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            name="email"
            className="mb-2 text-sm"
            placeholder="Email Member"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="float-left">
          <label htmlForr="username" className="block  mt-2 mb-1">
            Username
          </label>
          <input
            {...register("username")}
            id="username"
            type="text"
            name="username"
            placeholder="Username Member"
            className="mb-2 text-sm"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="float-left">
          <label htmlFor="password" className="block  mt-2 mb-1">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            name="password"
            placeholder="Password Member"
            className="border-b mb-2 text-sm border-black "
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="float-left">
          <label htmlFor="confirmPassword" className="block  mt-2 mb-1">
            Ulangi Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            name="confirmPassword"
            placeholder="Ulangi Password"
            className="border-b border-black mb-2 text-sm"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <input
          type="submit"
          className="w-1/4 rounded-md mt-3 bg-blue-600 hover:bg-sky-700 py-3 text-white cursor-pointer"
          value="Register"
        />
      </form>
    </div>
  );
};
export default RegMember;