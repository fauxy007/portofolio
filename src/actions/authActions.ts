"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

import { headers } from "next/headers";

const rateLimitMap = new Map<string, { attempts: number; lockUntil: number }>();

export async function loginAction(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown-ip";
  const now = Date.now();

  const userRateLimit = rateLimitMap.get(ip);

  if (userRateLimit) {
    if (userRateLimit.lockUntil > now) {
      const remainingSeconds = Math.ceil((userRateLimit.lockUntil - now) / 1000);
      return { error: `Terlalu banyak percobaan. Silakan coba lagi dalam ${remainingSeconds} detik.` };
    }
    // Jika waktu penalti sudah habis, reset
    if (userRateLimit.lockUntil <= now && userRateLimit.lockUntil !== 0) {
      rateLimitMap.set(ip, { attempts: 0, lockUntil: 0 });
    }
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
    
    // Reset saat berhasil login
    rateLimitMap.delete(ip);
  } catch (error) {
    if (error instanceof AuthError) {
      // Hitung percobaan gagal
      const currentAttempts = rateLimitMap.get(ip)?.attempts || 0;
      const newAttempts = currentAttempts + 1;
      
      if (newAttempts >= 3) {
        // Kunci selama 1 menit (60000 ms)
        rateLimitMap.set(ip, { attempts: newAttempts, lockUntil: now + 60000 });
        return { error: `Terlalu banyak percobaan. Akun dikunci selama 1 menit.` };
      } else {
        rateLimitMap.set(ip, { attempts: newAttempts, lockUntil: 0 });
      }

      switch (error.type) {
        case "CredentialsSignin":
          return { error: `Email atau password salah. (Percobaan ${newAttempts}/3)` };
        default:
          return { error: "Terjadi kesalahan saat login." };
      }
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
