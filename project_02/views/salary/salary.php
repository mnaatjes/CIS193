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
         * Hours
         */
        $result['ot_hours']     = $data['hours'] > 40 ? ($data['hours'] % 40) : 0;
        $result['reg_hours']    = $data['hours'] > 40 ? 40 : $data['hours'];
        $result['gross_hours']  = $data['hours'];
        /**
         * Pay rates
         */
        $result['ot_rate_pay']  = $data['pay'] * 1.5;
        $result['reg_rate_pay'] = $data['pay'];
        /**
         * Pay
         */
        $result['reg_pay']      = $result['reg_hours'] * $data['pay'];
        $result['ot_pay']       = $result['ot_rate_pay'] * $result['ot_hours'];
        $result['gross_pay']    = $result['reg_pay'] + $result['ot_pay'];
        return $result;
    });
?>