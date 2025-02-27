<?php
    /**
     * @author MNaatjes <michael.naatjes87@gmail.com>
     * 
     * Require source code
     */
    require_once '../../../../src/shared-library/php/utils/utils-main.php';
    enableErrors();
    /**
     * Establish headers with mime type
     */
    header('Content-type: application/json');
    /**
     * Catch POST request
     */
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        /**
         * Capture form data
         * Validate form data
         * Build response
         */
        $response   = [];
        $errors     = [];
        $length     = isset($_POST['length']) && is_numeric($_POST['length']) ? $_POST['length'] : null;
        $height     = isset($_POST['height']) && is_numeric($_POST['height']) ? $_POST['height'] : null;
        $cost       = isset($_POST['cost']) && is_numeric($_POST['cost']) ? $_POST['cost'] : null;
        /**
         * Debugging
         */
        /**
         * Check for errors
         */
        if(empty(array_filter([$length, $height, $cost]))){
            $errors['missing'] = '*';
        } else if(array_reduce([$length, $height, $cost], function($acc, $curr){return is_null($curr);}, false)){
            $errors['missing'] = [];
            if($length === null){array_push($errors['missing'], 'length');}
            if($height === null){array_push($errors['missing'], 'height');}
            if($cost === null){array_push($errors['missing'], 'cost');}
        }
        /**
         * Compose response
         */
        $response['status'] = 'OK';
        if(!empty($errors)){
            $response['errors'] = $errors;
        } else {
            /**
             * Perform Calculation
             */
            $response['result'] = $length * $height * $cost;
        }
        /**
         * Encode response and echo
         */
        echo json_encode($response);
    } else {
        /**
         * Response if script accessed directly
         * Generate and send error response
         */
        $response['status'] = 'error';
        $response['message'] = 'Invalid Request! You cannot access this script directly!';
        /**
         * Encode response and echo
         */
        echo json_encode($response);
    }
?>