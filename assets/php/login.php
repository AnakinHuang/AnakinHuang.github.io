<?php
session_start();
include './dbconnect.php'; // Include your database connection file.

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $user_type = $_POST['user_type'];

    // Query to check username and role
    $query = "SELECT * FROM users WHERE username = ? AND role = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $username, $user_type);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Verify the hashed password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user;

            // Redirect to the appropriate dashboard
            if ($user_type == 'customer') {
                header('Location: ../../customer/dashboard.html');
            } elseif ($user_type == 'merchant') {
                header('Location: ../../merchant/dashboard.html');
            } elseif ($user_type == 'administrator') {
                header('Location: ../../admin/dashboard.html');
            }
            exit;
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "Invalid username or user type.";
    }
}

