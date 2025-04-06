import { createTableElement } from '../../../../../../src/packages/htmlComponents/elements/createTableElement.js';
/**
 * @file 'project_03/views/hotel/surveys.js
 */
const root = document.getElementById('root');
root.style.width = '100%';
/**
 * Fetch data from json file and build tabular data
 */
fetch('surveys/records.json')
    .then(res =>{
        if(!res.ok){
            // throw error on failure
            throw new Error('Unable to connect to file: ' + res.status);
        }
        return res.json();
    })
    .then(data => {
        /**
         * Generate tabular data element
         * Order data by timestamp descending
         */
        data.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
        const records = [];
        data.forEach(item => {
            // Grab and destructure json items
            const {
                fname, room, checkIn, checkOut, staff, clean, bed, amenity, quality, ready, recommend, timestamp
            } = item;
            // format date
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            const dateIn = new Date(checkIn);
            const dateOut = new Date(checkOut);
            const stamp = new Date(timestamp * 1000);
            // Average score
            const score = (staff + clean + bed + amenity + quality) / 5
            // Format return object
            const record = {
                'Full Name': fname,
                'Room': room,
                'Check-in': dateIn.toLocaleDateString('en-US', options),
                'Check-out': dateOut.toLocaleDateString('en-US', options),
                'Score': score,
                'Room Prep': ready === false ? 'No' : 'Yes',
                'Recommend': recommend === false ? 'No' : 'Yes',
                'Recorded': stamp.toLocaleDateString('en-US', options)
            };
            // push object to records
            records.push(record);
        });
        const table = createTableElement(records);
        root.appendChild(table);
    })
    .catch(err => {
        console.error('Error fetching json file!', err);
    })