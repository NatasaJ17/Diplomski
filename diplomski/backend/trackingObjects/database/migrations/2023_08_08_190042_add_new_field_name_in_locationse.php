<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldNameInLocationse extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('location_info', function (Blueprint $table) {
            $table->integer('objectId')->unsigned()->nullable();
            $table->foreign('objectId')->references('id')->on('objects');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('location_info', function (Blueprint $table) {
            $table->dropForeign('objectId');
        });
    }
}
