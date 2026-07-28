<?php
require __DIR__ . '/../includes/db.php';
$config = require __DIR__ . '/../includes/config.php';

$allowedOrigin = $config['dev_allowed_origin'] ?? '';
if (!empty($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
}
header('Content-Type: application/json');

$stmt = $pdo->query('SELECT id, title, slug, excerpt, published_at FROM posts ORDER BY published_at DESC');
echo json_encode($stmt->fetchAll());
