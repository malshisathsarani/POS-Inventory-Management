import React from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Tag, Edit, Trash2 } from 'lucide-react';

export default function ShowProduct() {

    const { product } = usePage().props;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 120
            }
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${product.id}`);
        }
    };

    console.log(product);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="bg-gradient-to-br from-white to-gray-50 p-8 max-w-3xl w-full mx-auto rounded-2xl shadow-2xl border border-gray-100"
            >
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image Section */}
                    {product.image ? (
                        <motion.div 
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-6"
                        >
                            <motion.img
                                src={`/storage/${product.image}`}
                                alt={product.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="max-w-full max-h-80 object-contain rounded-xl"
                            />
                        </motion.div>
                    ) : (
                        <motion.div 
                            variants={itemVariants}
                            className="bg-gray-100 rounded-2xl flex items-center justify-center p-6 text-gray-500 italic"
                        >
                            No image available
                        </motion.div>
                    )}

                    {/* Details Section */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <motion.h1 
                            variants={itemVariants}
                            className="text-4xl font-extrabold text-gray-800 flex items-center"
                        >
                            <Star className="mr-3 text-yellow-500" />
                            {product.title}
                        </motion.h1>

                        <motion.p 
                            variants={itemVariants}
                            className="text-gray-600 text-lg leading-relaxed"
                        >
                            {product.description}
                        </motion.p>

                        <motion.div 
                            variants={itemVariants}
                            className="flex items-center text-gray-500 text-base"
                        >
                            <Tag className="mr-2 text-blue-500" />
                            <span className="font-medium">Category:</span> 
                            <span className="ml-2 text-gray-700">{product.category_title}</span>
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            className="flex items-center text-green-600 font-bold text-2xl"
                        >
                            <ShoppingCart className="mr-2 text-green-500" />
                            Price: ${product.price}
                        </motion.div>

                        <motion.div 
                            variants={itemVariants}
                            className="flex space-x-4"
                        >
                            <Link 
                                href={`/products/${product.id}/edit`}
                                className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                            >
                                <Edit className="mr-2" /> Edit
                            </Link>
                            <button 
                                onClick={handleDelete}
                                className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                            >
                                <Trash2 className="mr-2" /> Delete
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}