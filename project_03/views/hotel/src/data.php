<?php
    /**
     * Require Lib
     */
    require_once '../../../src/php/utils/main.php';
    require_once '../../../src/php/lib/requests/request.php';
    ini_errors_enable();
    /**
     * Clear Surveys directory
     */
    if(is_dir('../surveys')){
        // grab all files in directory
        $files = glob('../surveys/*');
        // loop files and delete
        foreach($files as $file){
            if(is_file($file)){
                unlink($file);
            }
        }
    } else {
        // if directory does not exist, create it
        mkdir('../surveys', 0777, true);
    }
    /**
     * Generate dummy data for survey files
     */

    $entries = 20;
    /**
     * Grab JSON Name Data
     */
    $paths = [
        '../data/firstnames_m.json',
        '../data/firstnames_f.json',
        '../data/surnames.json'
    ];
    /**
     * Collect name Records
     */
    $records = [];
    $index   = 0;
    foreach($paths as $path){
        $json = json_decode(file_get_contents($path), true);
        $key = '';
        $count = $entries;
        if($index === 0){
            $key = 'fname_male';
            $count/=2;
        } else if($index === 1){
            $key = 'fname_female';
            $count/=2;
        } else {
            $key = 'surnames';
        }
        $records[$key] = array_slice($json, 0, $count);
        $index++;
    }
    /**
     * Merge and parse names arrays
     */
    $fnames     = array_merge($records['fname_male'], $records['fname_female']);
    $surnames   = $records['surnames'];
    /**
     * Generate $data for survey entries
     */
    $data = [];
    for($i = 0; $i < $entries; $i++){
        /**
         * Settings
         */
        $min = 1;
        $max = 5;
        /**
         * Get props
         * Push Assoc Array
         */
        $data[] = [
            'fname' => $fnames[$i] . ' ' . $surnames[$i],
            'room' => random_int(100, 149),
            'checkIn' => random_date(DATE_YMD, ['min' => 2005, 'max' => 2024]),
            'checkOut' => random_date(DATE_YMD, ['min' => 2005, 'max' => 2024]),
            'staff' => random_int($min, $max),
            'clean' => random_int($min, $max),
            'bed' => random_int($min, $max),
            'amenity' => random_int($min, $max),
            'quality' => random_int($min, $max),
            'recommend' => random_bool(),
            'ready' => random_bool(),
            'timestamp' => random_date(DATETIME_UNIX, ['min' => 2005, 'max' => 2024])
        ];
    }
    /**
     * Write entries to text files
     */
    foreach($data as $entry){
        $filepath_text  = '../surveys/' . 'survey_' . time() . '_' . mt_rand(10000, 99999) . '.txt';
        $text           = json_encode($entry, JSON_PRETTY_PRINT);
        $result_text    = file_put_contents($filepath_text, $text);
        if(!$result_text){
            throw Error('Error Writing File: ' . $filepath_text);
        }
    }
    /**
     * Write Data to JSON file
     * 1) Create new file
     * 2) Overwrite existing file
     */
    $filepath = '../surveys/records.json';
    /**
     * Put Contents
     * Redirect to menu
     */
    $result = file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT));
    if(!$result){
        throw Error('Error adding JSON to file!' . $filepath);
    }
    /**
     * Redirect to surveys table page
     */
    header('Location: ../surveys.html');
?>