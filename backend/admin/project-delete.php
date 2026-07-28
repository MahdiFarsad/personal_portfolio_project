<?php
require __DIR__ . '/../includes/auth.php';
require_login();
require __DIR__ . '/../includes/db.php';

$id = $_GET['id'] ?? null;

if ($id) {
    $stmt = $pdo->prepare('DELETE FROM projects WHERE id = ?');
    $stmt->execute([$id]);
}

header('Location: dashboard.php');
exit;
