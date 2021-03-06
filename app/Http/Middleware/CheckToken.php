<?php

namespace App\Http\Middleware;

use App\ApiToken;
use Auth;
use Closure;

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
        if (!$request->header('Authorization')) {
            return $next($request);
        }

        $payload = auth('api')->payload();

        if (!isset($payload['token_id'])) {
            return $next($request);
        } elseif (null !== ApiToken::find($payload['token_id'])) {
            return $next($request);
        }

        return response()->json([
            'error' => 'You are not authorized to perform this action.',
        ], 401);
    }
}
