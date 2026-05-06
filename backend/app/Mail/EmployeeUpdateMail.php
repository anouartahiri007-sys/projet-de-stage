<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmployeeUpdateMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $newEmail;
    public $newPassword;

    public function __construct($user, $newEmail, $newPassword)
    {
        $this->user = $user;
        $this->newEmail = $newEmail;
        $this->newPassword = $newPassword;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Mise à jour de vos identifiants e-RH',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.employee_update',
        );
    }
}
