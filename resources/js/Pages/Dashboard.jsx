// import React, { useState } from 'react';
// import { useForm } from '@inertiajs/react';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// export default function CreateCategory() {
//     const { data, setData, post, errors, processing, reset } = useForm({
//         title: '',
//         description: '',
//     });

//     const [focused, setFocused] = useState({
//         title: false,
//         description: false,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         post('/category/store', {
//             onSuccess: () => {
//                 // Show success popup
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success!',
//                     text: 'Your product was added successfully.',
//                     confirmButtonText: 'OK',
//                 });

//                 // Reset the form fields
//                 reset();
//             },
//         });
//     };

//     return (
//         <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8 border border-blue-100 transform transition-all duration-300 hover:shadow-xl">
//             <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-blue-200">
//                 <div className="p-2 bg-blue-600 rounded-lg text-white">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                     </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Create New Category</h1>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="transform transition-all duration-300 hover:translate-x-1">
//                     <label
//                         className={`block text-sm font-medium mb-2 transition-all duration-300 ${focused.title ? 'text-blue-600 translate-x-1' : 'text-gray-700'}`}
//                         htmlFor="title"
//                     >
//                         Category Title
//                     </label>
//                     <div className="relative">
//                         <input
//                             id="title"
//                             type="text"
//                             value={data.title}
//                             onChange={(e) => setData('title', e.target.value)}
//                             onFocus={() => setFocused({ ...focused, title: true })}
//                             onBlur={() => setFocused({ ...focused, title: false })}
//                             className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm ${
//                                 focused.title
//                                     ? 'border-blue-500 shadow-md shadow-blue-100'
//                                     : 'border-gray-200 hover:border-blue-200'
//                             }`}
//                             placeholder="Enter category title"
//                         />
//                         <div
//                             className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out ${
//                                 data.title ? 'w-full' : 'w-0'
//                             }`}
//                         ></div>
//                     </div>
//                     {errors.title && (
//                         <div className="text-red-500 text-sm mt-2 animate-pulse">
//                             {errors.title}
//                         </div>
//                     )}
//                 </div>

//                 <div className="transform transition-all duration-300 hover:translate-x-1">
//                     <label
//                         className={`block text-sm font-medium mb-2 transition-all duration-300 ${focused.description ? 'text-blue-600 translate-x-1' : 'text-gray-700'}`}
//                         htmlFor="description"
//                     >
//                         Description
//                     </label>
//                     <div className="relative">
//                         <textarea
//                             id="description"
//                             value={data.description}
//                             onChange={(e) => setData('description', e.target.value)}
//                             onFocus={() => setFocused({ ...focused, description: true })}
//                             onBlur={() => setFocused({ ...focused, description: false })}
//                             className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 outline-none h-36 resize-none bg-white/80 backdrop-blur-sm ${
//                                 focused.description
//                                     ? 'border-blue-500 shadow-md shadow-blue-100'
//                                     : 'border-gray-200 hover:border-blue-200'
//                             }`}
//                             placeholder="Enter category description"
//                         ></textarea>
//                         <div
//                             className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out ${
//                                 data.description ? 'w-full' : 'w-0'
//                             }`}
//                         ></div>
//                     </div>
//                     {errors.description && (
//                         <div className="text-red-500 text-sm mt-2 animate-pulse">
//                             {errors.description}
//                         </div>
//                     )}
//                 </div>

//                 <div className="flex items-center justify-between pt-6 space-x-4">
//                     <button
//                         type="button"
//                         className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-1"
//                         onClick={() => window.history.back()}
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         type="submit"
//                         disabled={processing}
//                         className={`group relative overflow-hidden px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
//                             processing ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
//                         }`}
//                     >
//                         <span className="relative z-10 flex items-center justify-center">
//                             {processing ? (
//                                 <>
//                                     <svg
//                                         className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                         ></circle>
//                                         <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                         ></path>
//                                     </svg>
//                                     Processing...
//                                 </>
//                             ) : (
//                                 <>
//                                     Save Category
//                                     <svg
//                                         className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             d="M14 5l7 7m0 0l-7 7m7-7H3"
//                                         />
//                                     </svg>
//                                 </>
//                             )}
//                         </span>
//                         <span className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );

// }


import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function CreateCategory() {
    const { data, setData, post, errors, processing, reset } = useForm({
        title: '',
        description: '',
    });

    const [focused, setFocused] = useState({
        title: false,
        description: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/category/store', {
            onSuccess: () => {
                // Show success popup
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your product was added successfully.',
                    confirmButtonText: 'OK',
                });

                // Reset the form fields
                reset();
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
            <div className="max-w-2xl w-full bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8 border border-blue-100 transform transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-blue-200">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Create New Category</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rest of the form remains the same */}
                    <div className="transform transition-all duration-300 hover:translate-x-1">
                        <label
                            className={`block text-sm font-medium mb-2 transition-all duration-300 ${focused.title ? 'text-blue-600 translate-x-1' : 'text-gray-700'}`}
                            htmlFor="title"
                        >
                            Category Title
                        </label>
                        <div className="relative">
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                onFocus={() => setFocused({ ...focused, title: true })}
                                onBlur={() => setFocused({ ...focused, title: false })}
                                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm ${
                                    focused.title
                                        ? 'border-blue-500 shadow-md shadow-blue-100'
                                        : 'border-gray-200 hover:border-blue-200'
                                }`}
                                placeholder="Enter category title"
                            />
                            <div
                                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out ${
                                    data.title ? 'w-full' : 'w-0'
                                }`}
                            ></div>
                        </div>
                        {errors.title && (
                            <div className="text-red-500 text-sm mt-2 animate-pulse">
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div className="transform transition-all duration-300 hover:translate-x-1">
                        <label
                            className={`block text-sm font-medium mb-2 transition-all duration-300 ${focused.description ? 'text-blue-600 translate-x-1' : 'text-gray-700'}`}
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <div className="relative">
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                onFocus={() => setFocused({ ...focused, description: true })}
                                onBlur={() => setFocused({ ...focused, description: false })}
                                className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 outline-none h-36 resize-none bg-white/80 backdrop-blur-sm ${
                                    focused.description
                                        ? 'border-blue-500 shadow-md shadow-blue-100'
                                        : 'border-gray-200 hover:border-blue-200'
                                }`}
                                placeholder="Enter category description"
                            ></textarea>
                            <div
                                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out ${
                                    data.description ? 'w-full' : 'w-0'
                                }`}
                            ></div>
                        </div>
                        {errors.description && (
                            <div className="text-red-500 text-sm mt-2 animate-pulse">
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-6 space-x-4">
                        <button
                            type="button"
                            className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-1"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`group relative overflow-hidden px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                                processing ? 'bg-blue-400' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                            }`}
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {processing ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Save Category
                                        <svg
                                            className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </>
                                )}
                            </span>
                            <span className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}