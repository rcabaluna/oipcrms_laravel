<?php

use App\Http\Controllers\Libraries\AccountsController;
use App\Http\Controllers\Libraries\OrgStructureController;
use App\Http\Controllers\Libraries\UsersController;
use Illuminate\Support\Facades\Route;




Route::resource('/libraries/users', UsersController::class);
Route::resource('/libraries/accounts', AccountsController::class);
Route::get('/libraries/org-structure', [OrgStructureController::class, 'index']);
Route::post('/libraries/org-structure/group1', [OrgStructureController::class, 'group1Store'])->name('org-structure.group1Store');
Route::post('/libraries/org-structure/group2', [OrgStructureController::class, 'group2Store'])->name('org-structure.group2Store');
Route::post('/libraries/org-structure/group3', [OrgStructureController::class, 'group3Store'])->name('org-structure.group3Store');









require __DIR__.'/api.php';
