<?php
require __DIR__ . '/../includes/db.php';
$config = require __DIR__ . '/../includes/config.php';

$allowedOrigin = $config['dev_allowed_origin'] ?? '';
if (!empty($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
}
header('Content-Type: application/json');

$status = $_GET['status'] ?? null;

if ($status) {
    $stmt = $pdo->prepare('SELECT * FROM projects WHERE status = ? ORDER BY sort_order ASC');
    $stmt->execute([$status]);
} else {
    $stmt = $pdo->query('SELECT * FROM projects ORDER BY sort_order ASC');
}

$projects = $stmt->fetchAll();

// tech_stack is stored as a comma-separated string, split it into an array for the frontend
foreach ($projects as &$p) {
    $p['tech_stack'] = $p['tech_stack'] ? explode(',', $p['tech_stack']) : [];
}

echo json_encode($projects);
