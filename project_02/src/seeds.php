<?php
    /**
     * Require Library
     * Enable Errors
     */
    require_once '../../../../src/shared-library/php/utils/utils-main.php';
    enableErrors();
    /**
     * Catch POST request
     */
    if($_SERVER["REQUEST_METHOD"] === "GET"){
        /**
         * Establish header
         */
        header('Content-Type: application/json');
        $response   = [];
        $errors     = [];
        /**
         * Load seed data:
         * 1) Validate Path
         * 2) Check Contents
         * 3) Format Data
         */
        $filePath = '../assets/grass_seed.json';
        if(!file_exists($filePath)){
            $errors['msg'] = 'Cannot connect to file!';
        }
        $arr = json_decode(file_get_contents($filePath));
        $json = [];
        foreach($arr as $item){
            array_push($json, [
                'id'     => $item->id,
                'brand'  => $item->brand,
                'type'   => $item->type,
                'price'  => $item->price_per_lb
            ]);
        }
        /**
         * Encode response and send
         */
        echo json_encode([
            'msg'=>'Connected...',
            'data' => $json
        ]);
    } else {
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(array("error" => "Method not allowed"));
    }

?>