<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateRoadDamageReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roaddamage_reports', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('roaddamage_id');
            $table->integer('image_id');
            $table->enum('verified', [
                'unverified', 'verified', 'false-positive'
            ]);
            $table->double('confidence', 8, 2);
            $table->double('latitude', 11, 8);
            $table->double('longitude', 11, 8);
            $table->timestamps();
        });

        // fixing column order
        DB::statement("ALTER TABLE road_damages MODIFY `type` ENUM('D00', 'D01', 'D10', 'D11', 'D20', 'D40', 'D43', 'D44') AFTER `longitude`");
        Schema::table('road_damages', function (Blueprint $table) {
            $table->enum('status', [
                'pending-repair', 'repairing', 'done', 'wont-do'
            ])
            ->after('type');
            $table->enum('direction', [
                'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'
            ])
            ->after('type');
        });

        Schema::table('images', function (Blueprint $table) {
            $table->dropColumn('roaddamage_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('road_damage_reports');
    }
}
