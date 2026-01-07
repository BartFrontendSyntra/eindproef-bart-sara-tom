<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\LocationType;

class LocationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locationTypes = [
            ['type_name' => 'Nationaal Park'],
            ['type_name' => 'Natuurreservaat'],
            ['type_name' => 'Gemeentelijk Bos'],
            ['type_name' => 'Privé Bos'],
            ['type_name' => 'Beschermd Landschap'],
            ['type_name' => 'Stadsbos'],
        ];

        foreach ($locationTypes as $locationType) {
            LocationType::create($locationType);
        }
    }
}
