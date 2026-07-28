<?php
// Shared session/auth check. Every protected admin page includes this at the top.
session_start();

function require_login() {
    if (empty($_SESSION['admin_id'])) {
        header('Location: login.php');
        exit;
    }
}
