"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function withAuth(WrappedComponent) {
  return function ProtectedRoutes(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [decodedTkn, setDecoded] = useState(null);

    useEffect(() => {
      const validateToken = async () => {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          router.push("/Login");
          return;
        }

        try {
          const response = await axios.post("/api/validateToken", { token });

          if (response.data.valid) {
            setIsAuthorized(true);
            setDecoded(response.data.decoded);
          } else {
            router.push("/Login");
          }
        } catch (error) {
          console.error("Error validating token:", error);
          router.push("/Login");
        } finally {
          setIsLoading(false);
        }
      };

      validateToken();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} decoded={decodedTkn} />;
  };
}

export default withAuth;
