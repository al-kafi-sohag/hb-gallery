<?php

namespace App\Http\Requests\Admin\CategoryManagement;

use App\Enums\CategoryStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $categoryId = $this->route('category')?->id;

        return [
            'title' => ['required', 'string', 'max:255'],
            'parent_id' => array_filter([
                'nullable',
                'uuid',
                Rule::exists('categories', 'id'),
                $categoryId ? Rule::notIn([$categoryId]) : null,
            ]),
            'status' => ['required', Rule::enum(CategoryStatus::class)],
            'is_featured' => ['boolean'],
            'thumbnail' => ['nullable', 'image', 'max:2048'],
            'remove_thumbnail' => ['boolean'],
        ];
    }

    public function attributes(): array
    {
        return [
            'parent_id' => 'parent category',
            'is_featured' => 'featured',
        ];
    }
}
