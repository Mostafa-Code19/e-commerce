"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormValues({ email: "", password: "" });

    try {
        const res = await axios.post("/api/register", formValues)
        setLoading(false);
        if (res.status == 200) return signIn()
        else return setError(res.data.message)

    } catch (error: any) {
      setLoading(false);
      error = error.response.data.message
      if (error.includes('Unique')) error = 'این ایمیل از قبل ثبت نام شده است'
      return setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className='border-2 border-white rounded-xl p-4'>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="ایمیل"
          className='rounded-xl rtl w-full pr-10 py-2'
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="رمزعبور"
          className='rounded-xl rtl w-full pr-10 py-2'
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
        className="rounded-xl w-full text-white"
        disabled={loading}
      >
        {loading ? "بارگذاری..." : "ثبت نام"}
      </button>
    </form>
  );
};
