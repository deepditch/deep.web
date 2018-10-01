<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDamageTypeCol extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('road_damages', function (Blueprint $table) {
            $table->enum('type', [
                'D00', 'D01', 'D10', 'D11', 'D20', 'D40', 'D43', 'D44'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('road_damages', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
}
