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

        $user_orgs = [];
        foreach (User::all() as $user) {
            $user_orgs[$user->id] = $user->organization_id;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->index('organization_id');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('cascade');
        });

        foreach (User::all() as $user) {
            $user->organization_id = $user_orgs[$user->id];
            $user->save();
        }

        $rd_orgs = [];
        foreach (RoadDamage::all() as $rd) {
            $rd_orgs[$rd->id] = $rd->organization_id;
        }

        Schema::table('road_damages', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->index('organization_id');
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('cascade');
        });

        foreach (RoadDamage::all() as $rd) {
            $rd->organization_id = $rd_orgs[$rd->id];
            $rd->save();
        }

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
