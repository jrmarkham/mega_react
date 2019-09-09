<?php

    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");



if(isset($_POST['submit'])) {
    $to = "support@markhamenterprises.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $app = $_POST['app'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $os = $_POST['deviceOS'];
    $dt = $_POST['deviceType'];
    $device = $_POST['device'];
    $pt = $_POST['problemType'];
    $problem = $_POST['problem'];

    $reportMessage = "=============================================\r\n";
    $reportMessage .= "=============================================\r\n";
    $reportMessage .= " Support for " . $app . "\r\n";
    $reportMessage .= " Name: " . $name . "\r\n";
    $reportMessage .= " Email: " . $from . "\r\n";
    $reportMessage .= " Phone: " . $phone . "\r\n";
    $reportMessage .= "=============================================\r\n";
    $reportMessage .= " OS: " . $os . "\r\n";
    $reportMessage .= " Device Type: " . $dt . "\r\n";
    $reportMessage .= " Device: " . $device . "\r\n";
    $reportMessage .= "=============================================\r\n";
    $reportMessage .= " Problem Type: " . $pt . "\r\n";
    $reportMessage .= " Problem :" . wordwrap($problem, 70) . "\r\n";
    $reportMessage .= "=============================================\r\n";
    $reportMessage .= "=============================================\r\n";

    $reportResponse = "Your submission has been received and we will contact you shortly.\r\nHere is a copy of your submission:\r\n" . $reportMessage;


    $subject = "Form submission";
    $subjectResponse = "Copy of your form submission";
    $headers = "From:" . $to;


    mail($to, $subject, $reportMessage, $headers);
    mail($from, $subjectResponse, $reportResponse, $headers);
    echo 'success';
    return;
}else{
    echo 'fail';
    exit(0);
    return;
}

