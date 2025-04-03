<?php

namespace App\Repositories\All\Products;

use App\Repositories\Base\BaseRepository;
use App\Repositories\Base\BaseRepositoryInterface;
use App\Repositories\All\Products\ProductInterface;
use App\Models\Product;

class ProductRepository extends BaseRepository implements ProductInterface
{
    /**
     * @var Product
     */
    protected $model;

    /**
     * ProductRepository constructor.
     *
     * @param  Product  $model
     */
    public function __construct(Product $model)
    {
        $this->model = $model;
    }
}