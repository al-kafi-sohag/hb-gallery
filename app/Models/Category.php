<?php

namespace App\Models;

use App\Enums\CategoryStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Category extends Model implements HasMedia
{
    use HasFactory, HasSlug, HasUuids, InteractsWithMedia;

    public const MEDIA_COLLECTION_THUMBNAIL = 'thumbnail';
    protected $appends = ['status_label', 'status_color', 'thumbnail_url'];

    protected $fillable = [
        'parent_id',
        'title',
        'slug',
        'status',
        'is_featured',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'status' => CategoryStatus::class,
            'is_featured' => 'boolean',
        ];
    }


    protected function statusLabel(): Attribute
    {
        return Attribute::make(get: fn () => $this->status?->label());
    }

    protected function statusColor(): Attribute
    {
        return Attribute::make(get: fn () => $this->status?->color());
    }

    protected function thumbnailUrl(): Attribute
    {
        return Attribute::make(get: fn () => $this->getFirstMediaUrl(self::MEDIA_COLLECTION_THUMBNAIL));
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::MEDIA_COLLECTION_THUMBNAIL)
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
