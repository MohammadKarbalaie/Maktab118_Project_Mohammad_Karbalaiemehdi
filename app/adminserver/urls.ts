export const urls ={
    auth:{
        login: "/auth/login", 
        generateToken: '/auth/token',
    },
    products: "/products",
    productsid: (id : string)=>`/products/${id}` ,
    categories: "/categories",
    subcategories:"/subcategories?page=1&limit=30",
    orders:"/orders",
    users:"/users",
};
