<?php

namespace App\Services\Notification;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class NotificationService
{
    public function sendNotification($userId, $type, $title, $message, $data = [])
    {
        $notification = Notification::create([
            'user_id' => $userId,
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'data' => $data,
            'sent_at' => now()
        ]);

        // Send via different channels based on user preferences
        $this->sendViaChannels($notification);

        return $notification;
    }

    public function sendBulkNotification($userIds, $type, $title, $message, $data = [])
    {
        $notifications = [];

        foreach ($userIds as $userId) {
            $notifications[] = $this->sendNotification($userId, $type, $title, $message, $data);
        }

        return $notifications;
    }

    public function markAsRead($notificationId, $userId)
    {
        return Notification::where('id', $notificationId)
                          ->where('user_id', $userId)
                          ->update(['read_at' => now()]);
    }

    public function getUserNotifications($userId, $unreadOnly = false)
    {
        $query = Notification::where('user_id', $userId);

        if ($unreadOnly) {
            $query->whereNull('read_at');
        }

        return $query->orderBy('created_at', 'desc')->paginate(20);
    }

    private function sendViaChannels($notification)
    {
        $user = User::find($notification->user_id);

        // Send email notification
        if ($user->email_notifications ?? true) {
            $this->sendEmailNotification($user, $notification);
        }

        // Send push notification
        if ($user->push_notifications ?? true) {
            $this->sendPushNotification($user, $notification);
        }

        // Send SMS for critical notifications
        if ($notification->type === 'weather_alert' && ($user->sms_notifications ?? false)) {
            $this->sendSMSNotification($user, $notification);
        }
    }

    private function sendEmailNotification($user, $notification)
    {
        // Email notification logic here
        // Mail::to($user->email)->send(new NotificationEmail($notification));
    }

    private function sendPushNotification($user, $notification)
    {
        // Push notification logic here
        // Use services like Firebase Cloud Messaging
    }

    private function sendSMSNotification($user, $notification)
    {
        // SMS notification logic here
        // Use services like Twilio or local SMS gateway
    }
}
