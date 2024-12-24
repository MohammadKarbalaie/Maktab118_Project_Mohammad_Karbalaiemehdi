'use client';  
import { useEffect } from "react";  
import { useRouter } from "next/navigation";  

export const useAuthGuard = (requiredRole: "ADMIN" | "USER") => {  
    const router = useRouter();  
    const token = localStorage.getItem("token");  
    const userRole = localStorage.getItem("role");  

    useEffect(() => {  
        if (!token) {  
            router.push("/auth/login");   
            console.log('Unauthorized - No token');   
        } else if (userRole !== requiredRole) {  
            if (userRole === "ADMIN") {  
                router.push("/admin/dashboard"); 
            } else if (userRole === "USER") {  
                router.push("/user/dashboard"); 
            } else {  
                router.push("/auth/login"); 
            }  
        }  
    }, [token, userRole, requiredRole, router]);  
};  

export const useAdminGuard = () => {  
    useAuthGuard("ADMIN");   
};  

export const useUserGuard = () => {  
    useAuthGuard("USER"); 
};