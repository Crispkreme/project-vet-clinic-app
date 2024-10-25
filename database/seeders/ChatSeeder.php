<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $chats = [
            [
                'sender_id'     => 6,
                'receiver_id'   => 1,
                'message'       => 'Hi Doctor, I need your help with my pet.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 1,
                'receiver_id'   => 6,
                'message'       => 'Hello! What seems to be the problem with your pet?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 1,
                'message'       => 'My dog has been coughing a lot lately, and it seems to be getting worse.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 1,
                'receiver_id'   => 6,
                'message'       => 'I see. Has your dog been eating and drinking normally?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 1,
                'message'       => 'Yes, but he seems a bit tired and less active than usual.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 1,
                'receiver_id'   => 6,
                'message'       => 'It could be a respiratory issue. Has he been in contact with any other animals?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 1,
                'message'       => 'Not really, we’ve just been on our usual walks. Do you think it’s something serious?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 1,
                'receiver_id'   => 6,
                'message'       => 'It could be something like kennel cough or allergies. I recommend bringing him in for a checkup.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 1,
                'message'       => 'Alright, I’ll schedule an appointment. Thanks for your advice!',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 1,
                'receiver_id'   => 6,
                'message'       => 'You’re welcome! Hope to see your pet soon.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 2,
                'message'       => 'Hi Doctor, I wanted to follow up on the appointment. Can we schedule it for tomorrow afternoon?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 2,
                'receiver_id'   => 6,
                'message'       => 'Let me check my schedule. Yes, tomorrow afternoon at 2 PM works for me.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 2,
                'message'       => 'Perfect! I’ll bring my dog in. Thanks again!',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 2,
                'receiver_id'   => 6,
                'message'       => 'You’re welcome! See you tomorrow at 2 PM.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 3,
                'message'       => 'Hi Doctor, I wanted to follow up on the appointment. Can we schedule it for tomorrow afternoon?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 3,
                'receiver_id'   => 6,
                'message'       => 'Let me check my schedule. Yes, tomorrow afternoon at 2 PM works for me.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 3,
                'message'       => 'Perfect! I’ll bring my dog in. Thanks again!',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 3,
                'receiver_id'   => 6,
                'message'       => 'You’re welcome! See you tomorrow at 2 PM.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 3,
                'message'       => 'By the way, Doctor, could you give me an idea of the costs for hospitalization if it’s needed?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 3,
                'receiver_id'   => 6,
                'message'       => 'Certainly. The initial examination and overnight stay start at around $150, depending on the treatment required.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 3,
                'message'       => 'I see. And what about if more intensive care is needed?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 3,
                'receiver_id'   => 6,
                'message'       => 'If your pet requires intensive monitoring or specialized treatment, the cost could range from $200 to $400 per day.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 3,
                'message'       => 'Alright, that’s good to know. Is there a deposit required?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 3,
                'receiver_id'   => 6,
                'message'       => 'Yes, we do require a deposit before hospitalization. The exact amount would depend on the expected duration of stay and treatments.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 3,
                'message'       => 'Thank you for explaining. I’ll be prepared if hospitalization is necessary.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 3,
                'receiver_id'   => 6,
                'message'       => 'You’re welcome! I’ll go over everything in more detail if it comes to that. See you tomorrow.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 4,
                'message'       => 'By the way, Doctor, aside from hospitalization, what other services do you offer for pets?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 4,
                'receiver_id'   => 6,
                'message'       => 'Great question! We offer general check-ups, vaccinations, grooming, and dental care for pets.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 4,
                'message'       => 'Oh, that sounds good! How often should my dog come in for dental care?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 4,
                'receiver_id'   => 6,
                'message'       => 'For dental care, once every 6 to 12 months is recommended to keep their teeth and gums healthy.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 4,
                'message'       => 'Good to know! And about grooming – do you handle that as well?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 4,
                'receiver_id'   => 6,
                'message'       => 'Yes, we provide grooming services, including bathing, nail trimming, and fur trimming. It’s helpful for their hygiene and overall health.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 4,
                'message'       => 'Perfect! Thanks for explaining. I’ll definitely consider these services.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 4,
                'receiver_id'   => 6,
                'message'       => 'You’re very welcome! I’ll be happy to discuss these further during your visit tomorrow.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 5,
                'message'       => 'Doctor, I want to make sure my dog stays as healthy as possible. Can you give me some tips?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 5,
                'receiver_id'   => 6,
                'message'       => 'Of course! A balanced diet is key. I recommend high-quality dog food with proteins, healthy fats, and a variety of vitamins and minerals.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 5,
                'message'       => 'Is there anything specific I should add or avoid in their diet?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 5,
                'receiver_id'   => 6,
                'message'       => 'Yes, avoid foods with artificial additives or too much filler. Adding a mix of lean meats, vegetables, and healthy grains can be beneficial.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 5,
                'message'       => 'Sounds good. Are there any vitamins or supplements I should consider?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 5,
                'receiver_id'   => 6,
                'message'       => 'A multivitamin for dogs is usually helpful, especially if they’re older. Omega-3 supplements are also great for skin and joint health.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 5,
                'message'       => 'Great! And is there anything else I should be doing to keep my dog healthy?',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 5,
                'receiver_id'   => 6,
                'message'       => 'Daily exercise and mental stimulation are essential. Regular check-ups and vaccinations will also help keep them in top shape.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 6,
                'receiver_id'   => 5,
                'message'       => 'Thank you so much! This is all really helpful advice.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'sender_id'     => 5,
                'receiver_id'   => 6,
                'message'       => 'You’re very welcome! We’ll go over this again tomorrow, and I can answer any other questions you may have.',
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ];
        
        DB::table('chats')->insert($chats);
    }
}
