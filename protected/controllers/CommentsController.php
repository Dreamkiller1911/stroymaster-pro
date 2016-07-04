<?php

/**
 * Created by PhpStorm.
 * User: tazeb
 * Date: 04.04.2016
 * Time: 0:01
 */
class CommentsController extends Controller
{
    public function actionAdd()
    {
        $model = new Comments();

        if(isset($_POST['ajax']) && $_POST['ajax'] === 'newComment'){
        $model->attributes = $_POST;
        echo CActiveForm::validate($model);
        Yii::app()->end();
    }

        if(isset($_POST['Comments'])){
            try {
                $model->attributes = $_POST['Comments'];

                if(!$model->validate()){
                    echo CActiveForm::validate($model);
                    Yii::app()->end();
                }else{
                    if($model->save()){
                        $comment = $this->renderFile(Yii::app()->theme->basePath . '/views/user/_comments.php', array(
                            'comment' => $model,

                        ), true);
                        echo json_encode(array(
                            'complete' => true,
                            'comment' => $comment,
                        ));
                        Yii::app()->end();
                    }

                }

            }catch (Exception $e){
                echo json_encode(array('message' => $e->getMessage()));
            }
        }
    }
    public function actionGetAll(){

      $data = array();
        $allComment = Comments::model()->findAll();
        foreach ($allComment as $comment) {
            $data[] = $this->renderFile(Yii::app()->theme->basePath . '/views/user/_comments.php', array('comment' => $comment), true);
        }
        echo implode($data);



    }
    public function actionGetForm(){
        $model = new Comments();
        echo $this->renderFile(Yii::app()->theme->basePath . '/views/user/_commentForm.php', array('model'=>$model));

    }
}