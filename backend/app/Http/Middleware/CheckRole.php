<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!$request->user()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        if (!in_array($request->user()->user_type, $roles)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Insufficient permissions'
            ], 403);
        }

        return $next($request);
    }
}
