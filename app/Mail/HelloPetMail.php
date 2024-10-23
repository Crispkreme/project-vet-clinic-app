<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class HelloPetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $emailTo;
    public $customMessage;

    public function __construct($emailTo, $customMessage)
    {
        $this->emailTo = $emailTo;
        $this->customMessage = $customMessage;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Hello Pet Mail',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mails.hello-pet-mail',
            with: [
                'emailTo' => $this->emailTo,
                'customMessage' => $this->customMessage,  // Use customMessage instead of message
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
