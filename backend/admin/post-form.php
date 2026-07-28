<?php
require __DIR__ . '/../includes/auth.php';
require_login();
require __DIR__ . '/../includes/db.php';

$id = $_GET['id'] ?? null;
$post = ['title' => '', 'slug' => '', 'excerpt' => '', 'content' => ''];

if ($id) {
    $stmt = $pdo->prepare('SELECT * FROM posts WHERE id = ?');
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if ($existing) $post = $existing;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $slug = trim($_POST['slug'] ?? '');
    $excerpt = trim($_POST['excerpt'] ?? '');
    $content = trim($_POST['content'] ?? '');

    if ($title === '' || $slug === '') {
        $error = 'Title and slug are required.';
    } else {
        if ($id) {
            $stmt = $pdo->prepare('UPDATE posts SET title=?, slug=?, excerpt=?, content=? WHERE id=?');
            $stmt->execute([$title, $slug, $excerpt, $content, $id]);
        } else {
            $stmt = $pdo->prepare('INSERT INTO posts (title, slug, excerpt, content) VALUES (?,?,?,?)');
            $stmt->execute([$title, $slug, $excerpt, $content]);
        }
        header('Location: dashboard.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?= $id ? 'Edit' : 'Add' ?> Post</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0E1420; color: #EDEFF2; margin: 0; padding: 2rem; }
        form { max-width: 600px; }
        label { display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8B93A7; margin: 1rem 0 0.4rem; }
        input, textarea { width: 100%; padding: 0.6rem 0.8rem; background: #1A2332; border: 1px solid #2A3548; color: #EDEFF2; border-radius: 3px; box-sizing: border-box; font-family: inherit; }
        textarea { resize: vertical; }
        button { margin-top: 1.5rem; padding: 0.7rem 1.5rem; background: #E8A33D; color: #0E1420; border: none; border-radius: 3px; font-weight: 600; cursor: pointer; }
        a { color: #3FA796; }
        .error { color: #E8A33D; }
        .hint { font-size: 0.75rem; color: #8B93A7; margin-top: 0.2rem; }
    </style>
</head>
<body>
    <p><a href="dashboard.php">&larr; Back to dashboard</a></p>
    <h1><?= $id ? 'Edit' : 'Add' ?> Post</h1>
    <?php if ($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?>

    <form method="POST">
        <label>Title</label>
        <input type="text" name="title" value="<?= htmlspecialchars($post['title']) ?>" required>

        <label>Slug</label>
        <input type="text" name="slug" value="<?= htmlspecialchars($post['slug']) ?>" required>
        <p class="hint">Used in the URL, e.g. "my-post-title" (lowercase, hyphens, no spaces)</p>

        <label>Excerpt</label>
        <textarea name="excerpt" rows="2"><?= htmlspecialchars($post['excerpt']) ?></textarea>

        <label>Content</label>
        <textarea name="content" rows="10"><?= htmlspecialchars($post['content']) ?></textarea>

        <button type="submit">Save</button>
    </form>
</body>
</html>
