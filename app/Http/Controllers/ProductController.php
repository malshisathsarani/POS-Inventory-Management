<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\Request\ProductRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    // Show all products
    public function index() {
        $products = Product::select('products.id', 'products.title', 'products.description', 'categories.title as category_title', 'products.price')
            ->leftJoin('categories', 'products.category', '=', 'categories.id') // Join the categories table
            ->get();
    
        return Inertia::render('AllProducts', ['products' => $products]);
    }

    // Show the product creation form
    public function create()
{
    $categories = Category::all(); // Fetch all categories from the database
    return Inertia::render('CreateProduct', [
        'categories' => $categories,
    ]);
}

// public function show(Product $product)
// {
    
//     return Inertia::render('ShowProduct', [
//         'product' => $product,
//     ]);
// }

public function show(Product $product)
{

    $category_id = $product->category;
    $category = Category::find($category_id);
    

    return Inertia::render('ShowProduct', [
        'product' => [
            'id' => $product->id,
            'title' => $product->title,
            'description' => $product->description,
            'price' => $product->price,
            'image' => $product->image,
            'category_title' => $category->title, // Pass the category title to the frontend
        ],
    ]);
}



    public function store(ProductRequest $request)
{

    // Validate and create the product
    $product = Product::create($request->validated());

    // Handle image file upload if exists
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
        $product->update(['image' => $imagePath]);
    }

    // Redirect to the product list with a success message
    return redirect()->route('products.index')->with('success', 'Product created successfully.');
}


    // Show the product editing form
    public function edit(Product $product)
    {
        $categories = Category::all(); // Fetch all categories
        return Inertia::render('EditProduct', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }
    // Update a product
    public function update(ProductRequest $request, Product $product) {
        // Validate request using ProductRequest validation rules
        $validated = $request->validated();

        // Only update fields that are allowed
        $data = $validated;

        // Handle image file upload if exists
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        // Update the product's attributes in the database
        $product->update($data);

        // Redirect to the product list with a success message
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    // Delete a product
    public function destroy($id) {
        Product::findOrFail($id)->delete();
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
