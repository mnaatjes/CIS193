<?php
    /**
     * Set Headers
     */
    header('Content-Type: application/json');
    /**
     * Require Lib
     */
    require_once '../../../src/php/utils/main.php';
    require_once '../../../src/php/lib/requests/request.php';
    /**
     * Palindrome Validation Function
     * @param string $str - String to check
     * @return bool - True if palindrome, false if not
     */
    function isPalindrome($str) {
        // Remove non-alphanumeric characters and convert to lowercase
        $cleanStr = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($str));
        // Check if the cleaned string is equal to its reverse
        return $cleanStr === strrev($cleanStr);
    }
    /**
     * Handle Request
     */
    $req = new Request('POST');
    $req->processData(function($data, $errors){
        // Palindrome Function
        $res = [
            'is_palindrome' => isPalindrome($data['input']),
        ];
        // Return response
        return $res;
    });
    /**
     * Send Response
     */
    $req->sendResponse();
?>