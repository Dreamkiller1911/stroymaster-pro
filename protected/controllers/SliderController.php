<?php


class SliderController extends Controller
{

    public function actionGetAll()
    {
        if(isset($_POST)) {
            $sql = "SELECT * FROM {{slider}}";
            $command = Yii::app()->db->createCommand($sql);
            $row = $command->queryAll();
            echo json_encode($row);
        }
    }
}