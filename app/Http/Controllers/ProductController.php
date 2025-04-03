<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\Request\ProductRequest;
use App\Repositories\All\Products\ProductInterface;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{

    public function __construct(protected ProductInterface $productInterface){}
    // Show all products
    public function index() {

        $products = $this->productInterface->all();

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
    $product = $this->productInterface->findById($product->id);

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
    // Create a new product using the ProductInterface
    $product = $this->productInterface->create($request->validated());
    // Redirect to the product list with a success message
    return redirect()->route('products.index')->with('success', 'Product created successfully.');
}

    // Show the product editing form
    public function edit(Product $product)
    {
        $product = $this->productInterface->findById($product->id);
        $categories = Category::all(); // Fetch all categories
        return Inertia::render('EditProduct', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }
    // Update a product
    public function update(ProductRequest $request, Product $product) {

        $product = $this->productInterface->findById($product->id);
        // Validate request using ProductRequest validation rules
        $validated = $request->validated();

        // Only update fields that are allowed
        $data = $validated;
        // Update the product's attributes in the database
        $product->update($data);

        // Redirect to the product list with a success message
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    // Delete a product
    public function destroy($id) {
        // Find the product by ID and delete it
        $product = $this->productInterface->findById($id);
        if (!$product) {
            return redirect()->route('products.index')->with('alert-danger', 'Product not found.');
        }
        $product->delete();
        // Redirect to the product list with a success message
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
