<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;
use App\Models\Observation;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get users by role
        $admin = User::whereHas('role', function($q) {
            $q->where('role_name', 'Admin');
        })->first();
        
        $rangers = User::whereHas('role', function($q) {
            $q->where('role_name', 'Ranger');
        })->get();
        
        $visitors = User::whereHas('role', function($q) {
            $q->where('role_name', 'Visitor');
        })->get();

        // Get some observations to comment on
        $observations = Observation::limit(10)->get();

        $comments = [
            // Comments on first observation
            [
                'observation_id' => $observations[0]->id,
                'user_id' => $rangers[0]->id,
                'body' => 'Dit is een bevestigde waarneming van een reebok. Gezien in de ochtend.',
                'is_public' => true,
            ],
            [
                'observation_id' => $observations[0]->id,
                'user_id' => $admin->id,
                'body' => 'Verifiëren - lijkt authentiek gebaseerd op de foto en locatie.',
                'is_public' => false,
            ],
            [
                'observation_id' => $observations[0]->id,
                'user_id' => $visitors[0]->id,
                'body' => 'Prachtige waarneming! Bedankt voor het delen.',
                'is_public' => true,
            ],

            // Comments on second observation
            [
                'observation_id' => $observations[1]->id,
                'user_id' => $rangers[1]->id,
                'body' => 'Interessante vondst. Kunnen we meer details krijgen over het tijdstip?',
                'is_public' => true,
            ],
            [
                'observation_id' => $observations[1]->id,
                'user_id' => $visitors[1]->id,
                'body' => 'Ik heb ook iets soortgelijks gezien in dit gebied vorige week!',
                'is_public' => true,
            ],

            // Comments on third observation
            [
                'observation_id' => $observations[2]->id,
                'user_id' => $admin->id,
                'body' => 'Opgelet: dit gebied staat onder speciaal toezicht. Privé notitie voor rangers.',
                'is_public' => false,
            ],
            [
                'observation_id' => $observations[2]->id,
                'user_id' => $rangers[0]->id,
                'body' => 'Bevestigd. Status bijgewerkt naar geverifieerd.',
                'is_public' => true,
            ],

            // Comments on fourth observation
            [
                'observation_id' => $observations[3]->id,
                'user_id' => $visitors[2]->id,
                'body' => 'Geweldige foto! Welke camera heb je gebruikt?',
                'is_public' => true,
            ],
            [
                'observation_id' => $observations[3]->id,
                'user_id' => $rangers[1]->id,
                'body' => 'Deze soort is zeldzaam in dit gebied. Goed werk!',
                'is_public' => true,
            ],

            // Comments on fifth observation
            [
                'observation_id' => $observations[4]->id,
                'user_id' => $admin->id,
                'body' => 'Mogelijke vervolgactie vereist - ranger moet ter plaatse gaan.',
                'is_public' => false,
            ],
            [
                'observation_id' => $observations[4]->id,
                'user_id' => $rangers[0]->id,
                'body' => 'Ik zal dit gebied morgen bezoeken voor nader onderzoek.',
                'is_public' => false,
            ],
            [
                'observation_id' => $observations[4]->id,
                'user_id' => $visitors[0]->id,
                'body' => 'Hopelijk kan dit helpen bij het onderzoek!',
                'is_public' => true,
            ],

            // Comments on sixth observation
            [
                'observation_id' => $observations[5]->id,
                'user_id' => $rangers[1]->id,
                'body' => 'Uitstekende documentatie. Dit helpt ons om patronen te identificeren.',
                'is_public' => true,
            ],

            // Comments on seventh observation
            [
                'observation_id' => $observations[6]->id,
                'user_id' => $visitors[1]->id,
                'body' => 'Ik heb iets vergelijkbaars gezien maar geen foto kunnen maken.',
                'is_public' => true,
            ],
            [
                'observation_id' => $observations[6]->id,
                'user_id' => $admin->id,
                'body' => 'Coördinaten verifiëren - lijkt buiten het normale bereik.',
                'is_public' => false,
            ],

            // Comments on eighth observation
            [
                'observation_id' => $observations[7]->id,
                'user_id' => $rangers[0]->id,
                'body' => 'Bevestigd en toegevoegd aan het maandelijkse rapport.',
                'is_public' => true,
            ],
            [
                'observation_id' => $observations[7]->id,
                'user_id' => $visitors[2]->id,
                'body' => 'Fascinerend! Bedankt voor je bijdrage aan de natuur bescherming.',
                'is_public' => true,
            ],

            // Comments on ninth observation
            [
                'observation_id' => $observations[8]->id,
                'user_id' => $rangers[1]->id,
                'body' => 'Belangrijk: dit gebied moet extra bewaking krijgen.',
                'is_public' => false,
            ],

            // Comments on tenth observation
            [
                'observation_id' => $observations[9]->id,
                'user_id' => $visitors[0]->id,
                'body' => 'Zo mooi om dit te zien in ons bos!',
                'is_public' => true,
            ],
            [
                'observation_id' => $observations[9]->id,
                'user_id' => $admin->id,
                'body' => 'Goedgekeurd voor publicatie op de website.',
                'is_public' => true,
            ],
        ];

        foreach ($comments as $comment) {
            Comment::create($comment);
        }

        $this->command->info('Comments seeded successfully!');
    }
}
