<?php

namespace App\Http\Controllers;

use App\Http\Requests\Request\CategoryRequest;
use App\Repositories\All\Categories\CategoryInterface;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;


class CategoryController extends Controller
{
    public function __construct(protected CategoryInterface $categoryInterface){}


    public function index()
    {
        // Fetch all categories from the database
        $categories = Category::all();
        // Use the CategoryInterface to fetch categories
        $categories = $this->categoryInterface->all();
        // Pass the categories to the React component
        return Inertia::render('AllCatergories', [
            'categories' => $categories,
        ]);
    }


    public function create()
    {
        // Render the React component for creating a category
        return Inertia::render('Dashboard',[
            'category' => Category::where('')->with(['category'])->get()
        ]);
    }



    public function store(CategoryRequest $request)
    {
        $this->categoryInterface->create($request->validated());
        // Redirect to the category list with a success message
        return redirect()->route('category.index')->with('success', 'Category created successfully!');
    }


    public function show($id)
    {
    // Find the category by ID
    $category = $this->categoryInterface->findById($id);

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
        $category = $this->categoryInterface->findById($id);
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
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $category = $this->categoryInterface->update($id, $validatedData);

        if ($category) {
            return redirect()->route('category.index')->with('success', 'Category updated successfully!');
        }

        return redirect()->route('category.index')->with('alert-danger', 'Category not found');
    }


    public function destroy($id)
    {
        $result = $this->categoryInterface->deleteById($id);
        
        if ($result) {
            return redirect()->route('category.index')->with('success', 'Category deleted successfully!');
        }

        return redirect()->route('category.index')->with('alert-danger', 'Category not found');
    }

}
