<?php

class UserMenu extends CWidget
{
    private $_cl;
    private $_user;
    public $labelMaster;
    public function init()
    {


        $menu = $this->createMenu();

        $this->render('usermenu', array('menu'=> $menu));

    }

    public function run()
    {

    }
    protected function registerClientScript()
    {
        $asset = new CAssetManager();
        $path = '/assets/userMenu/';
        $cs = Yii::app()->clientScript;
        $cs->registerCssFile($path . 'main.css');
    }

    protected function createMenu()
    {
        $c = $this->getClassType();
        if($this->isUser()){
            $this->registerClientScript();
            $menu = array('<ul>');
            $menu[]='<li >' . $this->_cl . '</li>';
            $menu[]='<li><a href="/user/">Профиль</a></li>';
            $menu[]='<li><a href="/user/settings">Настройки</a></li>';
            switch($c){
                case 0:
                    if(count($this->labelMaster) > 0) {
                        foreach ($this->labelMaster as $k => $v) {
                            $menu[] = '<li>' . $k . '</li></a>';
                        }
                    }else {
                        $menu[] = '<li><a href="/services/update">Резюме</a></li>';
                    }
                    break;
                case 1:
                    $menu[] = '<li><a href="/advertising/create/">Разместить рекламу</a></li>';
                    if(User::isAdvt()){
                        $menu[] = '<li><a href="/advertising/update/">Управление рекламой</a></li>';
                    }
                    break;
                case 2:
                    $menu[] = '<a href="/orders/create"><li>Оставить заявку на ремонт</li></a>';
                    break;
                case 3:
                    $menu[] = '<li><a href="/site/settings">Настройки сайта</a></li>';
                    $menu[] = '<li><a StartCtrl="User_getAll" href="">Пользователи</a></li>';
                    $menu[] = '<li><a href="">Мастера</a></li>';
                    $menu[] = '<li><a href="">Магазины</a></li>';
                    $menu[] = '<li><a href="">Заказы</a></li>';
            }
            $menu[] = '</ul>';
            return implode($menu);

        }
    }

    protected function isUser()
    {
        return $this->_user;
    }

    protected function getClassType(){
        if(!Yii::app()->user->isGuest){//Проверяем вошел ли пользователь в систему
            $this->_user = true;
            if(isset(Yii::app()->user->class)){//Проверяем есть ли запись о классе пользователя
                $cl = Yii::app()->user->class;//Получаем код класса пользователя
                settype($cl, 'int');
                switch($cl){
                    case 0:
                         $this->_cl = 'мастер';
                        return $cl;
                    break;
                    case 1:
                        $this->_cl = 'владелец магазина';
                        return  $cl;
                    break;
                    case 2:
                        $this->_cl = 'заказчик';
                        return $cl;
                    break;
                    case 3:
                        $this->_cl = 'администратор';
                        return $cl;
                    break;
                }

            }
        }
    }

}