<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, ContentItem-Type, Accept");


// ** MySQL Settings ** //
// ** The name of the database
define('DB_NAME', 'jmarkham_me_data');
// ** MySQL database username
define('DB_USER', 'jmarkham_me');
//** MySQL database password
define('DB_PASSWORD', 's7}YiFok6iCg');
// ** MySQL hostname
define('DB_HOST', 'localhost');
////// ** MySQL hostname
//define('DB_HOST', '108.167.172.151:3306');

function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASSWORD ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");
  return $connect;
}

$con = connect();
