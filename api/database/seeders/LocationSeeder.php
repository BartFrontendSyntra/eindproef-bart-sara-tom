<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['name' => 'Nationaal Park Hoge Kempen', 'location_type_id' => 1],
            ['name' => 'Zoniënwoud', 'location_type_id' => 2],
            ['name' => 'Hallerbos', 'location_type_id' => 2],
            ['name' => 'Sonian Forest', 'location_type_id' => 2],
            ['name' => 'Meerdaalwoud', 'location_type_id' => 3],
            ['name' => 'Kalmthoutse Heide', 'location_type_id' => 1],
            ['name' => 'Antwerps Groendomein Rivierenhof', 'location_type_id' => 6],
            ['name' => 'Bourgoyen-Ossemeersen', 'location_type_id' => 2],
            ['name' => 'Het Leen', 'location_type_id' => 3],
            ['name' => 'Bos van Heverlee', 'location_type_id' => 3],
            ['name' => 'Mechelse Heide', 'location_type_id' => 2],
            ['name' => 'De Wijers', 'location_type_id' => 2],
            ['name' => 'Torfbroek', 'location_type_id' => 2],
            ['name' => 'Grotenbergbos', 'location_type_id' => 3],
            ['name' => 'Bulskampveld', 'location_type_id' => 2],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
