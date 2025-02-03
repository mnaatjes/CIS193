<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>CIS193 PHP: Project 1</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
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
        $personalInfo = file_get_contents('data/info.json', true);
        $info = new HTMLComponent('div', [], [
            new HTMLComponent('h1', [], [], ['textContent'=>'Personal Information']),
            new TableComponent('', $personalInfo)
        ], []);
        $info->render();
        $info->mount();
        /**
         * Amtrack Unordered List
         */
        $trainPrices      = [
            'saver' => '$22.00',
            'value' => '$28.00',
            'flexible' => '$45.00',
        ];
        $amtrack = new HTMLComponent('div', [], [
            new HeadingComponent('Amtrak: Kalamazoo to Chicago', 'h1'),
            new HeadingComponent('Fares', 'h2'),
            new ListComponent($trainPrices)
        ], []);
        $amtrack->render();
        $amtrack->mount();
        /**
         * AI Tools Ordered List
         */
        $aiData = [
            "ChatGPT" => "Advanced conversational AI for generating text and assisting with tasks.",
            "DALL-E" => "AI-powered image generation based on text prompts.",
            "MidJourney" => "A tool for creating stunning AI art and digital designs.",
            "Runway ML" => "A platform for AI-driven video editing and content creation.",
            "Jasper" => "AI for crafting marketing copy, blogs, and professional writing.",
            "GitHub Copilot" => "AI-powered coding assistant for software development.",
            "GrammarlyGO" => "AI writing assistant with features for improving content tone and clarity.",
            "Synthesia" => "AI video tool for generating avatars and personalized video content.",
        ];
        $aiTools = new HTMLComponent('div', [], [
            new HeadingComponent('Top AI Tools of 2024'),
            new ListComponent($aiData, true, ['class'=>'list--ai'])
        ], []);
        $aiTools->render();
        $aiTools->mount();
        /**
         * USPS Information
         */
        $uspsRates = [
            [
                "weight (lbs)" => 1,
                "zone 0, 1, 2" => 6.95,
                "zone 3" => 7.28,
                "zone 4" => 7.49,
                "zone 5" => 7.65,
                "zone 6" => 7.82,
                "zone 7" => 7.99,
                "zone 8" => 8.25,
                "zone 9" => 9.91,
            ],
            [
                "weight (lbs)" => 2,
                "zone 0, 1, 2" => 7.42,
                "zone 3" => 7.61,
                "zone 4" => 7.88,
                "zone 5" => 8.50,
                "zone 6" => 9.70,
                "zone 7" => 10.23,
                "zone 8" => 10.86,
                "zone 9" => 15.17,
            ],
            [
                "weight (lbs)" => 3,
                "zone 0, 1, 2" => 7.61,
                "zone 3" => 7.99,
                "zone 4" => 8.34,
                "zone 5" => 9.26,
                "zone 6" => 11.80,
                "zone 7" => 13.10,
                "zone 8" => 15.28,
                "zone 9" => 20.58,
            ],
            [
                "weight (lbs)" => 4,
                "zone 0, 1, 2" => 7.71,
                "zone 3" => 8.20,
                "zone 4" => 8.81,
                "zone 5" => 10.03,
                "zone 6" => 13.75,
                "zone 7" => 15.59,
                "zone 8" => 17.61,
                "zone 9" => 24.78,
            ],
            [
                "weight (lbs)" => 5,
                "zone 0, 1, 2" => 7.81,
                "zone 3" => 8.25,
                "zone 4" => 9.12,
                "zone 5" => 10.33,
                "zone 6" => 15.67,
                "zone 7" => 17.92,
                "zone 8" => 20.40,
                "zone 9" => 28.84,
            ],
            [
                "weight (lbs)" => 6,
                "zone 0, 1, 2" => 7.91,
                "zone 3" => 8.29,
                "zone 4" => 9.22,
                "zone 5" => 13.77,
                "zone 6" => 17.93,
                "zone 7" => 20.83,
                "zone 8" => 23.81,
                "zone 9" => 33.05,
            ],
            [
                "weight (lbs)" => 7,
                "zone 0, 1, 2" => 8.15,
                "zone 3" => 9.41,
                "zone 4" => 9.46,
                "zone 5" => 15.43,
                "zone 6" => 19.86,
                "zone 7" => 23.48,
                "zone 8" => 26.75,
                "zone 9" => 37.11,
            ],
            [
                "weight (lbs)" => 8,
                "zone 0, 1, 2" => 8.20,
                "zone 3" => 9.87,
                "zone 4" => 11.16,
                "zone 5" => 16.84,
                "zone 6" => 21.82,
                "zone 7" => 25.85,
                "zone 8" => 30.04,
                "zone 9" => 41.66,
            ],
            [
                "weight (lbs)" => 9,
                "zone 0, 1, 2" => 9.01,
                "zone 3" => 10.25,
                "zone 4" => 11.62,
                "zone 5" => 18.06,
                "zone 6" => 23.74,
                "zone 7" => 28.00,
                "zone 8" => 33.40,
                "zone 9" => 46.33,
            ],
            [
                "weight (lbs)" => 10,
                "zone 0, 1, 2" => 9.38,
                "zone 3" => 10.67,
                "zone 4" => 11.69,
                "zone 5" => 19.51,
                "zone 6" => 25.64,
                "zone 7" => 30.79,
                "zone 8" => 36.32,
                "zone 9" => 50.38,
            ],
        ];
        $hazmat = 'Hazardous materials include any matter having a clear potential for causing harm to the mail, persons, or property involved in moving the mail. However, many commonly used items contain materials that are considered hazardous by U.S. Postal Service standards. Some fuel-containing items commonly found in the mail are:';
        $materials = [
            "Chainsaws",
            "Lawn trimmers and edgers",
            "Small motors and engines",
            "Used fuel tanks (motorcycles, lawn mowers)",
            "Small generators",
            "Camp stoves",
            "Gas lanterns or lamps",
            "Model cars or aircraft",
        ];
        $usps   = new HTMLComponent('div', [], [
            new HeadingComponent('USPS'),
            new HeadingComponent('Shipping Rates', 'h2'),
            new TableComponent('', $uspsRates),
            new HTMLComponent('div', [
                'class'=>'hazmat'
            ], [
                new HeadingComponent('**Hazardous Materials Information!', 'h5', ['style'=>'margin-bottom: 0.25rem;']),
                new HTMLComponent('p', [], [], ['textContent'=>$hazmat]),
                new ListComponent($materials)
            ], [])

        ], []);
        $usps->render();
        $usps->mount();
    ?>
    </body>
</html>