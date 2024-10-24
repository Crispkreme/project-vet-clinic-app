<?php

namespace App\Http\Controllers;

use App\Contracts\MessageContract;
use App\Contracts\UserContract;
use App\Events\MessageSentEvent;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Reverb\Attributes\On;

class ChatController extends Controller
{
    protected $userContract;
    protected $messageContract;

    public function __construct(
        UserContract $userContract,
        MessageContract $messageContract,
    ) {
        $this->userContract = $userContract;
        $this->messageContract = $messageContract;
    }

    public function viewMessage($id)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userType = $user->usertype;
        $user = $this->userContract->getUserByUserId($id);
        $doctors = $this->userContract->getAllDoctor();
        $owners = $this->userContract->getAllOwner();

        if ($userType === 'admin') {
            return Inertia::render('Admin/Chats/Chat', [
               'user' => $user, 
               'owners' => $owners 
            ]);
        } else {
            return Inertia::render('User/Chats/Chat', [
                'user' => $user, 
                'doctors' => $doctors, 
            ]);
        }
    }

    public function message(Request $request)
    {
        dd($request);
    }

    public function viewDoctorMessage($id)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

        $sender_id = $user->id;
        $receiver_id = intval($id);

        $userDetails = $this->userContract->getUserByUserId($id);
        $doctors = $this->userContract->getAllDoctor();
        $messages = $this->messageContract->getAllMessages($sender_id, $receiver_id);

        $sentMessages = [];

        if ($messages) {
            foreach ($messages as $message) {
                $sentMessages[] = $this->messageContract->chatMessage($message);
            }
        }

        return Inertia::render('User/Chats/Message', [
            'user' => $userDetails,
            'doctors' => $doctors,
            'sentMessages' => $sentMessages,
        ]);
    }

    public function viewOwnerMessage($id)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

        $sender_id = $user->id;
        $receiver_id = intval($id);

        $userDetails = $this->userContract->getUserByUserId($id);
        $owners = $this->userContract->getAllOwner();
        $messages = $this->messageContract->getAllMessages($sender_id, $receiver_id);

        $sentMessages = [];

        if ($messages) {
            foreach ($messages as $message) {
                $sentMessages[] = $this->messageContract->chatMessage($message);
            }
        }

        return Inertia::render('Admin/Chats/Message', [
            'user' => $userDetails,
            'owners' => $owners,
            'sentMessages' => $sentMessages,
        ]);
    }

    public function sentMessage(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        DB::beginTransaction();

        $validated = $request->validate([
            'sender_id' => 'nullable|exists:users,id',
            'receiver_id' => 'nullable|exists:users,id',
            'message' => 'required|string|max:500',
        ]);

        try {
            
            $validated['sender_id'] = $user->id;
            $validated['receiver_id'] = $id;
            $validated['message'] = $request->input('message');

            $message = $this->messageContract->sentMessage($validated);

            broadcast(new MessageSentEvent($message))->toOthers();
            
            DB::commit();

            Session::flash('success', 'Message sent!');
            return redirect()->back();

        } catch (Exception $e) {
            Log::error('Error during sentMessage: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollback();

            Session::flash('error', 'An error occurred during sentMessage.');
            return redirect()->back();
        }
    }

    // #[On('echo-private:hello-pet-channel.{sender_id},MessageSentEvent')]
    // public function listenForMessage($event)
    // {
    //     dd($event);
    // }
}
