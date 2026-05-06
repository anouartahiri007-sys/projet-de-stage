<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    Spatie\Browsershot\Browsershot::html('<h1>Test</h1>')->noSandbox()->pdf('test_output.pdf');
    echo 'SUCCESS';
} catch (\Exception $e) {
    echo 'ERROR: ' . $e->getMessage();
}
