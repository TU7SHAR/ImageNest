import LoginClient from "./LoginClient";

// 1. SEO METADATA (Now allows proper title!)
export const metadata = {
  title: "Login", // Result: "Login | NestImage"
  description:
    "Login to your NestImage account to download unlimited images and manage your gallery.",
};

export default function LoginPage() {
  return <LoginClient />;
}
