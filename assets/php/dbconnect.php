 <?php
$servername = "localhost";
$username = "yhu116"; // use your own username
$password = "ZShk7dha";    // use your own password
$dbname = "yhu116_1"; // use your own database name
 
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

$conn->close();
