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
    log_errors();

    $req = new Request('POST');
    $req->processForm(function($data, $errors){
        /**
         * Calculate seed cost: 
         * original: length * width * cost/lb
         * adjusted: (length * width * cost/lb * 10%) + (length * width * cost/lb)
         */
        $result['original'] = $data['length'] * $data['width'] * $data['seeds'];
        $added = $result['original'] * 0.10;
        $result['adjusted'] = $added + $result['original'];
        return array_merge($errors, $result);
    });
?>