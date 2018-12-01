<?php

namespace App\Http\Middleware;

use App\ApiToken;
use Auth;
use Closure;

use Illuminate\Support\Facades\Log;

class CheckToken
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
    public function handle($request, Closure $next)
    {
        $payload = auth('api')->payload();

        if (! $payload['token_id'] || ApiToken::find($payload['token_id']) !== null) {
            return $next($request);
        }

        return response()->json([
            'error' => 'You are not authorized to perform this action.',
        ], 401);
    }
}
