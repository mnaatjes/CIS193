/**
 * @fileoverview
 * This file contains the test cases for the palindrome view.
 */
/**
 * @const {HTMLElement} display
 */
const display = document.getElementById("display");
/**
 * @const {HTMLElement} input
 */
const input = document.getElementById("input");
/**
 * @listens {HTMLElement} input#onkeyup
 */
input.addEventListener("keyup", function (e){
    // Grab value
    const value = e.target.value;
    const query = {
        input: value,
        timestamp: new Date().toISOString()
    };
    /**
     * Perform Fetch
     * 1) URI encode the value
     * 2) Deploy GET request to test.php
     * 3) Set the header to application/json
     * 4) Set the body to JSON.stringify({ value })
     */
    fetch("src/palindrome.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(query)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((response) => {
        const is_palindrome = response.data.is_palindrome;
        const color = is_palindrome ? "green" : "red";
        display.style.color = color;
        display.innerHTML = value.split('').reverse().join('');
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    })
});