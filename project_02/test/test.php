<?php
    /**
     * Test Response for Fetch Request
     */
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../../../src/shared-library/php/utils/utils-main.php';
    require_once '../src/request.php';
    /**
     * Constants
     */
    define('FP_DUMP_LOG', '../src/logs/dumps.log');
    define('FP_ERROR_LOG', '../src/logs/errors.log');
    log_errors();

    $req = new Request('POST');
    $req->processForm(function($data, $errors){
        return $data;
    });
?>