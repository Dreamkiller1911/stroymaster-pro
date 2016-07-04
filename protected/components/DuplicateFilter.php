<?php
/**
 * DuplicateFilter prevents Yii from exposing URLs starting with /index.php/ when showScriptName is false. Such
 * URLs are automatically redirected to proper ones.
 *
 * To use add the following to your controller:
 *
 * ```php
 * public function filters() {
 *   return array(
 *     'accessControl', // perform access control for CRUD operations
 *       array('DuplicateFilter'),
 *     );
 * }
 * ```
 *
 * @author Alexander Makarov <sam@rmcreative.ru>
 */
class DuplicateFilter extends CFilter
{
    /**
     * Performs the pre-action filtering.
     * @param CFilterChain $filterChain the filter chain that the filter is on.
     * @return boolean whether the filtering process should continue and the action
     * should be executed.
     */
    protected function preFilter($filterChain)
    {
        $requestUri = Yii::app()->request->requestUri;
        if (Yii::app()->urlManager->showScriptName === false && preg_match('~^/index\.php(.*)~', $requestUri, $matches)) {
            Yii::app()->request->redirect($matches[1], true, 301);
        }
        return parent::preFilter($filterChain);
    }
}