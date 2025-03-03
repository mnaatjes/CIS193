<?php
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../src/php/utils/utils-main.php';
    require_once '../../src/request.php';
    /**
     * Constants
     */
    define('FP_DUMP_LOG', '../../src/logs/dumps.log');
    define('FP_ERROR_LOG', '../../src/logs/errors.log');
    /**
     * Enable errors log
     */
    log_errors();
    /**
     * Coin Breakdown function
     */
    function breakdown($amt, $depth=0, $result=[]){
        /**
         * switch by depth
         */
        switch($depth){
            /**
             * Dollars
             */
            case 0:
                $denominator        = 100;
                $result['dollars']  = floor($amt / $denominator);
                $remainder          = $amt % $denominator;
                return breakdown($remainder, $depth + 1, $result);
            /**
             * Quarters
             */
            case 1:
                $denominator        = 25;
                $result['quarters'] = floor($amt / $denominator);
                $remainder          = $amt % $denominator;
                return breakdown($remainder, $depth + 1, $result);
            /**
             * Dimes
             */
            case 2:
                $denominator        = 10;
                $result['dimes']    = floor($amt / $denominator);
                $remainder          = $amt % $denominator;
                return breakdown($remainder, $depth + 1, $result);
            /**
             * Nickles
             */
            case 3:
                $denominator        = 5;
                $result['nickles']  = floor($amt / $denominator);
                $remainder          = $amt % $denominator;
                return breakdown($remainder, $depth + 1, $result);
            /**
             * Pennies
             */
            default:
                $denominator        = 1;
                $result['pennies']  = floor($amt / $denominator);
                break;
        }
        /**
         * Return result
         */
        return $result;
    }
    /**
     * Handle request
     */
    $req = new Request('POST');
    $req->processForm(function($data, $errors){
        $result = breakdown($data['pennies']);
        return $result;
    });
?>