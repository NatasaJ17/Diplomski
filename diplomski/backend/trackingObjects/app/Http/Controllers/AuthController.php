<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $fields = $request->validate(
            [
                'name' => 'required|string',
                'email' => 'required|string|unique:users,email',
                'password' => 'required|string|confirmed',
                'role' => 'required|string',
                'address' => 'string',
                'phone' => 'string'
            ]
        );

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'role' => $fields['role'],
            'address' => $fields['address'],
            'phone' => $fields['phone']
        ]);

        $token = $user->createToken('myAppToken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {

        $fields = $request->validate(
            [
                'email' => 'required|string',
                'password' => 'required|string'
            ]
        );

        //check email
        $user = User::where('email', $fields['email'])->first();

        //check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            $response = [
                'poruka' => 'Email ili pasvord nisu ispravni.',
            ];
            return response($response, 401);
        }
        $token = $user->createToken('myAppToken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 200);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        $response = [
            'message' => 'Uspjesno ste se odjavili.'
        ];
        return response($response, 200);
    }
    public function getAllUsers()
    {
        $users = User::all();

        return [
            'users' => $users
        ];
    }
    public function destroy($id)
    {
        return User::destroy($id);
    }
}