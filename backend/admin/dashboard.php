<?php
require __DIR__ . '/../includes/auth.php';
require_login();
require __DIR__ . '/../includes/db.php';

$projects = $pdo->query('SELECT * FROM projects ORDER BY sort_order ASC')->fetchAll();
$posts = $pdo->query('SELECT * FROM posts ORDER BY published_at DESC')->fetchAll();
$newSubmissions = $pdo->query("SELECT COUNT(*) FROM submissions WHERE status = 'new'")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0E1420; color: #EDEFF2; margin: 0; padding: 2rem; }
        a { color: #E8A33D; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .card { background: #1A2332; border-radius: 4px; padding: 1.5rem; margin-bottom: 2rem; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 0.6rem; border-bottom: 1px solid #2A3548; font-size: 0.9rem; }
        th { color: #8B93A7; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .badge { font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 3px; background: #3FA796; color: #0E1420; }
        .badge.upcoming { background: #E8A33D; }
        .btn { display: inline-block; background: #E8A33D; color: #0E1420; padding: 0.5rem 1rem; border-radius: 3px; font-size: 0.85rem; font-weight: 600; }
    </style>
</head>
<body>
    <div class="topbar">
        <h1>Dashboard</h1>
        <div>
            <a href="submissions.php">Submissions (<?= $newSubmissions ?> new)</a>
            &nbsp;|&nbsp;
            <a href="logout.php">Log Out</a>
        </div>
    </div>

    <div class="card">
        <div class="topbar">
            <h2 style="margin:0; font-size:1.1rem;">Projects</h2>
            <a class="btn" href="project-form.php">+ Add Project</a>
        </div>
        <table>
            <tr><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr>
            <?php foreach ($projects as $p): ?>
            <tr>
                <td><?= htmlspecialchars($p['title']) ?></td>
                <td><?= htmlspecialchars($p['category']) ?></td>
                <td><span class="badge <?= $p['status'] === 'upcoming' ? 'upcoming' : '' ?>"><?= $p['status'] ?></span></td>
                <td>
                    <a href="project-form.php?id=<?= $p['id'] ?>">Edit</a>
                    &nbsp;|&nbsp;
                    <a href="project-delete.php?id=<?= $p['id'] ?>" onclick="return confirm('Delete this project?')">Delete</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <div class="card">
        <div class="topbar">
            <h2 style="margin:0; font-size:1.1rem;">Blog Posts</h2>
            <a class="btn" href="post-form.php">+ Add Post</a>
        </div>
        <table>
            <tr><th>Title</th><th>Published</th><th>Actions</th></tr>
            <?php foreach ($posts as $p): ?>
            <tr>
                <td><?= htmlspecialchars($p['title']) ?></td>
                <td><?= htmlspecialchars($p['published_at']) ?></td>
                <td>
                    <a href="post-form.php?id=<?= $p['id'] ?>">Edit</a>
                    &nbsp;|&nbsp;
                    <a href="post-delete.php?id=<?= $p['id'] ?>" onclick="return confirm('Delete this post?')">Delete</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>
</body>
</html>
