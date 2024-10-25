<?php

namespace App\Repositories;

use App\Contracts\MessageContract;
use App\Models\Message;
use Exception;
use Illuminate\Support\Facades\Log;

class MessageRepository implements MessageContract
{

    protected $model;

    public function __construct(Message $model)
    {
        $this->model = $model;
    }

    public function sentMessage($data)
    {
        try {

            return $this->model->create(
                [
                    'sender_id' => $data['sender_id'],
                    'receiver_id' => $data['receiver_id'],
                    'message' => $data['message'],
                ]
            );

        } catch (Exception $e) {

            Log::error('Error sentMessage', ['error' => $e->getMessage()]);

        }
    }

    public function getAllMessages($sender_id, $receiver_id) 
    {
        try {
            return $this->model->where(function($query) use ($sender_id, $receiver_id) {
                $query->where('sender_id', $sender_id)
                    ->where('receiver_id', $receiver_id);
            })->orWhere(function($query) use ($sender_id, $receiver_id) {
                $query->where('sender_id', $receiver_id)
                    ->where('receiver_id', $sender_id);
            })->with('sender:id,name', 'receiver:id,name')->get();

        } catch (Exception $e) {
            Log::error('Error getAllMessages', ['error' => $e->getMessage()]);
            return null;
        }
    }

    public function chatMessage($message)
    {
        return [
            'id' => $message->id,
            'message' => $message->message,
            'sender' => $message->sender->name,
            'receiver' => $message->receiver->name,
        ];
    }
}
