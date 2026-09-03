<?php

namespace App\Services\Admin;

use App\Enums\CategoryStatus;
use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoryService
{
    public function __construct(protected Category $model)
    {
    }

    public function list(array $filters, int $perPage = 10): LengthAwarePaginator
    {
        return $this->model
            ->query()
            ->with(['parent:id,title', 'creator:id,name'])
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['parent_id'] ?? null, fn ($query, $parentId) => $query->where('parent_id', $parentId))
            ->when($filters['created_from'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['created_to'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function find(string $id): Category
    {
        return $this->model->with(['parent', 'creator', 'updater'])->findOrFail($id);
    }

    public function options(): Collection
    {
        return $this->model->select('id', 'parent_id', 'title')->orderBy('title')->get();
    }

    public function create(array $data, ?UploadedFile $thumbnail = null): Category
    {
        return DB::transaction(function () use ($data, $thumbnail) {
            $category = $this->model->create([
                ...$data,
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]);

            if ($thumbnail) {
                $category->addMedia($thumbnail)->toMediaCollection(Category::MEDIA_COLLECTION_THUMBNAIL);
            }

            return $category;
        });
    }

    public function update(Category $category, array $data, ?UploadedFile $thumbnail = null, bool $removeThumbnail = false): Category
    {
        return DB::transaction(function () use ($category, $data, $thumbnail, $removeThumbnail) {
            $category->update([
                ...$data,
                'updated_by' => Auth::id(),
            ]);

            if ($removeThumbnail && ! $thumbnail) {
                $category->clearMediaCollection(Category::MEDIA_COLLECTION_THUMBNAIL);
            }

            if ($thumbnail) {
                $category->addMedia($thumbnail)->toMediaCollection(Category::MEDIA_COLLECTION_THUMBNAIL);
            }

            return $category->fresh();
        });
    }

    public function delete(Category $category): void
    {
        $category->delete();
    }

    public function toggleStatus(Category $category): Category
    {
        $next = $category->status === CategoryStatus::Active
            ? CategoryStatus::Deactive
            : CategoryStatus::Active;

        $category->update([
            'status' => $next,
            'updated_by' => Auth::id(),
        ]);

        return $category->fresh();
    }

    public function toggleFeatured(Category $category): Category
    {
        $category->update([
            'is_featured' => ! $category->is_featured,
            'updated_by' => Auth::id(),
        ]);

        return $category->fresh();
    }
}
