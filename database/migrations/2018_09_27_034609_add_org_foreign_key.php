<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\User;
use App\RoadDamage;

class AddOrgForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();

        Schema::table('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->index('organization_id');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('cascade');
        });

        Schema::table('road_damages', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->index('organization_id');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_organization_id_foreign');
            $table->dropIndex('users_organization_id_index');
        });
        Schema::table('road_damages', function (Blueprint $table) {
            $table->dropForeign('road_damages_organization_id_foreign');
            $table->dropIndex('road_damages_organization_id_index');
        });
    }
}
