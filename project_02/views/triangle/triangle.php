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
         * Declare Props
         */
        $result = [];
        $a = $data['a'];
        $b = $data['b'];
        $c = $data['c'];
        /**
         * Calculate Hypotenuse
         */
        function validHypotenuse($a, $b, $c){
            $arr    = [$a, $b, $c];
            $hypo   = $arr[0];
            foreach($arr as $val){
                if($val > $hypo){
                    $hypo = $val;
                }
            }
            return $hypo === $c;
        }
        /**
         * Check sides
         */
        $result['isValid']  = ($a + $b > $c) && ($a + $c > $b) && ($b + $c > $a);
        if($result['isValid']){
            if(validHypotenuse($a, $b, $c)){
                $result['s']    = $s = ($a + $b + $c) / 2; // semi-perimeter
                $result['P']    = $a + $b + $c; // perimeter
                $result['area'] = number_format(sqrt($s * ($s - $a) * ($s - $b) * ($s - $c)), 2); // area
                $result['h']    = number_format((2 * $result['area']) / $a, 2);
                $result['a']    = $a;
                $result['b']    = $b;
                $result['c']    = $c;
            } else {
                $errors['msg'] = 'Hypotenuse must be greater than sides a + b!';
            }
        } else {
            $errors['msg'] = 'Sides are not valid! Formula must follow a + b > c';
        }
        $result['errors'] = $errors;
        /**
         * Return
         */
        return $result;
    });
?>