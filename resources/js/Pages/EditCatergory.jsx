import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function EditCategory({ category }) {
    const { data, setData, put, errors } = useForm({
        title: category.title || '',
        description: category.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/category/${category.id}`, {
            onSuccess: () => alert('Category updated successfully!'),
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
