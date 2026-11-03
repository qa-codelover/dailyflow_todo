<?php
$con = mysqli_connect(
    "YOUR_DATABASE_HOST",
    "YOUR_DATABASE_USERNAME",
    "YOUR_DATABASE_PASSWORD",
    "YOUR_DATABASE_NAME"
);

if (!$con) {
    die("Database connection failed");
}
?>