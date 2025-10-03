<?php
// Simple health check that works without Laravel framework
http_response_code(200);
header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'timestamp' => date('c'),
    'server' => 'Railway'
]);
exit;

