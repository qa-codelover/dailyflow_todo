<?php
include("connect.php");

$tasks ="SELECT * FROM `tasks`";
$row_tasks =mysqli_query($con,$tasks);
// $row =mysqli_fetch_array($row_tasks);
$all_tasks=[];
while($row =mysqli_fetch_array($row_tasks)){
    $all_tasks[]=$row;
    
}
echo json_encode($all_tasks);
?>