<?php

namespace App\Http\Controllers;

use App\Http\Requests\Request\CategoryRequest;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;


class CategoryController extends Controller
{


    public function index()
    {
        // Fetch all categories from the database
        $categories = Category::all();

        // Pass the categories to the React component
        return Inertia::render('AllCatergories', [
            'categories' => $categories,
        ]);
    }


    public function create()
    {
        // Render the React component for creating a category
        return Inertia::render('Category/Create',[
            'category' => Product::where('')->with(['category'])->get()
        ]);
    }



    public function store(CategoryRequest $request)
    {
        // Validate and create the category
        $category = Category::create($request->validated());

        // Redirect to the category list with a success message
        return redirect()->route('category.index')->with('success', 'Category created successfully!');
    }


    public function show($id)
{
    // Find the category by ID
    $category = Category::find($id);

    // If the category exists, pass it to the React component
    if ($category) {
        return Inertia::render('ShowCatergories', [
            'category' => $category,
        ]);
    }

    // If the category does not exist, redirect with an error message
    return redirect()->route('category.index')->with('alert-danger', 'Category not found');
}


public function edit($id)
{
    // Find the category by ID
    $category = Category::find($id);

    // If the category exists, pass it to the React component
    if ($category) {
        return Inertia::render('EditCatergory', [
            'category' => $category,
        ]);
    }

    // If the category does not exist, redirect with an error message
    return redirect()->route('category.index')->with('alert-danger', 'Category not found');
}


public function update(Request $request, $id)
{
    $category = Category::find($id);

    if ($category) {
        $category->update($request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]));

        return redirect()->route('category.index')->with('success', 'Category updated successfully!');
    }

    return redirect()->route('category.index')->with('alert-danger', 'Category not found');
}


public function destroy($id)
{
    $category = Category::find($id);

    if ($category) {
        $category->delete();
        return redirect()->route('category.index')->with('success', 'Category deleted successfully!');
    }

    return redirect()->route('category.index')->with('alert-danger', 'Category not found');
}

}
