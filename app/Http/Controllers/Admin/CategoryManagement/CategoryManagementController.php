<?php

namespace App\Http\Controllers\Admin\CategoryManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryManagement\CategoryRequest;
use App\Models\Category;
use App\Services\Admin\CategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\CategoryStatus;

class CategoryManagementController extends Controller
{
    public function __construct(protected CategoryService $categories)
    {
    }

    public function index(Request $request): Response
    {
        $categories = $this->categories->list(
            $request->only(['search', 'status', 'parent_id', 'created_from', 'created_to']),
            (int) $request->integer('per_page', 10)
        );

        return Inertia::render('Admin/CategoryManagement/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'parent_id', 'created_from', 'created_to', 'per_page']),
            'statusOptions' => CategoryStatus::options(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/CategoryManagement/Create', [
            'parentOptions' => $this->categories->options(),
            'statusOptions' => CategoryStatus::options(),
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $this->categories->create($request->safe()->except('thumbnail'), $request->file('thumbnail'));

        return to_route('admin.category-management.categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/CategoryManagement/Edit', [
            'category' => $category,
            'parentOptions' => $this->categories->options(),
            'statusOptions' => CategoryStatus::options(),
        ]);
    }

    public function update(CategoryRequest $request, Category $category): RedirectResponse
    {
        $this->categories->update(
            $category,
            $request->safe()->except(['thumbnail', 'remove_thumbnail']),
            $request->file('thumbnail'),
            $request->boolean('remove_thumbnail')
        );

        return to_route('admin.category-management.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function show(Category $category): Response
    {
        return Inertia::render('Admin/CategoryManagement/Show', [
            'category' => $this->categories->find($category->id),
        ]);
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->categories->delete($category);

        return back()->with('success', 'Category deleted successfully.');
    }

    public function toggleStatus(Category $category): RedirectResponse
    {
        $this->categories->toggleStatus($category);

        return back()->with('success', 'Category status updated.');
    }

    public function toggleFeatured(Category $category): RedirectResponse
    {
        $this->categories->toggleFeatured($category);

        return back()->with('success', 'Category visibility updated.');
    }
}
