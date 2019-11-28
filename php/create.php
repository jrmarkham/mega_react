<?php
require 'database.php';

// Get the posted dataObject.
$post_data = file_get_contents("php://input");

if(isset($post_data) && !empty($post_data))
{
  // Extract the dataObject.
  $request = json_decode($post_data);

}
