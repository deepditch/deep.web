<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\User;
use Illuminate\Support\Facades\Log;

class CheckRole
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param string $role
     * @return mixed
     */
    public function handle($request, Closure $next, string $role)
    {
        if ($role === User::ADMIN_ROLE && auth('api')->user()->role !== User::ADMIN_ROLE) {
            return response()->json([
                'error' => 'You are not authorized to perform this action.'
            ], 401);
        }

        return $next($request);
    }
}
