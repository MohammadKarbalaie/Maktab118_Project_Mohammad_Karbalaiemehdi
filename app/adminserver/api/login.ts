import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../lib/session";  
import apiClient from "../lib/apiClient";  
import { LoginResponse } from "../type/LoginRes";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      username,
      password,
    });

    const { accessToken, refreshToken } = response.data.token;


    req.session.user = {
      accessToken,
      refreshToken,
    };

    await req.session.save(); 
    
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(401).json({ message: "Invalid username or password" });
  }
}


export default withSessionRoute(loginRoute);
