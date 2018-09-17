<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoadDamagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('road_damages', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('user_id');
          $table->double('latitude', 11, 8); // DOUBLE equivalent with precision, 11 digits in total and 8 after the decimal point
          $table->double('longitude', 11, 8);
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('road_damages');
    }
}
