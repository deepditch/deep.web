<?php

namespace App\Http\Middleware;

use App\ApiToken;
use Auth;
use Closure;
use \Lcobucci\JWT\Parser;
use Illuminate\Support\Facades\Log;

class RefreshToken extends \Tymon\JWTAuth\Http\Middleware\RefreshToken
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
        if (! $request->header('Authorization')) {
            return $next($request);
        }
Log::debug('erw');
        $token = (new Parser())->parse((string) $request->header('Authorization'));

        if (! $token->getClaim('token_id')) {
            return parent::handle($request, $next($request));
        }

        return $next($request);
    }
}
