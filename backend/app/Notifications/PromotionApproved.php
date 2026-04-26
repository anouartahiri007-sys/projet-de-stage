<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PromotionApproved extends Notification implements ShouldQueue
{
    use Queueable;

    protected $details;

    public function __construct($details)
    {
        $this->details = $details;
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Promotion Approved - HRIS')
                    ->line("Hello {$this->details['employee_name']},")
                    ->line("We are pleased to inform you that your promotion to {$this->details['to_grade']} has been officially approved.")
                    ->action('View Profile', url('/dashboard/profile'))
                    ->line('Congratulations on this achievement!');
    }

    public function toArray($notifiable): array
    {
        return [
            'title' => 'Promotion Approved',
            'message' => "Your promotion to {$this->details['to_grade']} is now active.",
            'action_url' => '/dashboard/profile'
        ];
    }
}
