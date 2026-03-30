"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterPage() {
  const [form, setForm] = useState({
    // name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const goToLogin = () => {
    router.push("/auth/login");
  };
  return (
    <AuthLayout>
      <div>
        <form action="" onSubmit={handleSubmit}>
          {/* <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="name" className="font-light text-sm">
              Name *
            </label>
            <input
              type="text"
              id="name"
              className="border border-zinc-300 px-5 py-3 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div> */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="email" className="font-light text-sm">
              Email *
            </label>
            <input
              type="email"
              id="email"
              className="border border-zinc-300 px-5 py-3 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-light text-sm">
              Password *
            </label>
            <input
              type="password"
              id="password"
              className="border border-zinc-300 px-5 py-3 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="flex items-center text-center justify-center bg-black text-white w-full py-3 mt-5 hover:bg-[var(--jet)] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Register
            <ArrowRight
              className={`w-4 h-4 ml-1 ${isHovered ? "-rotate-45" : ""} transition-all duration-300`}
            />
          </button>
        </form>
        <p className="text-center text-sm font-light mt-5">
          Already have an account?
        </p>
        <button
          className="bg-white border border-zinc-300 w-full mt-3 py-3 hover:bg-zinc-100 cursor-pointer"
          onClick={goToLogin}
        >
          Login
        </button>
        <p className="text-center mt-10 text-sm font-light flex items-start gap-2 justify-center">
          <Lock className="w-4 h-4" />
          All information is encrypted and securely stored.
        </p>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
