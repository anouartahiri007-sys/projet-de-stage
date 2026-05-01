<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Auth::user()->notifications()->take(10)->get();
        
        return response()->json($notifications->map(function ($n) {
            return [
                'id' => $n->id,
                'type' => $n->data['type'] ?? 'info',
                'title' => $n->data['title'] ?? 'Notification',
                'desc' => $n->data['message'] ?? '',
                'time' => $n->created_at->diffForHumans(),
                'read' => $n->read_at !== null,
            ];
        }));
    }

    public function markAsRead($id)
    {
        $notification = Auth::user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return response()->json(['message' => 'Notification marquée comme lue.']);
    }

    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();
        return response()->json(['message' => 'Toutes les notifications marquées comme lues.']);
    }

    public function destroy($id)
    {
        $notification = Auth::user()->notifications()->findOrFail($id);
        $notification->delete();
        return response()->json(['message' => 'Notification supprimée.']);
    }
}
