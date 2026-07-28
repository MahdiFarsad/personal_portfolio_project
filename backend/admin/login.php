<?php
session_start();
require __DIR__ . '/../includes/db.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare('SELECT * FROM admin_users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['admin_id'] = $user['id'];
        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0E1420; color: #EDEFF2; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        form { background: #1A2332; padding: 2.5rem; border-radius: 4px; width: 320px; }
        h1 { font-size: 1.25rem; margin-bottom: 1.5rem; }
        label { display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8B93A7; margin-bottom: 0.4rem; }
        input { width: 100%; padding: 0.6rem 0.8rem; margin-bottom: 1.2rem; background: #0E1420; border: 1px solid #2A3548; color: #EDEFF2; border-radius: 3px; box-sizing: border-box; }
        button { width: 100%; padding: 0.7rem; background: #E8A33D; color: #0E1420; border: none; border-radius: 3px; font-weight: 600; cursor: pointer; }
        .error { color: #E8A33D; font-size: 0.85rem; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <form method="POST">
        <h1>Admin Login</h1>
        <?php if ($error): ?>
            <p class="error"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>
        <label>Username</label>
        <input type="text" name="username" required autofocus>
        <label>Password</label>
        <input type="password" name="password" required>
        <button type="submit">Log In</button>
    </form>
</body>
</html>
