import axios from "axios";
import { useRouter } from "next/navigation";

export const onLogout = async () => {
    const router = useRouter();
    try {
      const response = await axios.get("/api/logout");

      console.log("Logged out successfully", response);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };