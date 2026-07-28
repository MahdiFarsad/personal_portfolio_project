<?php
require __DIR__ . '/../includes/auth.php';
require_login();
require __DIR__ . '/../includes/db.php';

// Mark a submission as read
if (isset($_GET['mark_read'])) {
    $stmt = $pdo->prepare("UPDATE submissions SET status = 'read' WHERE id = ?");
    $stmt->execute([$_GET['mark_read']]);
    header('Location: submissions.php');
    exit;
}

// Delete a submission
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare('DELETE FROM submissions WHERE id = ?');
    $stmt->execute([$_GET['delete']]);
    header('Location: submissions.php');
    exit;
}

$submissions = $pdo->query('SELECT * FROM submissions ORDER BY created_at DESC')->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Submissions</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0E1420; color: #EDEFF2; margin: 0; padding: 2rem; }
        a { color: #E8A33D; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .card { background: #1A2332; border-radius: 4px; padding: 1.5rem; margin-bottom: 1rem; }
        .card.new { border-left: 3px solid #E8A33D; }
        .meta { font-size: 0.8rem; color: #8B93A7; margin-bottom: 0.6rem; }
        .message { margin: 0.8rem 0; line-height: 1.5; }
        .actions { font-size: 0.85rem; }
        .badge { font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 3px; background: #E8A33D; color: #0E1420; margin-left: 0.5rem; }
    </style>
</head>
<body>
    <p><a href="dashboard.php">&larr; Back to dashboard</a></p>
    <h1>Submissions</h1>

    <?php if (empty($submissions)): ?>
        <p>No submissions yet.</p>
    <?php endif; ?>

    <?php foreach ($submissions as $s): ?>
        <div class="card <?= $s['status'] === 'new' ? 'new' : '' ?>">
            <div class="meta">
                <?= htmlspecialchars($s['created_at']) ?> &mdash; <?= htmlspecialchars($s['form_type']) ?>
                <?php if ($s['status'] === 'new'): ?><span class="badge">NEW</span><?php endif; ?>
            </div>
            <strong><?= htmlspecialchars($s['name']) ?></strong> &lt;<?= htmlspecialchars($s['email']) ?>&gt;
            <p class="message"><?= nl2br(htmlspecialchars($s['message'])) ?></p>
            <div class="actions">
                <?php if ($s['status'] === 'new'): ?>
                    <a href="submissions.php?mark_read=<?= $s['id'] ?>">Mark as read</a> &nbsp;|&nbsp;
                <?php endif; ?>
                <a href="submissions.php?delete=<?= $s['id'] ?>" onclick="return confirm('Delete this submission?')">Delete</a>
            </div>
        </div>
    <?php endforeach; ?>
</body>
</html>
