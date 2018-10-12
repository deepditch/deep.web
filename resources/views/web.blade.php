<!doctype html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('styles/vendor.css')}}">
        <link rel="stylesheet" href="{{ asset('styles/main.css')}}">
        <link rel="stylesheet" href="{{ asset('js/app.css')}}">
    </head>
    <body>
        <div id="react-container"></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
