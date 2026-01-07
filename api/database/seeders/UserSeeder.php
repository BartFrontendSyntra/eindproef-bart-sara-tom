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

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
