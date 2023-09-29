<?php

namespace App\Http\Controllers;

use App\Models\ObjectType;
use App\Models\TrackingObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Console\Logger\ConsoleLogger;
use App\Http\Controllers\Controller;

class TrackingObjectController extends Controller
{
    public function getObjects()
    {    
        $user = auth()->user();
        //echo($user->role);
        $user_id = $user->id;

        if($user->role == 'administrator')
        {
            $trackingObjects =
            TrackingObject::with('locations')->with('objectType')->get();
        }
        else
        {
            $trackingObjects =
            TrackingObject::with('locations')->with('objectType')->where('userId', $user_id)->get();
        }
    
        $response = [
             $trackingObjects,
        ];

        return $response;

    }
    public function addObject(Request $request)
    {
        $user = auth()->user();

        if($user->role != 'administrator')
        {
            return response("Nemate odgovarajucu dozovolu za ovu akciju.", 401);
        }

        $fields = $request->validate(
            [
                'name' => 'required|string',
                'objectId' => 'required|string',
                'description' => 'required|string',
                'object_type' => 'required',
                'userId' => 'required'
            ]
        );

        $object = TrackingObject::create([
            'name' => $fields['name'],
            'objectId' => $fields['objectId'],
            'description' => $fields['description'],
            'userId' => $fields['userId'],
            'object_type' => $fields['object_type']
        ]);


        $response = [
            'name' => $object,
        ];

        return response($response, 201);
    }

    public function destroy($id)
    {
        return TrackingObject::destroy($id);
    }
    
    public function updateObject(Request $request, $id)
    {
      /*   $selection = TrackingObject::find($id);
        $selection->update($request->except(['_token', '_method'])); */

        TrackingObject::whereId($id)->update($request->all());
        return response('1');
    }
}
