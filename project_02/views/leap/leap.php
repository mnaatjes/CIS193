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
         * Check if leap year
         */
        $result['year'] = $data['year'];
        $isCentury = ($data['year'] % 100) === 0;
        if($isCentury){
            $result['leap'] = ($data['year'] % 400) === 0;
        } else {
            $result['leap'] = ($data['year']) % 4 === 0;
        }
        return $result;
    });
?>