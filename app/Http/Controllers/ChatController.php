<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function viewMessage()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userType = $user->usertype;

        if ($userType === 'admin') {
            return Inertia::render('Admin/Chats/Chat');
        } else {
            return Inertia::render('User/Chats/Chat');
        }
    }
}
