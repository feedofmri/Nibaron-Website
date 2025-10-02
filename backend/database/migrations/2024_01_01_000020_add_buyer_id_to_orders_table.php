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
        Schema::table('orders', function (Blueprint $table) {
            // Add buyer_id column
            $table->foreignId('buyer_id')->nullable()->after('id')->constrained()->onDelete('cascade');

            // Make user_id nullable to support buyer_id structure
            $table->foreignId('user_id')->nullable()->change();

            // Index for better performance
            $table->index('buyer_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['buyer_id']);
            $table->dropIndex(['buyer_id']);
            $table->dropColumn('buyer_id');
        });
    }
};
