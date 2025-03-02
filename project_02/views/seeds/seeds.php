<?php
    /**
     * Respond to request for grass seed data
     */
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../../../../src/shared-library/php/utils/utils-main.php';
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
         * Grab json data from seed.json file
         */
        $json = file_get_contents('./grass_seed.json');
        return json_decode($json, true);
    });

?>