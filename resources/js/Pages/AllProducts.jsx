// import React, { useState } from 'react';
// import { Link, usePage } from '@inertiajs/react';
// import { PlusCircle, Edit, Trash2, Package } from 'lucide-react';

// export default function Index() {
//     const { products } = usePage().props;
//     const [expandedId, setExpandedId] = useState(null);

//     const toggleExpand = (id) => {
//         setExpandedId(expandedId === id ? null : id);
//     };

//     const handleDelete = (e) => {
//         if (!confirm('Are you sure you want to delete this product?')) {
//             e.preventDefault(); // Prevent form submission if the user cancels
//         }
//     };

//     console.log(products);
//     return (
//         <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow">
//             <div className="flex items-center justify-between mb-8">
//                 <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
//                 <Link
//                     href={route('products.create')}
//                     className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors duration-300"
//                 >
//                     <PlusCircle size={18} />
//                     <span>Add New Product</span>
//                 </Link>
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="w-full table-auto border-collapse border border-gray-200">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-3 text-left">Title</th>
//                             <th className="p-3 text-left">Description</th>
//                             <th className="p-3 text-left">Category</th>
//                             <th className="p-3 text-left">Price</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map(product => (
//                             <tr key={product.id} className="border-t border-gray-200">
//                                 <td className="p-3 flex items-center gap-2">
//                                     <Package size={20} className="text-blue-600" />
//                                     {product.title}
//                                 </td>
//                                 <td className="p-3 text-gray-600">{product.description}</td>
//                                 <td className="p-3 text-gray-500">{product.category_title || 'N/A'}</td>
//                                 <td className="p-3 text-green-600 font-semibold">${product.price}</td>
//                                 <td className="p-3 flex gap-3">
//                                     <Link
//                                         href={route('products.edit', product.id)}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors duration-200"
//                                     >
//                                         <Edit size={16} />
//                                         <span>Edit</span>
//                                     </Link>
//                                     <Link
//                                         href={route('products.show', product.id)}
//                                         className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors duration-200"
//                                     >
//                                         <Edit size={16} />
//                                         <span>Show</span>
//                                     </Link>
//                                     <form
//                                         method="POST"
//                                         action={route('products.destroy', product.id)}
//                                         onSubmit={handleDelete}
//                                     >
//                                         <input
//                                             type="hidden"
//                                             name="_method"
//                                             value="DELETE"
//                                         />
//                                         <input
//                                             type="hidden"
//                                             name="_token"
//                                             value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}
//                                         />
//                                         <button
//                                             type="submit"
//                                             className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors duration-200"
//                                         >
//                                             <Trash2 size={16} />
//                                             <span>Delete</span>
//                                         </button>
//                                     </form>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PlusCircle, Edit, Trash2, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index() {
    const { products } = usePage().props;
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelete = (e) => {
        if (!confirm('Are you sure you want to delete this product?')) {
            e.preventDefault(); // Prevent form submission if the user cancels
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-8"
            >
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Product Inventory</h1>
                <Link
                    href={route('products.create')}
                    className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-5 rounded-lg flex items-center gap-2.5 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                    <PlusCircle size={20} />
                    <span className="font-semibold">Add New Product</span>
                </Link>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="overflow-hidden rounded-xl shadow-2xl border border-gray-200"
            >
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="p-4 text-left text-gray-600 font-semibold tracking-wider">Title</th>
                            <th className="p-4 text-left text-gray-600 font-semibold tracking-wider">Description</th>
                            <th className="p-4 text-left text-gray-600 font-semibold tracking-wider">Category</th>
                            <th className="p-4 text-left text-gray-600 font-semibold tracking-wider">Price</th>
                            <th className="p-4 text-left text-gray-600 font-semibold tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {products.map((product, index) => (
                                <motion.tr 
                                    key={product.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        delay: index * 0.1 
                                    }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="p-4 flex items-center gap-3">
                                        <Package size={22} className="text-blue-600" />
                                        <span className="font-medium text-gray-800">{product.title}</span>
                                    </td>
                                    <td className="p-4 text-gray-600">{product.description}</td>
                                    <td className="p-4 text-gray-500">{product.category_title || 'N/A'}</td>
                                    <td className="p-4 text-green-600 font-bold">${product.price}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2.5">
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3.5 rounded-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                                            >
                                                <Edit size={16} />
                                                <span>Edit</span>
                                            </Link>
                                            <Link
                                                href={route('products.show', product.id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3.5 rounded-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                                            >
                                                <Edit size={16} />
                                                <span>Show</span>
                                            </Link>
                                            <form
                                                method="POST"
                                                action={route('products.destroy', product.id)}
                                                onSubmit={handleDelete}
                                            >
                                                <input
                                                    type="hidden"
                                                    name="_method"
                                                    value="DELETE"
                                                />
                                                <input
                                                    type="hidden"
                                                    name="_token"
                                                    value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')}
                                                />
                                                <button
                                                    type="submit"
                                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3.5 rounded-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                                                >
                                                    <Trash2 size={16} />
                                                    <span>Delete</span>
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}