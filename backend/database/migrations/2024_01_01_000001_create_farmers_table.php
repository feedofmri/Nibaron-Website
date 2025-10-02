<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('farmers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nid', 17)->unique();
            $table->string('phone', 15);
            $table->text('address');
            $table->string('district');
            $table->string('upazila');
            $table->string('union')->nullable();
            $table->string('village');
            $table->integer('farming_experience')->default(0);
            $table->decimal('total_land', 8, 2)->default(0);
            $table->boolean('verification_status')->default(false);
            $table->string('profile_image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('farmers');
    }
};
