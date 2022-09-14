<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReserveMail;



class SendMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $event;
    public $name;
    public $email;
    public $number_of_people;
    public $status;

    public function __construct($event, $name, $email, $number_of_people, $status)
    {
        $this->event = $event;
        $this->name = $name;
        $this->email = $email;
        $this->number_of_people = $number_of_people;
        $this->status = $status;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->email)->send(new ReserveMail($this->event, $this->name, $this->email, $this->number_of_people, $this->status));
    }
}
