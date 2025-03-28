<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{

    use HasFactory;

    protected $fillable = [
        'title', 
        'description', 
        'category', 
        'price', 
        'image'
    ];


    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
