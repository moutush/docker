<?php
$host = getenv('MYSQL_HOST'); // This MUST match the service name in compose.yaml!
$user = getenv('MYSQL_USER');
$pass = getenv('MYSQL_PASS');
$db   = getenv('MYSQL_DB');

// Wait briefly for DB to boot (hacky, but simple for this demo)
sleep(2);

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "<h1 style='color:green'>Connected successfully to MySQL! 🚀</h1>";
?>
