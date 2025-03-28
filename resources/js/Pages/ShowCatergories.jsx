import React from 'react';

export default function ShowCategory({ category }) {
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 my-8">
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">{category.title}</h1>
            <p className="text-gray-600">{category.description || 'No description available.'}</p>
        </div>
    );
}
