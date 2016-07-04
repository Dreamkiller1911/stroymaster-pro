<?php

/**
 * Created by PhpStorm.
 * User: User3D
 * Date: 14.04.2016
 * Time: 12:02
 */
class FileCommander extends CComponent
{
    protected $pathParams = array();
    protected $fileParams = array();
    protected $params = array();


    public function __construct($pathIn, $file)
    {
        $this->parsPathInParams($pathIn);
        $this->parsFileParams($file);
    }

    public static function deleteFile()
    {

    }

    public static function copyFile($pathIn , $file, $options = null)
    {
        $commander = new FileCommander($pathIn, $file);



        $a = $commander->pathParams;//Параметры кончной папки
        $b = $commander->fileParams;//Параметры начальной папки и файлов

        if($commander->imgResize($a, $b)) {
            if (move_uploaded_file($b['url'], $a['path'] . $b['name'] . $b['prefix'])) {
                return array('url'=> $a['url'] . $b['name'] . $b['prefix'], 'simple_url' => $a['url'] . 'prev/' . $b['name'] . $b['prefix']);
            } else return 123;
        }
    }

    protected function checkDir()
    {

    }

    public function path()
    {
        return $this->fileParams['url'];
    }

    protected function parsPathInParams($path)
    {


        if(!is_array($path)){
            $this->pathParams['path'] = $path;
        }else {
            $this->pathParams['url'] = $path['url'];
            $this->pathParams['path'] = $path['path'];
        }
    }
    protected function parsFileParams($path)
    {
        $data = array();
        if(!is_array($path)){
            $this->fileParams['url'] = $path;
        }else{
            foreach($path as $key => $val){

                switch($key){
                    case 'url':
                        $data['url'] = $val;

                        break;
                    case 'type':
                        switch($val){
                            case 'image/jpeg':
                                $data['prefix'] = '.jpeg';
                                break;
                            case 'image/gif':
                                $data['prefix'] = '.gif';
                                break;
                            case 'image/png':
                                $data['prefix'] = '.png';
                                break;
                            default:
                                throw new Exception("Файл не подходит ");
                                return false;

                        }
                        break;
                    case 'name':


                }
            };
            if(!isset($data['name'])){
                $data['name'] = uniqid('IMG_');
            }
            $this->fileParams += $data;

        }
    }
    protected function imgResize($a, $b)
    {
        $width = 200;
        $height = 200;
        $rgb=0xFFFFFF;

        $img = $b['url'];
        $imgSmall = $a['path'] . 'prev/' . $b['name'] . $b['prefix'];
        $size = getimagesize($img);

        if($size === false) return false;

        $format = strtolower(substr($size['mime'], strpos($size['mime'], '/')+1));
        $icfunc = "imagecreatefrom" . $format;

        if (!function_exists($icfunc)) return false;

        $x_ratio = $width / $size[0];
        $y_ratio = $height / $size[1];
        $ratio = min($x_ratio, $y_ratio);
        $use_x_ratio = ($x_ratio == $ratio);

        if($use_x_ratio){
            $new_width = $width;
            $new_height = (floor($size[1] * $ratio));
        }else{
            $new_width  = floor($size[0] * $ratio);
            $new_height = $height;
        }

        $isrc = $icfunc($img);
        $idest = imagecreatetruecolor($new_width, $new_height);

        imagefill($idest, 0, 0, $rgb);
        imagecopyresampled($idest, $isrc, 0, 0, 0, 0,
            $new_width, $new_height, $size[0], $size[1]);

        imagejpeg($idest, $imgSmall);

        imagedestroy($isrc);
        imagedestroy($idest);
        return true;

    }
}