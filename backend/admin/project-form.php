<?php
require __DIR__ . '/../includes/auth.php';
require_login();
require __DIR__ . '/../includes/db.php';

$id = $_GET['id'] ?? null;
$project = [
    'title' => '', 'slug' => '', 'category' => '', 'short_desc' => '',
    'full_desc' => '', 'tech_stack' => '', 'github_url' => '', 'demo_url' => '',
    'status' => 'published', 'sort_order' => 0,
];

if ($id) {
    $stmt = $pdo->prepare('SELECT * FROM projects WHERE id = ?');
    $stmt->execute([$id]);
    $existing = $stmt->fetch();
    if ($existing) $project = $existing;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $slug = trim($_POST['slug'] ?? '');
    $category = trim($_POST['category'] ?? '');
    $shortDesc = trim($_POST['short_desc'] ?? '');
    $fullDesc = trim($_POST['full_desc'] ?? '');
    $techStack = trim($_POST['tech_stack'] ?? '');
    $githubUrl = trim($_POST['github_url'] ?? '');
    $demoUrl = trim($_POST['demo_url'] ?? '');
    $status = $_POST['status'] ?? 'published';
    $sortOrder = (int) ($_POST['sort_order'] ?? 0);

    if ($title === '' || $slug === '') {
        $error = 'Title and slug are required.';
    } else {
        if ($id) {
            $stmt = $pdo->prepare(
                'UPDATE projects SET title=?, slug=?, category=?, short_desc=?, full_desc=?, tech_stack=?, github_url=?, demo_url=?, status=?, sort_order=? WHERE id=?'
            );
            $stmt->execute([$title, $slug, $category, $shortDesc, $fullDesc, $techStack, $githubUrl, $demoUrl, $status, $sortOrder, $id]);
        } else {
            $stmt = $pdo->prepare(
                'INSERT INTO projects (title, slug, category, short_desc, full_desc, tech_stack, github_url, demo_url, status, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)'
            );
            $stmt->execute([$title, $slug, $category, $shortDesc, $fullDesc, $techStack, $githubUrl, $demoUrl, $status, $sortOrder]);
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
    <title><?= $id ? 'Edit' : 'Add' ?> Project</title>
    <style>
        body { font-family: system-ui, sans-serif; background: #0E1420; color: #EDEFF2; margin: 0; padding: 2rem; }
        form { max-width: 600px; }
        label { display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8B93A7; margin: 1rem 0 0.4rem; }
        input, textarea, select { width: 100%; padding: 0.6rem 0.8rem; background: #1A2332; border: 1px solid #2A3548; color: #EDEFF2; border-radius: 3px; box-sizing: border-box; font-family: inherit; }
        textarea { resize: vertical; }
        button { margin-top: 1.5rem; padding: 0.7rem 1.5rem; background: #E8A33D; color: #0E1420; border: none; border-radius: 3px; font-weight: 600; cursor: pointer; }
        a { color: #3FA796; }
        .error { color: #E8A33D; }
        .hint { font-size: 0.75rem; color: #8B93A7; margin-top: 0.2rem; }
    </style>
</head>
<body>
    <p><a href="dashboard.php">&larr; Back to dashboard</a></p>
    <h1><?= $id ? 'Edit' : 'Add' ?> Project</h1>
    <?php if ($error): ?><p class="error"><?= htmlspecialchars($error) ?></p><?php endif; ?>

    <form method="POST">
        <label>Title</label>
        <input type="text" name="title" value="<?= htmlspecialchars($project['title']) ?>" required>

        <label>Slug</label>
        <input type="text" name="slug" value="<?= htmlspecialchars($project['slug']) ?>" required>
        <p class="hint">Used in the URL, e.g. "my-project-name" (lowercase, hyphens, no spaces)</p>

        <label>Category</label>
        <input type="text" name="category" value="<?= htmlspecialchars($project['category']) ?>">

        <label>Short Description</label>
        <textarea name="short_desc" rows="2"><?= htmlspecialchars($project['short_desc']) ?></textarea>

        <label>Full Description</label>
        <textarea name="full_desc" rows="6"><?= htmlspecialchars($project['full_desc']) ?></textarea>

        <label>Tech Stack</label>
        <input type="text" name="tech_stack" value="<?= htmlspecialchars($project['tech_stack']) ?>">
        <p class="hint">Comma-separated, e.g. "Python,PyTorch,OpenCV"</p>

        <label>GitHub URL</label>
        <input type="text" name="github_url" value="<?= htmlspecialchars($project['github_url']) ?>">

        <label>Demo URL</label>
        <input type="text" name="demo_url" value="<?= htmlspecialchars($project['demo_url']) ?>">

        <label>Status</label>
        <select name="status">
            <option value="published" <?= $project['status'] === 'published' ? 'selected' : '' ?>>Published</option>
            <option value="upcoming" <?= $project['status'] === 'upcoming' ? 'selected' : '' ?>>Upcoming</option>
        </select>

        <label>Sort Order</label>
        <input type="number" name="sort_order" value="<?= htmlspecialchars($project['sort_order']) ?>">

        <button type="submit">Save</button>
    </form>
</body>
</html>
