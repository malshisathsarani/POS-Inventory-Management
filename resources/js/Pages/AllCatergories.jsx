import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function AllCategories({ categories }) {


    useEffect(() => {
        categories.map(category => {
            console.log(category.id);
        }
        )
    });

    const [hoveredItem, setHoveredItem] = useState(null);

    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete "${title}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/category/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'Category has been deleted.', 'success').then(() => {
                            window.location.reload(); // Refresh the page to update the list
                        });
                    })
                    .catch(() => {
                        Swal.fire('Error!', 'There was a problem deleting the category.', 'error');
                    });
            }
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-8 overflow-hidden">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                All Categories
            </h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 border border-gray-200"
                        onMouseEnter={() => setHoveredItem(category.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {category.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {category.description}
                            </p>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => window.location.href = `/category/${category.id}`}
                                        className={`flex items-center px-3 py-1 rounded-md text-sm ${hoveredItem === category.id ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'} transition-colors duration-300`}
                                    >
                                        View
                                    </button>

                                    <Link
                                        href={`/category/${category.id}/edit`}
                                        className={`flex items-center px-3 py-1 rounded-md text-sm ${hoveredItem === category.id ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-700'} transition-colors duration-300`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(category.id, category.title)}
                                        className={`flex items-center px-3 py-1 rounded-md text-sm ${hoveredItem === category.id ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'} transition-colors duration-300`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12 animate-pulse">
                    <p className="text-gray-500 text-lg">No categories found</p>
                </div>
            )}
        </div>
    );
}
