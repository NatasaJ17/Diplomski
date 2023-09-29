<?php

namespace App\Http\Controllers;

use App\Models\LocationInfo;
use DateTime;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LocationInfoController extends Controller
{
    public function addLocationAndTime(Request $request)
    {

        $mytime = Carbon::now();
        echo $mytime->toDateTimeString();

        $fields = $request->validate(

            [
                'objectId' => 'required|string',
                'lat' => 'required',
                'long' => 'required',
                'date_and_time' => 'required'
            ]
        );

        $locationInfo = LocationInfo::create([
            'objectId' => $fields['objectId'],
            'lat' => $fields['lat'],
            'long' => $fields['long'],
            'date_and_time' => $fields['date_and_time']
        ]);


        $response = [
            'location_info' => $locationInfo,
        ];

        return response($response, 201);
    }
    public function destroy($id)
    {
        return LocationInfo::destroy($id);
    }

}
