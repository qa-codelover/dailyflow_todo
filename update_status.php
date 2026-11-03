<?php
include("connect.php");

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data);

if ($data !== null && isset($data->id, $data->is_completed)) {
    $id = $data->id;
    // $is_completed = $data->is_completed;
    if ($data->is_completed == true) {
    $is_completed = 1;
} else {
    $is_completed = 0;
}
    $update ="UPDATE `tasks` set `is_completed`='$is_completed'  WHERE `id` = $id ";
    $update_row =mysqli_query($con,$update);
    if($update_row){
        echo "successfuly updated";
    }
}
?>