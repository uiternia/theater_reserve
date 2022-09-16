<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            [
                'name' => 'デリシャス',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-05 10:00:00',
                'end_date' => '2023-09-05 11:00:00',
                'is_visible' => true
            ],
            [
                'name' => 'デリシャス',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-06 10:00:00',
                'end_date' => '2023-09-06 11:00:00',
                'is_visible' => true
            ],
            [
                'name' => 'エクセレント',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-07 10:00:00',
                'end_date' => '2023-09-07 11:00:00',
                'is_visible' => true
            ],
            [
                'name' => 'エクセレント',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-08 10:00:00',
                'end_date' => '2023-09-08 11:00:00',
                'is_visible' => true
            ],
            [
                'name' => 'エクセレント',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-09 10:00:00',
                'end_date' => '2023-09-09 11:00:00',
                'is_visible' => true
            ],
            [
                'name' => 'アメイジング',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-10 10:00:00',
                'end_date' => '2023-09-010 11:00:00',
                'is_visible' => true
            ],
            [
                'name' => 'アメイジング',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-011 10:00:00',
                'end_date' => '2023-09-011 11:00:00',
                'is_visible' => true
            ],
            [
                'name' => 'アメイジング',
                'information' => 'テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。テスト説明です。',
                'max_people' => 500,
                'image_id' => 1,
                'start_date' => '2023-09-12 10:00:00',
                'end_date' => '2023-09-12 11:00:00',
                'is_visible' => true
            ],
        ]);
    }
}
