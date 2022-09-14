<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReserveMail extends Mailable
{
    use Queueable, SerializesModels;

    public $event;
    public $name;
    public $email;

    public function __construct($event, $name, $email, $number_of_people, $status)
    {
        $this->event = $event;
        $this->name = $name;
        $this->email = $email;
        $this->number_of_people = $number_of_people;
        $this->status = $status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = "";
        if ($this->status === 'create') {
            $subject = '予約が完了しました';
        } elseif ($this->status === 'update') {
            $subject = '予約を変更しました。';
        } else {
            $subject = '予約をキャンセルしました';
        }
        return $this->view('emails.reserve')
            ->subject($subject)
            ->with([
                'name' => $this->name,
                'event' => $this->event,
                'number_of_people' => $this->number_of_people,
                'status' => $this->status,
            ]);
    }
}
