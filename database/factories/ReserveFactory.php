<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Event;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reserve>
 */
class ReserveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => rand(1, User::count()),
            'event_id' => rand(1, Event::count()),
            'number_of_people' => $this->faker->numberBetween(1, 2),
            'price' => 3000,
            'visit' => true,
            'introduction' => false,
            'canceled_date' => null,
        ];
    }
}
