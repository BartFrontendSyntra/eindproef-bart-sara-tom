<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ObservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $observations = [
            [2, 5.7833, 50.9667, 'Gezonde populatie van wilde zwijnen waargenomen in de buurt van het wandelpad. Sporen en wroetgaten aanwezig in de buurt van de eikenbomen.', 'https://example.com/photos/wilde-zwijnen-1.jpg', 'verified', '2025-12-15 09:30:00'],
            [3, 4.4106, 50.7636, 'Prachtige blauwklokjes in bloei! De hele bosbodem staat blauw. Perfecte tijd voor een bezoek aan het Hallerbos.', 'https://example.com/photos/hallerbos-blauwklokjes.jpg', 'verified', '2025-04-18 14:20:00'],
            [4, 5.6833, 50.9500, 'Waarneming van een vos bij het Pietersheimer. Het dier leek gezond en was niet schuw.', 'https://example.com/photos/vos-hoge-kempen.jpg', 'verified', '2025-12-20 07:45:00'],
            [5, 4.3572, 50.8503, 'Omgevallen boom blokkeert het hoofdwandelpad. Mogelijk storm schade van afgelopen weekend.', 'https://example.com/photos/omgevallen-boom-zonienwoud.jpg', 'pending', '2026-01-03 11:15:00'],
            [6, 4.6394, 51.0297, 'Grote groep kraaien verzameld in de buurt van de vijver. Mogelijk voedselplaats.', null, 'verified', '2025-12-28 16:30:00'],
            [2, 5.1242, 51.0881, 'Reeën gespot in de vroege ochtend. Familie van 4 dieren, waaronder 2 kalveren.', 'https://example.com/photos/reeen-mechelse-heide.jpg', 'verified', '2025-11-10 06:20:00'],
            [3, 4.3572, 50.8503, 'Specht gehoord en gezien bij de oude eik. Zwarte specht waarschijnlijk.', 'https://example.com/photos/specht-zonienwoud.jpg', 'verified', '2025-12-05 10:00:00'],
            [4, 4.6800, 50.8600, 'Illegale dumpsite ontdekt. Huishoudelijk afval en bouwmateriaal. Dringend opruimen vereist.', 'https://example.com/photos/afval-meerdaalwoud.jpg', 'flagged', '2026-01-02 13:45:00'],
            [5, 4.4106, 50.7636, 'Paddenstoelen verzameling gespot langs het pad. Mogelijk giftige soorten - waarschuwingsbord aanbevolen.', 'https://example.com/photos/paddenstoelen-hallerbos.jpg', 'pending', '2025-10-22 15:10:00'],
            [6, 5.7833, 50.9667, 'Nieuwe bijenhotels geïnstalleerd bij de ingang. Goede initiatieven voor biodiversiteit!', 'https://example.com/photos/bijenhotel-hoge-kempen.jpg', 'verified', '2025-09-14 12:00:00'],
            [2, 4.4283, 51.3714, 'Zeldzame orchideeën aangetroffen in het natuurreservaat. Mogelijk beschermde soort.', 'https://example.com/photos/orchidee-kalmthout.jpg', 'verified', '2025-06-08 08:30:00'],
            [3, 3.7350, 51.0464, 'Wateroverlast op het wandelpad door recente regenval. Laarzen aanbevolen.', null, 'pending', '2026-01-04 09:00:00'],
            [4, 5.0600, 50.9300, 'Mooie herfstbladeren in De Wijers. Perfect voor natuurfotografie.', 'https://example.com/photos/herfst-de-wijers.jpg', 'verified', '2025-10-30 14:45:00'],
            [5, 4.4106, 50.7636, 'Jonge eekhoorn gezien die voedsel verzamelt voor de winter. Erg actief dier!', 'https://example.com/photos/eekhoorn-hallerbos.jpg', 'verified', '2025-11-25 11:20:00'],
            [6, 4.6394, 51.0297, 'Nieuw informatiebord geplaatst met wandelroutes en veiligheidsregels.', 'https://example.com/photos/infobord-meerdaalwoud.jpg', 'verified', '2025-08-20 10:30:00'],
            [2, 5.7833, 50.9667, 'Beschadigde bankje langs het pad. Reparatie nodig voor veiligheid bezoekers.', 'https://example.com/photos/bankje-schade.jpg', 'pending', '2026-01-05 15:00:00'],
            [3, 4.3572, 50.8503, 'Schitterende zonsopgang gefotografeerd tussen de bomen. Magisch moment!', 'https://example.com/photos/zonsopgang-zonienwoud.jpg', 'verified', '2025-07-12 05:45:00'],
            [4, 5.1242, 51.0881, 'Mountainbikers rijden off-trail en veroorzaken erosie. Mogelijk strengere controle nodig.', null, 'flagged', '2026-01-01 12:30:00'],
            [5, 4.4283, 51.3714, 'Zeldzame vlinders waargenomen in het heidelandschap. Prachtige biodiversiteit!', 'https://example.com/photos/vlinders-kalmthout.jpg', 'verified', '2025-07-25 13:15:00'],
            [6, 3.7350, 51.0464, 'Vogelkijkhut gerenoveerd. Uitstekende plek voor vogel observatie nu.', 'https://example.com/photos/vogelkijkhut-bourgoyen.jpg', 'verified', '2025-09-05 16:00:00'],
        ];

        foreach ($observations as $obs) {
            DB::table('observations')->insert([
                'user_id' => $obs[0],
                'coordinates' => DB::raw("ST_GeomFromText('POINT({$obs[1]} {$obs[2]})', 4326)"),
                'observation_text' => $obs[3],
                'photo_url' => $obs[4],
                'status' => $obs[5],
                'created_at' => $obs[6],
            ]);
        }
    }
}
