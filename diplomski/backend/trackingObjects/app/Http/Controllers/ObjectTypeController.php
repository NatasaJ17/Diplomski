<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ObjectType;
use App\Http\Controllers\Controller;
use Exception;

class ObjectTypeController extends Controller
{
    public function addObjectType(Request $request)
    {
        $user = auth()->user();

        if($user->role != 'administrator')
        {
            return response("Nemate odgovarajucu dozovolu za ovu akciju.", 401);
        }
        $objectType = null;

        $fields = $request->validate(
            [
                'name' => 'required|string',
            ]
        );

        if ($file = $request->file('image')) {
            try {
                $name = $file->getClientOriginalName();

                if ($file->move('images', $name)) {

                    $imagedata = file_get_contents(public_path('\images\\' . $name));
                    $base64 = base64_encode($imagedata);
                    $objectType = ObjectType::create([
                        'name' => $fields['name'],
                        'image' => $base64
                    ]);
                }
            } catch (Exception $e) {
                return response($e->getMessage(), 400);
            }
        }

        $response = [
            $objectType
        ];

        return response($response, 201);
    }
    public function getObjectTypes()
    {
        $objectTypes = ObjectType::all();

        $response = [
            $objectTypes
        ];

        return $response;
    }
    public function destroy($id)
    {
        return ObjectType::destroy($id);
    }
}