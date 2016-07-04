<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
	/**
	 * @var string the default layout for the controller view. Defaults to 'column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='column1';
	/**
	 * @var array context menu items. This property will be assigned to {@link CMenu::items}.
	 */
	public $menu=array();
	/**
	 * @var array the breadcrumbs of the current page. The value of this property will
	 * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
	 * for more details on how to specify this property.
	 */
	public $breadcrumbs=array();
	public function init()
	{
		$path = '/assets/userMenu/';
		$cs = Yii::app()->clientScript;
		$cs->registerCoreScript('jquery');
		$cs->registerCssFile($path . 'main.css');
		$cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/Proto.js');
		$cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/mylibrary/UserAuth.js');
		$cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/UserAuthController.js');
		$cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/app/story/Defaults.js');
		$cs->registerScriptFile(Yii::app()->theme->baseUrl . '/js/app/Start.js',CClientScript::POS_HEAD, array('id'=>'start'));
		$cs->registerScript('Start', ';var start = new Start({debugMode: \'true\'});');
//		$cs->registerScript('carusel', '$(\'.carousel\').carousel()');
		return $cs;
	}
}