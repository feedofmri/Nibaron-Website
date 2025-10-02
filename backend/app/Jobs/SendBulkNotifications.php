<?php

namespace App\Jobs;

use App\Services\Notification\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendBulkNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userIds;
    protected $type;
    protected $title;
    protected $message;
    protected $data;

    public function __construct($userIds, $type, $title, $message, $data = [])
    {
        $this->userIds = $userIds;
        $this->type = $type;
        $this->title = $title;
        $this->message = $message;
        $this->data = $data;
    }

    public function handle(NotificationService $notificationService)
    {
        $notificationService->sendBulkNotification(
            $this->userIds,
            $this->type,
            $this->title,
            $this->message,
            $this->data
        );
    }
}
