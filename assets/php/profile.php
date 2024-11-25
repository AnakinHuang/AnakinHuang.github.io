<?php
session_start();
include './dbconnect.php'; // Include your database connection file.

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $old_password = $_POST['old_password'];
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];
    $user_id = $_SESSION['user']['user_id']; // Assuming user ID is stored in session.

    // Validate old password
    $query = "SELECT password FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!password_verify($old_password, $user['password'])) {
        echo "Incorrect old password.";
        exit;
    }

    // Hash new password if provided
    if (!empty($new_password) && $new_password === $confirm_password) {
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
        $password_update = ", password = ?";
    } else {
        $password_update = "";
    }

    // Update profile details
    $update_query = "UPDATE users SET username = ?, email = ?, phone = ? $password_update WHERE user_id = ?";
    $stmt = $conn->prepare($update_query);

    if (!empty($new_password)) {
        $stmt->bind_param("ssssi", $username, $email, $phone_number, $hashed_password, $user_id);
    } else {
        $stmt->bind_param("sssi", $username, $email, $phone_number, $user_id);
    }

    if ($stmt->execute()) {
        echo "Profile updated successfully.";
        // Optionally redirect to profile page
    } else {
        echo "An error occurred. Please try again.";
    }
}

