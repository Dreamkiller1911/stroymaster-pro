<?php

class ImgServicesController extends Controller
{
    public function actionSave($id = null)//Сохранение описания к изображению в резюме
    {
        if (isset($_POST['SaveDescription'])) {
            $model = ImgServices::model()->findByPk($_POST['SaveDescription']['id']);
            $model->description = $_POST['SaveDescription']['description'];
            $model->save();
            echo json_encode(array('complete' => true));
            Yii::app()->end();
        }
        if (isset($_FILES['OneImg'])) {
            try {
                $img = ImgServices::updateOneImg($_POST, $_FILES['OneImg']);
                $data['complete'] = true;
                $data['message'] = 'Сохранено';
                $data['content'] = $this->renderPartial('updateImg', array('img' => $img), true);
                echo json_encode($data);
                Yii::app()->end();
            } catch (Exception $e) {
                echo json_encode(array('message' => $e->getMessage()));
                Yii::app()->end();
            }
        }
        try {
            if (isset($_FILES['saveAllImg'])) {
                if (!User::issetService()) {
                    throw new Exception("<h4>Для добавления фотографий, сохраните свое резюме</h4>");
                }
                $id_service = Services::idOfUser();
                var_dump($id_service);
                die;
                $img = ImgServices::addMyImg($_FILES['saveAllImg'], $id_service);
                $arg = array('complete' => true, 'imgBalance' => User::getMyImgLimit(true));
                foreach ($img as $key) {
                    $model['ImgServices'] = ImgServices::model()->findByPk($key->id);
                    $arg['img'][] = $this->renderFile(Yii::app()->theme->baseUrl . '/views/services/_imgList.php', array(
                        'model' => $model
                    ), true);
                }
                echo json_encode($arg);
            } else throw new Exception("<h4>Вы не выбрали файл</h4>");
        } catch (Exception $e) {
            echo json_encode($e->getMessage());
        }
    }

    public function actionSaveAll()
    {
        try {
            if (isset($_FILES['saveAllImg'])) {
                if (!User::issetService()) {
                    throw new Exception("<h4>Для добавления фотографий, сохраните свое резюме</h4>");
                }
                $id_service = Services::idOfUser();
                $img = ImgServices::addMyImg($_FILES['saveAllImg'], $id_service);
                $arg = array('complete' => true, 'imgBalance' => User::getMyImgLimit(true));
                foreach ($img as $key) {
                    $model = ImgServices::model()->findByPk($key->id);
                    $arg['img'][] = $model->attributes;
                }
                echo json_encode($arg);
            } else throw new Exception("<h4>Вы не выбрали файл</h4>");
        } catch (Exception $e) {
            echo json_encode($e->getMessage());
        }
    }

    public function actionSaveOne()
    {
        var_dump($_POST);
        if (isset($_FILES['OneImg'])) {
            var_dump($_FILES);
            die;
            /*try {
                $img = ImgServices::updateOneImg($_POST, $_FILES['OneImg']);
                $data['complete'] = true;
                $data['message'] = 'Сохранено';
                $data['content'] = $this->renderPartial('updateImg', array('img' => $img), true);
                echo json_encode($data);
                Yii::app()->end();
            } catch (Exception $e) {
                echo json_encode(array('message' => $e->getMessage()));
                Yii::app()->end();
            }*/
        }
    }

    public function actionDelete()
    {
        if (isset($_POST['deleteImg'])) {
            try {
                $img = ImgServices::model()->findByPk($_POST['deleteImg']['id']);
                if (unlink(Yii::getPathOfAlias('webroot') . $img->url) && unlink(Yii::getPathOfAlias('webroot') . $img->simple_url)) {
                    if ($img->delete()) {
                        echo json_encode(array('complete' => true));
                        Yii::app()->end();
                    }
                }
                Yii::app()->end();
            } catch (Exception $e) {
                echo json_encode($e->getMessage());
            }
        }else{
            echo 'Нужен POST - deleteImg';
        }
    }
    public function actionGetOne(){
        $model = ImgServices::model()->findByPk($_POST['id']);
        echo json_encode($model->attributes);
    }
    public function actionGetAll(){
        $model = Services::model()->findByPk($_POST['id_service']);
        $data = array();
        foreach ($model->imgServices as $key){
            array_push($data, $key->attributes);
        }
        echo json_encode($data);
    }
}