export const urls = {  
    auth: {  
        login: "/auth/login",  
        signup: "/auth/signup",   
        generateToken: "/auth/token",  
    },  
    products: "/products",  
    productId: (id: string) => `/products/${id}`,  
    categories: "/categories",  
    subcategories: "/subcategories?page=1&limit=30",  
    orders: "/orders",  
    users: "/users",  
};  