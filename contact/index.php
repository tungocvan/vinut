<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: X-PINGOTHER, Content-Type");
header("Access-Control-Max-Age: 86400");

include_once('classes/sendmail.php');
include_once('config.php');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if( empty($_POST['firstName']) && empty($_POST['email']) ) {
    echo json_encode(
        [
           "sent" => false,
           "message" => $SendMailEmptyerrorMessage
        ]
    ); 
    exit();
}

if ($_POST){
    //@important: Please change this before using
    http_response_code(200);
    // require "sendmail.php";
    $adminEmail = $_POST['adminEmail'];
    $now = getdate();
    $currentDate = $now["mday"] . ".". $now["mon"] . ".". $now["year"];
    $currentTime = $now["hours"] . ":". $now["minutes"] . ":". $now["seconds"];
    $subject = 'Contact From: ' . $currentDate." - ". $currentTime ;
    $from = $_POST['email'];
    $email = "Email: ".$_POST['email']."<br/>";
    $firstName = "Họ và tên: ".$_POST['name']."<br/>";
    $sdt = "Số điện thoại: ".$_POST['phone']."<br/>";
  //  $diachi = "Địa chỉ: ".$_POST['diachi']."<br/>";
    $message =$firstName.$sdt.$email. "Thông tin đơn hàng"."<br/>".$_POST['message'];       
    //sentmail($from,$subject,$message);
    //Actual sending email
    $sendEmail = new Sender($adminEmail, $from, $subject, $message);
    $sendEmail->send();
} else {
 // tell the user about error
 echo json_encode(
     [
        "sent" => false,
        "message" => $SendMailFailederrorMessage
     ]
 );
}
