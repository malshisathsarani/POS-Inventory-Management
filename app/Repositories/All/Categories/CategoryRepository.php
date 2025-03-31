<?php

namespace App\Repositories\All\Categories;

use App\Repositories\Base\BaseRepository;
use App\Repositories\Base\BaseRepositoryInterface;


class CategoryRepository extends BaseRepository implements CategoryInterface
{
    /**
     * @var Category
     */
    protected $model;
    /**
     * CategoryRepository constructor.
     *
     * @param  Category  $model
     */
    public function __construct(Category $model)
    {
        $this->model = $model;
    }

}