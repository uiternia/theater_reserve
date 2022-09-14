<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Event;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function events()
    {
        return $this->belongsToMany(Event::class, 'reserves')
            ->withPivot('id', 'number_of_people', 'canceled_date', 'visit', 'price', 'introduction');
    }

    public function scopeSearchUsers($query, $input = null)
    {
        if (!empty($input)) {
            if (User::where('name', 'like', $input . '%')
                ->orWhere('email', 'like', $input . '%')->exists()
            ) {
                return $query->where('name', 'like', $input . '%')
                    ->orWhere('email', 'like', $input . '%');
            }
        }
    }
}
