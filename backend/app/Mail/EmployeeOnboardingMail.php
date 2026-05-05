<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;

class EmployeeOnboardingMail extends Mailable
{
    use Queueable, SerializesModels;

    public $fonctionnaire;
    public $user;
    public $password;
    public $pdfPath;

    /**
     * Create a new message instance.
     */
    public function __construct($fonctionnaire, $user, $password, $pdfPath)
    {
        $this->fonctionnaire = $fonctionnaire;
        $this->user = $user;
        $this->password = $password;
        $this->pdfPath = $pdfPath;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'مرحباً بك في جماعة العرائش - بيانات الولوج الخاصة بك',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.employee_onboarding',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromPath($this->pdfPath)
                ->as('Fiche_Installation.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
