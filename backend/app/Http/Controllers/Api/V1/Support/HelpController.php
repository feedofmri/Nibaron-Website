<?php

namespace App\Http\Controllers\Api\V1\Support;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class HelpController extends Controller
{
    public function getFAQs(): JsonResponse
    {
        $faqs = [
            [
                'id' => 1,
                'question' => 'How do I create a pre-order?',
                'answer' => 'Navigate to the product you want and click "Create Pre-Order". Fill in your requirements including quantity, expected price, and delivery date.',
                'category' => 'pre-orders'
            ],
            [
                'id' => 2,
                'question' => 'What payment methods do you accept?',
                'answer' => 'We accept bKash, Nagad, Rocket, bank transfers, and cash on delivery for verified buyers.',
                'category' => 'payments'
            ],
            [
                'id' => 3,
                'question' => 'How can I track my orders?',
                'answer' => 'Go to "My Orders" section in your dashboard to see real-time updates on all your orders.',
                'category' => 'orders'
            ],
            [
                'id' => 4,
                'question' => 'How do I get verified as a buyer?',
                'answer' => 'Submit your business registration documents through your profile settings. Our team will review within 2-3 business days.',
                'category' => 'verification'
            ],
            [
                'id' => 5,
                'question' => 'Can I cancel my pre-order?',
                'answer' => 'Yes, you can cancel pre-orders that are in "pending" or "confirmed" status. Cancelled orders cannot be recovered.',
                'category' => 'pre-orders'
            ]
        ];

        return response()->json([
            'status' => 'success',
            'data' => $faqs
        ]);
    }

    public function createTicket(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'subject' => 'required|string|max:255',
            'category' => 'required|in:technical,billing,general,complaint,feature_request',
            'priority' => 'required|in:low,medium,high,urgent',
            'message' => 'required|string|min:10',
            'attachments' => 'sometimes|array|max:5',
            'attachments.*' => 'file|mimes:jpeg,png,pdf,doc,docx|max:5120'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('support-attachments', 'public');
                $attachments[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'size' => $file->getSize()
                ];
            }
        }

        $ticket = SupportTicket::create([
            'user_id' => $request->user()->id,
            'ticket_number' => 'TKT-' . strtoupper(uniqid()),
            'subject' => $request->subject,
            'category' => $request->category,
            'priority' => $request->priority,
            'message' => $request->message,
            'status' => 'open',
            'attachments' => $attachments
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Support ticket created successfully',
            'data' => $ticket
        ], 201);
    }

    public function getTickets(Request $request): JsonResponse
    {
        $tickets = SupportTicket::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $tickets
        ]);
    }

    public function getTicket($id): JsonResponse
    {
        $ticket = SupportTicket::where('user_id', request()->user()->id)
            ->with('responses')
            ->find($id);

        if (!$ticket) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ticket not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $ticket
        ]);
    }

    public function getContactInfo(): JsonResponse
    {
        $contactInfo = [
            'phone' => '+880-1700-000000',
            'email' => 'support@nibaron.com',
            'address' => 'House 123, Road 12, Gulshan-1, Dhaka-1212',
            'business_hours' => [
                'saturday_thursday' => '9:00 AM - 6:00 PM',
                'friday' => '2:00 PM - 6:00 PM'
            ],
            'emergency_contact' => '+880-1800-000000'
        ];

        return response()->json([
            'status' => 'success',
            'data' => $contactInfo
        ]);
    }
}
