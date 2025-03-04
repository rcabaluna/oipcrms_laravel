<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('tbluseraccounts', function (Blueprint $table) {
            $table->id('useraccountid');
            $table->unsignedBigInteger('userid');
            $table->string('username')->unique();
            $table->string('password');
            $table->boolean('is_active')->default(true);
            $table->string('useraccess');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tbluseraccounts');
    }
};
