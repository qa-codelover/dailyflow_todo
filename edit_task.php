<?php
include("connect.php");
$row_data=file_get_contents("php://input");
$data=json_decode($row_data);
$id=$data->id;
$task_name=$data->task_name;
$update ="UPDATE `tasks` set `task_name` ='$task_name' WHERE `id` ='$id'";
$risult =mysqli_query($con,$update);
if($risult){
    echo "successfuly updated";
}
else{
    echo "there is an error";
}

?>