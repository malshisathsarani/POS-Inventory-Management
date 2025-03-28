<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            // Change from a string to an unsigned big integer to hold the foreign key
            $table->unsignedBigInteger('category');
            $table->decimal('price', 10, 2);
            $table->string('image')->nullable(); // For image file path
            $table->timestamps();

            // Set up the foreign key constraint
            $table->foreign('category')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
