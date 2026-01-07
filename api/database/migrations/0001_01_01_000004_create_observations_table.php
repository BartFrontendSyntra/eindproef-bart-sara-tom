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
        Schema::create('observations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->text('observation_text')->nullable();
            $table->string('photo_url', 512)->nullable();
            $table->enum('status', ['pending', 'verified', 'flagged'])->default('pending');
            $table->timestamp('created_at')->useCurrent();
        });

        // Add spatial POINT column with SRID 4326 after table creation
        \DB::statement('ALTER TABLE observations ADD coordinates POINT NOT NULL AFTER user_id');
        
        // Add spatial index
        \DB::statement('CREATE SPATIAL INDEX observations_coordinates_spatial ON observations(coordinates)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('observations');
    }
};
