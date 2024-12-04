import React, { useState } from 'react';
import { addProduct } from '@/app/adminserver/services/products-services';

const AddProductModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [product, setProduct] = useState({
        category: '',
        subcategory: '',
        name: '',
        price: 0,
        quantity: 0,
        brand: '',
        description: '',
        images: [] as File[], 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setProduct({ ...product, images: Array.from(files) }); 
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData  = new FormData();
            formData.append('category', product.category);
            formData.append('subcategory', product.subcategory);
            formData.append('name', product.name);
            formData.append('price', product.price.toString());
            formData.append('quantity', product.quantity.toString());
            formData.append('brand', product.brand);
            formData.append('description', product.description);
    
            product.images.forEach((image) => {
                formData.append('images', image); 
            });
    
            await addProduct(formData); 
            alert('کالای جدید اضافه شد');
            onClose(); 
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mt-4 p-6 bg-gray-800 rounded-xl shadow-lg w-full max-w-lg">
            <form onSubmit={handleSubmit} className='grid gap-4'>
                <h2 className='text-white text-xl'>افزودن کالای جدید</h2>
                <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg"/>
                <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg"/>
                <input type="text" name="subcategory" placeholder="Subcategory" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg"/>
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg"/>
                <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg"/>
                <input type="text" name="brand" placeholder="Brand" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg"/>
                <textarea name="description" placeholder="Description" onChange={handleChange} required className="p-2 bg-gray-700 text-white rounded-lg"/>
                <input type="file" multiple onChange={handleImageChange} className="p-2 bg-gray-700 text-white rounded-lg"/>
                <div className='flex gap-6'>
                <button className="px-6 py-3 bg-green-600 text-white
                 rounded-lg hover:bg-green-700" type="submit">ذخیره</button>
                <button className="px-6 py-3 bg-gray-600
                 text-white rounded-lg hover:bg-gray-700" type="button" onClick={onClose}>بستن</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddProductModal;