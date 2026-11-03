<?php
include("connect.php");



// $raw_data = file_get_contents("php://input");
// $data = json_decode($raw_data);

// $task_name = $data->task_name;
// $task_time = $data->task_time

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data);

if ($data !== null && isset($data->task_name, $data->task_time)) {
    $task_name = $data->task_name;
    $task_time = $data->task_time;
    
    error_log("SAVE.PHP INSERT EXECUTED");

    $tasks = "INSERT INTO `tasks`(`task_name`,`task_time`,`is_completed`)VALUES('$task_name','$task_time','0')";
    $row_tasks =mysqli_query($con,$tasks);
    if($row_tasks){
        echo mysqli_insert_id($con);
    }
    else{
        echo "tasks in completed";
    }

    
} else {
    echo "Task ka data receive nahi hua ya JSON invalid hai.";
}




?>