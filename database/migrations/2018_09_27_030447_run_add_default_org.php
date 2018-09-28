<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class RunAddDefaultOrg extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('organizations')->where('id', '=', 1)->delete();
        DB::table('organizations')->insert([
            'id' => 1,
            'name' => 'Defautlt Organization',
            'address' => '123 Woodward Ave',
            'city' => 'Detroit',
            'state' => 'Michigan',
            'zip' => '48202'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
