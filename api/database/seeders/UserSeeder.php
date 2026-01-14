<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['username' => 'janvermeulen', 'email' => 'jan.vermeulen@forestmaster.be', 'password_hash' => Hash::make('password123'), 'role_id' => 1],
            ['username' => 'sophiedevries', 'email' => 'sophie.devries@forestmaster.be', 'password_hash' => Hash::make('password123'), 'role_id' => 2],
            ['username' => 'pieterjacobs', 'email' => 'pieter.jacobs@gmail.com', 'password_hash' => Hash::make('password123'), 'role_id' => 2],
            ['username' => 'marieclaessens', 'email' => 'marie.claessens@outlook.com', 'password_hash' => Hash::make('password123'), 'role_id' => 3],
            ['username' => 'lucwouters', 'email' => 'luc.wouters@gmail.com', 'password_hash' => Hash::make('password123'), 'role_id' => 3],
            ['username' => 'emmapeeters', 'email' => 'emma.peeters@hotmail.com', 'password_hash' => Hash::make('password123'), 'role_id' => 3],
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);
            
            // Subscribe rangers to locations
            if ($userData['role_id'] === 2) {
                // Sophie monitors Hoge Kempen (1), Zoniënwoud (2), and Hallerbos (3)
                if ($userData['username'] === 'sophiedevries') {
                    $user->subscribedLocations()->attach([1, 2, 3]);
                }
                // Pieter monitors Meerdaalwoud (5), Kalmthoutse Heide (6), and Mechelse Heide (11)
                if ($userData['username'] === 'pieterjacobs') {
                    $user->subscribedLocations()->attach([5, 6, 11]);
                }
            }
        }
    }
}
