<?php
require __DIR__ . '/../includes/db.php';
$config = require __DIR__ . '/../includes/config.php';

$allowedOrigin = $config['dev_allowed_origin'] ?? '';
if (!empty($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
}
header('Content-Type: application/json');

$slug = $_GET['slug'] ?? '';

if (!$slug) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing slug parameter.']);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM posts WHERE slug = ? LIMIT 1');
$stmt->execute([$slug]);
$post = $stmt->fetch();

if (!$post) {
    http_response_code(404);
    echo json_encode(['error' => 'Post not found.']);
    exit;
}

echo json_encode($post);
