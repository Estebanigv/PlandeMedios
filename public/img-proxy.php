<?php
$url = $_GET['url'] ?? '';

if (!preg_match('#^https://www\.tourinnovacion\.cl/wp-content/#', $url)) {
    http_response_code(403);
    exit;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; PlanDeMedios/1.0)');
$data = curl_exec($ch);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($data === false || $httpCode >= 400) {
    http_response_code(502);
    exit;
}

header('Content-Type: ' . $contentType);
header('Cache-Control: public, max-age=86400');
header('Access-Control-Allow-Origin: *');
echo $data;
