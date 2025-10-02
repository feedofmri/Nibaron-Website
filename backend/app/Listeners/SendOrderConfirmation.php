<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use App\Mail\OrderConfirmation;
use App\Services\Notification\NotificationService;
use Illuminate\Support\Facades\Mail;

class SendOrderConfirmation
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function handle(OrderCreated $event)
    {
        // Send email confirmation
        Mail::to($event->order->user->email)->send(new OrderConfirmation($event->order));

        // Send notification
        $this->notificationService->sendNotification(
            $event->order->user_id,
            'order_confirmation',
            'Order Confirmed',
            "Your order #{$event->order->order_number} has been confirmed.",
            ['order_id' => $event->order->id]
        );
    }
}
