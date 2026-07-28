<?php
require __DIR__ . '/../includes/db.php';
$config = require __DIR__ . '/../includes/config.php';

// --- CORS (only needed for local dev where frontend runs on a different port) ---
$allowedOrigin = $config['dev_allowed_origin'] ?? '';
if (!empty($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// --- Honeypot: real users never fill this hidden field, bots usually do ---
if (!empty($input['website'])) {
    // Silently pretend success so bots don't learn the field is a honeypot
    echo json_encode(['success' => true]);
    exit;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');
$formType = trim($input['formType'] ?? 'contact');
$projectId = !empty($input['projectId']) ? (int) $input['projectId'] : null;

// --- Basic validation ---
$errors = [];
if ($name === '' || strlen($name) > 255) {
    $errors[] = 'Name is required.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email is required.';
}
if ($message === '' || strlen($message) > 5000) {
    $errors[] = 'Message is required.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => implode(' ', $errors)]);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// --- Basic rate limiting: block if same IP submitted in the last 60 seconds ---
$stmt = $pdo->prepare(
    'SELECT COUNT(*) FROM submissions WHERE ip_address = ? AND created_at > (NOW() - INTERVAL 60 SECOND)'
);
$stmt->execute([$ip]);
if ($stmt->fetchColumn() > 0) {
    http_response_code(429);
    echo json_encode(['error' => 'Please wait a moment before submitting again.']);
    exit;
}

// --- Insert submission ---
$stmt = $pdo->prepare(
    'INSERT INTO submissions (form_type, name, email, message, project_id, ip_address) VALUES (?, ?, ?, ?, ?, ?)'
);
$stmt->execute([$formType, $name, $email, $message, $projectId, $ip]);

// --- Email notification (basic mail(), swap for PHPMailer/SMTP if delivery is unreliable) ---
$to = $config['notify_email'];
$subject = 'New portfolio form submission';
$body = "Type: $formType\nName: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost');
@mail($to, $subject, $body, $headers);

echo json_encode(['success' => true]);
