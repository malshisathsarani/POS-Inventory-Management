// import React from 'react';
// import { useForm, usePage } from '@inertiajs/react';
// import Swal from 'sweetalert2';

// export default function Edit() {
//     const { product, categories } = usePage().props; // Fetch product and categories from props

//     const { data, setData, put, errors, processing } = useForm({
//         title: product.title || '',
//         description: product.description || '',
//         category: product.category_id || '', // Use category_id for the dropdown
//         price: product.price || '',
//         image: null,
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('description', data.description);
//         formData.append('category', data.category);
//         formData.append('price', data.price);
//         if (data.image) {
//             formData.append('image', data.image);
//         }

//         try {
//             await put(route('products.update', product.id), formData, {
//                 preserveScroll: true,
//                 onSuccess: () => {
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Success!',
//                         text: 'Product updated successfully!',
//                         confirmButtonText: 'OK',
//                     });
//                 },
//                 onError: (errors) => {
//                     console.error('Update failed:', errors);
//                 },
//             });
//         } catch (error) {
//             console.error('Error updating product:', error);
//         }
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <div>
//                     <label>Title:</label>
//                     <input
//                         type="text"
//                         value={data.title}
//                         onChange={(e) => setData('title', e.target.value)}
//                         className="border p-2 w-full"
//                     />
//                     {errors.title && <p className="text-red-500">{errors.title}</p>}
//                 </div>

//                 <div>
//                     <label>Description:</label>
//                     <textarea
//                         value={data.description}
//                         onChange={(e) => setData('description', e.target.value)}
//                         className="border p-2 w-full"
//                     ></textarea>
//                     {errors.description && <p className="text-red-500">{errors.description}</p>}
//                 </div>

//                 <div>
//                     <label>Category:</label>
//                     <select
//                         value={data.category}
//                         onChange={(e) => setData('category', e.target.value)}
//                         className="border p-2 w-full"
//                     >
//                         <option value="">Select a category</option>
//                         {categories.map((category) => (
//                             <option key={category.id} value={category.id}>
//                                 {category.title}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.category && <p className="text-red-500">{errors.category}</p>}
//                 </div>

//                 <div>
//                     <label>Price:</label>
//                     <input
//                         type="number"
//                         value={data.price}
//                         onChange={(e) => setData('price', e.target.value)}
//                         className="border p-2 w-full"
//                     />
//                     {errors.price && <p className="text-red-500">{errors.price}</p>}
//                 </div>

//                 <div>
//                     <label>Image:</label>
//                     <input
//                         type="file"
//                         onChange={(e) => setData('image', e.target.files[0])}
//                         className="border p-2 w-full"
//                     />
//                     {errors.image && <p className="text-red-500">{errors.image}</p>}
//                 </div>

//                 <button
//                     type="submit"
//                     className={`bg-green-500 text-white py-2 px-4 rounded mt-4 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     disabled={processing}
//                 >
//                     {processing ? 'Updating...' : 'Update'}
//                 </button>
//             </form>
//         </div>
//     );
// }





import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Upload, Image, Edit2, PlusCircle } from 'lucide-react';

export default function Edit() {
    const { product, categories } = usePage().props;
    const [previewImage, setPreviewImage] = useState(product.image_url || null);

    const { data, setData, put, errors, processing } = useForm({
        title: product.title || '',
        description: product.description || '',
        category: product.category_id || '',
        price: product.price || '',
        image: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', data.price);
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            await put(route('products.update', product.id), formData, {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Product updated successfully!',
                        confirmButtonText: 'OK',
                    });
                },
                onError: (errors) => {
                    console.error('Update failed:', errors);
                },
            });
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const inputVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
            }
        },
        hover: { 
            scale: 1.02,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-6xl grid grid-cols-3 gap-4"
            >
                {/* First Column: Basic Information */}
                <div className="p-8 space-y-6 bg-white col-span-1 border-r border-blue-100">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center">
                        <Edit2 className="mr-3 text-blue-500" />
                        Edit Product
                    </h1>
                    
                    <div className="space-y-4">
                        {[
                            {
                                label: 'Title',
                                type: 'text',
                                value: data.title,
                                onChange: (e) => setData('title', e.target.value),
                                error: errors.title,
                                icon: <PlusCircle className="text-blue-500" />
                            },
                            {
                                label: 'Description',
                                type: 'textarea',
                                value: data.description,
                                onChange: (e) => setData('description', e.target.value),
                                error: errors.description,
                                icon: <PlusCircle className="text-blue-500" />
                            }
                        ].map((field) => (
                            <motion.div 
                                key={field.label}
                                variants={inputVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                className="relative"
                            >
                                <div className="flex items-center mb-2">
                                    {field.icon}
                                    <label className="ml-2 text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                </div>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24"
                                    ></textarea>
                                ) : (
                                    <input
                                        type={field.type}
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                )}
                                {field.error && (
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-500 text-sm mt-1"
                                    >
                                        {field.error}
                                    </motion.p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Second Column: Category and Price */}
                <div className="p-8 space-y-6 bg-blue-50 col-span-1 border-r border-blue-100 flex flex-col justify-center">
                    <div className="space-y-4">
                        {[
                            {
                                label: 'Category',
                                type: 'select',
                                value: data.category,
                                onChange: (e) => setData('category', e.target.value),
                                error: errors.category,
                                options: categories,
                                icon: <PlusCircle className="text-blue-500" />
                            },
                            {
                                label: 'Price',
                                type: 'number',
                                value: data.price,
                                onChange: (e) => setData('price', e.target.value),
                                error: errors.price,
                                icon: <PlusCircle className="text-blue-500" />
                            }
                        ].map((field) => (
                            <motion.div 
                                key={field.label}
                                variants={inputVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                className="relative"
                            >
                                <div className="flex items-center mb-2">
                                    {field.icon}
                                    <label className="ml-2 text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                </div>
                                {field.type === 'select' ? (
                                    <select
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option value="">Select a category</option>
                                        {field.options.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                )}
                                {field.error && (
                                    <motion.p 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-500 text-sm mt-1"
                                    >
                                        {field.error}
                                    </motion.p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Third Column: Image Upload */}
                <div className="p-8 bg-blue-100 col-span-1 flex flex-col items-center justify-center">
                    <div className="w-full max-w-xs">
                        <div className="flex items-center mb-2">
                            <Upload className="text-blue-500 mr-2" />
                            <label className="text-sm font-medium text-gray-700">
                                Update Product Image
                            </label>
                        </div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="relative w-full border-2 border-dashed border-blue-300 rounded-lg p-4 text-center"
                        >
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center">
                                <Image className="w-12 h-12 text-blue-400 mb-2" />
                                <p className="text-sm text-gray-600">
                                    Drag & Drop or Click to Upload
                                </p>
                            </div>
                        </motion.div>
                        {errors.image && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm mt-1"
                            >
                                {errors.image}
                            </motion.p>
                        )}
                        
                        {previewImage && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="mt-4 w-full aspect-square bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center"
                            >
                                <img 
                                    src={previewImage} 
                                    alt="Product Preview" 
                                    className="max-w-full max-h-full object-contain"
                                />
                            </motion.div>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={processing}
                        className={`
                            mt-6 w-full py-3 rounded-lg text-white font-semibold 
                            transition duration-300 ease-in-out
                            ${processing 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'}
                        `}
                    >
                        {processing ? 'Updating...' : 'Update Product'}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}