"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  UserIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/movies";

  useEffect(() => {
    setEmail("savannahinformatics@example.com");
    setPassword("password");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-[480px] w-full">
        {/* Logo */}
        <Image
          src="/Movie Film Logo.png"
          alt="MovieApp"
          width={96}
          height={96}
          className="w-28 h-20 sm:w-36 sm:h-24 object-contain mx-auto mb-6 max-sm:hidden"
        />

        {/* Home Button */}
        <div
          className="flex items-center cursor-pointer mb-4 sm:mb-6"
          onClick={() => router.push("/")}
        >
          <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 mr-2" />
          <span className="text-sky-400 font-semibold text-sm sm:text-base">
            Home
          </span>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <h1 className="text-slate-900 text-2xl sm:text-3xl font-semibold text-center">
            Sign in
          </h1>

          {error && (
            <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 sm:mt-12 space-y-5 sm:space-y-6"
          >
            {/* Username */}
            <div>
              <label className="text-slate-900 text-sm sm:text-base font-medium mb-1 block">
                User name
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-slate-900 text-sm sm:text-base border border-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 rounded-md outline-sky-400"
                  placeholder="Enter user name"
                />
                <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-3 sm:right-4" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-900 text-sm sm:text-base font-medium mb-1 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-slate-900 text-sm sm:text-base border border-slate-300 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 rounded-md outline-sky-400"
                  placeholder="Enter password"
                />
                <div
                  className="absolute right-3 sm:right-4 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-sky-400 focus:ring-sky-300 border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 sm:ml-3 block text-sm sm:text-base text-slate-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm sm:text-base">
                <a
                  href="#"
                  className="text-sky-400 hover:underline font-semibold"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 sm:mt-8">
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 px-4 sm:px-5 text-sm sm:text-base font-medium tracking-wide rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none cursor-pointer transition"
              >
                Sign in
              </button>
            </div>

            {/* Register */}
            <p className="text-slate-900 text-sm sm:text-base mt-4 sm:mt-6 text-center">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-sky-400 hover:underline ml-1 font-semibold whitespace-nowrap"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
