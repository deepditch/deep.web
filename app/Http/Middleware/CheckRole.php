<?php

namespace App\Http\Middleware;

use App\User;
use Auth;
use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     * @param string                   $role
     *
     * @return mixed
     */
    public function handle($request, Closure $next, string $role)
    {
        if (User::ADMIN_ROLE === $role && User::ADMIN_ROLE !== auth('api')->user()->role) {
            return response()->json([
                'error' => 'You are not authorized to perform this action.',
            ], 401);
        }

        if (User::ML_ROLE === $role && User::ML_ROLE !== auth('api')->user()->role) {
            return response()->json([
                'error' => 'You are not authorized to perform this action.',
            ], 401);
        }

        return $next($request);
    }
}
