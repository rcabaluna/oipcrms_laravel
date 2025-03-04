<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Libraries\TblGroup1Model;
use App\Models\Libraries\TblGroup2Model;
use App\Models\Libraries\TblGroup3Model;
use App\Models\Libraries\UsersModel;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    public function group1()
    {
        return TblGroup1Model::get();
    }

    public function group2()
    {
        return TblGroup2Model::get();
        
    }

    public function group3()
    {
        return TblGroup3Model::get();
    }

    public function availableUsers()
    {
        $users = UsersModel::whereNotIn('userid', function ($query) {
            $query->select('userid')->from('tbluseraccounts');
        })->get();

        return $users;
    }


}
