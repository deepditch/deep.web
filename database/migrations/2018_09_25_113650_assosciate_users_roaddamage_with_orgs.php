<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AssosciateUsersRoaddamageWithOrgs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('organization_id');
        });

        Schema::table('road_damages', function (Blueprint $table) {
            $table->integer('organization_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('organization_id');
        });

        Schema::table('roaddamages', function (Blueprint $table) {
            $table->dropColumn('organization_id');
        });
    }
}
