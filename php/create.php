<?php
require 'database.php';

// Get the posted dataObject.
$post_data = file_get_contents("php://input");

if(isset($post_data) && !empty($post_data))
{
  // Extract the dataObject.
  $request = json_decode($post_data);

//
//  // Validate.
//  if(trim($request->number) === '' || (float)$request->amount < 0)
//  {
//    return http_response_code(400);
//  }
//
//  // Sanitize.
//  $number = mysqli_real_escape_string($con, trim($request->number));
//  $amount = mysqli_real_escape_string($con, (int)$request->amount);


  // Create.
   ///$sql = "INSERT INTO `policies`(`id`,`number`,`amount`) VALUES (null,'{$number}','{$amount}')";
//
//  if(mysqli_query($con,$sql))
//  {
//    http_response_code(201);
//    $policy = [
//      'number' => $number,
//      'amount' => $amount,
//      'id'    => mysqli_insert_id($con)
//    ];
//    echo json_encode($policy);
//  }
//  else
//  {
//    http_response_code(422);
 // }
}
