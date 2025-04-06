<?php
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../../src/php/utils/main.php';
    require_once '../../../src/php/lib/requests/request.php';
    ini_errors_enable();
    /**
     * Create request handler
     */
    $req = new Request('POST');
    $req->processData(function($data, $errors){
        /**
         * Check for "ready" and "recommend" values
         * Define values if not present
         */
        if(!isset($data['ready'])){
            $data['ready'] = false;
        }
        if(!isset($data['recommend'])){
            $data['recommend'] = false;
        }
        /**
         * Add timestamp to data
         */
        $data['timestamp'] = time();
        /**
         * Format in json
         * Format in json for text file
         */
        $json   = json_encode($data);
        $text   = json_encode($data, JSON_PRETTY_PRINT);
        $filepath_text = '../surveys/' . 'survey_' . time() . '_' . mt_rand(10000, 99999) . '.txt';
        /**
         * Write to text file
         */
        $result_text = file_put_contents($filepath_text, $text);
        if(!$result_text){
            throw Error('Error Writing File: ' . $filepath_text);
        }
        /**
         * Write to json object
         */
        $filepath_json  = '../surveys/records.json';
        $data_json      = json_decode(file_get_contents($filepath_json), true);
        /**
         * Validate json data
         * If not valid, create empty array
         */
        if($data_json === null || !is_array($data_json)){
            $data_json = [];
        }
        /**
         * Append new entry to json data
         */
        $data_json[] = $data;
        /**
         * Put Contents
         * Redirect to menu
         */
        $result_json = file_put_contents($filepath_json, json_encode($data_json, JSON_PRETTY_PRINT));
        if(!$result_json){
            throw Error('Error adding JSON to file!' . $filepath_json);
        }
        /**
         * Redirect to surveys table page
         */
        header('Location: ../surveys.html');
    });
?>