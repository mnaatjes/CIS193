<?php
    /**
     * Require
     * const    constants
     * dir      src directory
     */
    require_once 'constants.php';
    require_once DIR__UTILS;
    require_once DIR__COMP;
    /**
     * turn errors on
     */
    enableErrors();
    /**
     * build personal information component
     */
    $personalInfo   = file_get_contents('data/info.json', true);
    $infoData       = [
        [
            'name' => 'John Doe',
            'phone' => '555-123-4567',
            'fax' => '555-987-6543',
            'email' => 'john.doe@example.com'
        ],
        [
            'name' => 'Jane Smith',
            'phone' => '555-987-6543',
            'fax' => '555-123-4567',
            'email' => 'jane.smith@example.com'
        ],
        [
            'name' => 'David Lee',
            'phone' => '555-555-5555',
            'fax' => '555-555-5555',
            'email' => 'david.lee@example.com'
        ]
    ];
    $info = new HTMLComponent('div', [], [
        new HTMLComponent('h1', [], [], ['textContent'=>'Personal Information']),
        new TableComponent('Info', $infoData)
    ], []);
    $info->render();
    $info->mount();
?>