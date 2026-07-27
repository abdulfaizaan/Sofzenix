import type * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Auth" });
  return {
    title: t("loginTitle") + " - Sofzenix",
    description: t("loginSubtitle"),
  };
}

export default function LoginPage(): React.JSX.Element {
  const t = useTranslations("Auth");

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[120px] opacity-60 mix-blend-screen" />
        <div className="absolute bottom-[0%] -left-[10%] w-[30vw] h-[30vw] bg-indigo-600/10 rounded-full blur-[100px] opacity-60 mix-blend-screen" />
      </div>

      <div className="w-full max-w-md relative z-10 mx-auto">
        {/* Logo/Brand (optional) */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              S
            </div>
            <span className="font-bold tracking-widest uppercase text-sm">Sofzenix</span>
          </Link>
        </div>

        <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/[0.05] p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Subtle inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
              {t("loginTitle")}
            </h1>
            <p className="text-sm text-gray-400/80">
              {t("loginSubtitle")}
            </p>
          </div>

          <form className="space-y-6" action="/api/auth/login" method="POST">
            <div className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-xs font-medium text-gray-400 group-focus-within:text-blue-400 transition-colors uppercase tracking-wider" htmlFor="email">
                  {t("emailLabel")}
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 block"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-400 group-focus-within:text-blue-400 transition-colors uppercase tracking-wider" htmlFor="password">
                    {t("passwordLabel")}
                  </label>
                  <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-white transition-colors">
                    {t("forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 block"
                  />
                </div>
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full py-6 mt-4 text-base font-medium rounded-xl bg-white text-black hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300">
              {t("signInButton")}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {t("noAccount")}{" "}
            <Link href="/register" className="text-white hover:text-blue-400 transition-colors font-medium">
              {t("signUp")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
