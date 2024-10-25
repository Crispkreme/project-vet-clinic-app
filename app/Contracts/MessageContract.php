<?php

namespace App\Contracts;

interface MessageContract {

    public function sentMessage($data);
    public function getAllMessages($sender_id, $receiver_id);
    public function chatMessage($message);
}
