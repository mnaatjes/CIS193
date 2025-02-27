<?php
    /**
     * Test Response for Fetch Request
     */
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../../../src/shared-library/php/utils/utils-main.php';
    enableErrors();
    /**
     * Catch POST request
     */
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        $data = $_POST;
        header('Content-Type: application/json');
        echo json_encode([
            'msg' => 'Connection OK!',
            'test' => $data
        ]);
    }
?>