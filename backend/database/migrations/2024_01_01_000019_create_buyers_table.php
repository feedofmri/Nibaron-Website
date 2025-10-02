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
        Schema::create('buyers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('buyer_type', ['wholesaler', 'retailer', 'exporter']);
            $table->string('business_name');
            $table->string('phone');
            $table->text('address');
            $table->string('district');
            $table->string('registration_number')->nullable();
            $table->string('tax_id')->nullable();
            $table->boolean('verification_status')->default(false);
            $table->string('business_license')->nullable();
            $table->string('profile_image')->nullable();
            $table->timestamps();

            $table->index(['buyer_type', 'district']);
            $table->index('verification_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buyers');
    }
};
