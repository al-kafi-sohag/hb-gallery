<?php

use App\Http\Controllers\Admin\CategoryManagement\CategoryManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::prefix('category-management')->name('category-management.')->controller(CategoryManagementController::class)->group(function () {
        Route::get('categories', 'index')->name('categories.index');
        Route::get('categories/create', 'create')->name('categories.create');
        Route::post('categories', 'store')->name('categories.store');
        Route::get('categories/{category}/edit', 'edit')->name('categories.edit');
        Route::put('categories/{category}', 'update')->name('categories.update');
        Route::get('categories/{category}', 'show')->name('categories.show');
        Route::delete('categories/{category}', 'destroy')->name('categories.destroy');
        Route::patch('categories/{category}/toggle-status', 'toggleStatus')->name('categories.toggle-status');
        Route::patch('categories/{category}/toggle-featured', 'toggleFeatured')->name('categories.toggle-featured');
    });
});
