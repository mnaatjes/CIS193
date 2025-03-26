<?php
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../src/constants.php';
    require_once PATH . 'utils/utils-main.php';
    require_once PATH . 'lib/requests/request.php';
    enableErrors();
    /**
     * Create request handler
     */
    $req = new Request('POST');
    $req->processForm(function($data, $errors){
        /**
         * Check for "ready" and "recommend" values
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
        $fpText = 'surveys/' . 'survey_' . time() . '_' . mt_rand(10000, 99999) . '.txt';
        /**
         * Write to text file
         */
        $resText = file_put_contents($fpText, $text);
        if(!$resText){
            throw Error('Error Writing File: ' . $fpText);
        }
        var_dump($resText);
        var_dump($fpText);
        /**
         * Write to json object
         */
        $fpJSON     = 'surveys/surveys.json';
        $content    = json_decode(file_get_contents($fpJSON), true);
        if(is_array($content)){
            $content[] = $json;
        } else {
            $content = [$json];
        }
        /**
         * Put Contents
         * Redirect to menu
         */
        $resJSON = file_put_contents($fpJSON, json_encode($content));
        if(!$resJSON){
            throw Error('Error adding JSON to file!' . $fpJSON);
        }
        header('Location: surveys.html');
    });
?>