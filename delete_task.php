<?php
include("connect.php");
$row_data =file_get_contents("php://input");
$data =json_decode($row_data);
$id =$data->id;
$remove ="DELETE  FROM `tasks` WHERE `id` = '$id'";
$remove_id =mysqli_query($con,$remove);
if($remove_id){
    echo "successfuly deleted";
}
else{
    echo "fial to delete";
}
?>