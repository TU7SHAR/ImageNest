import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "Register", // Result: "Register | NestImage"
  description:
    "Create a free account on NestImage to save your favorite photos and download in high quality.",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
