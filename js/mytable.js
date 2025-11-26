/*
Full Name: Vin Sanjaykumar Patel
File: mytable.js
GUI Assignment: HW4 Part 1 - jQuery Validation Plugin
Email: vin_patel@student.uml.edu
Date: Nov 24, 2025
Copyright (c) 2025 by Vin. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Description: In Part 1 of JavaScript file, I used jQuery Validation plugin 
for input validation and generating multiplication table.

Citation:
1) https://www.w3schools.com/js/default.asp
2) https://jqueryvalidation.org/
3) https://jqueryvalidation.org/documentation/
*/

// Global limits for input values and cells
const MIN_LIMIT = -50;
const MAX_LIMIT = 50;
const MAX_CELLS = 20000;

// Function to generate multiplication table
function generateTable() {
    const minColumn = parseInt($('#minColumn').val());
    const maxColumn = parseInt($('#maxColumn').val());
    const minRow = parseInt($('#minRow').val());
    const maxRow = parseInt($('#maxRow').val());

    // Build table HTML
    let tableHTML = '<table><tr><th></th>';
    for (let i = minColumn; i <= maxColumn; i++) {
        tableHTML += `<th>${i}</th>`;
    }
    tableHTML += '</tr>';

    for (let j = minRow; j <= maxRow; j++) {
        tableHTML += `<tr><th>${j}</th>`;
        for (let i = minColumn; i <= maxColumn; i++) {
            tableHTML += `<td>${j * i}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    $('#tableplace').html(tableHTML);
}

// Custom validation method to check if min <= max
$.validator.addMethod("minLessThanMax", function(value, element, params) {
    const minVal = parseInt($(params.minField).val());
    const maxVal = parseInt($(params.maxField).val());
    return minVal <= maxVal;
}, "Minimum value must be less than or equal to maximum value.");

// Custom validation method to check table size
$.validator.addMethod("tableSizeCheck", function(value, element) {
    const minColumn = parseInt($('#minColumn').val());
    const maxColumn = parseInt($('#maxColumn').val());
    const minRow = parseInt($('#minRow').val());
    const maxRow = parseInt($('#maxRow').val());
    
    if (isNaN(minColumn) || isNaN(maxColumn) || isNaN(minRow) || isNaN(maxRow)) {
        return true; 
    }
    
    const totalCells = (maxColumn - minColumn + 1) * (maxRow - minRow + 1);
    return totalCells <= MAX_CELLS;
}, `Table is too large! The table would have more than ${MAX_CELLS} cells. Please enter a smaller range.`);

// jQuery validation setup and rules
$(document).ready(function() {
    $('#table_form').validate({
        rules: {
            minColumn: {
                required: true,
                number: true,
                min: MIN_LIMIT,
                max: MAX_LIMIT
            },
            maxColumn: {
                required: true,
                number: true,
                min: MIN_LIMIT,
                max: MAX_LIMIT,
                minLessThanMax: {
                    minField: '#minColumn',
                    maxField: '#maxColumn'
                },
                tableSizeCheck: true
            },
            minRow: {
                required: true,
                number: true,
                min: MIN_LIMIT,
                max: MAX_LIMIT
            },
            maxRow: {
                required: true,
                number: true,
                min: MIN_LIMIT,
                max: MAX_LIMIT,
                minLessThanMax: {
                    minField: '#minRow',
                    maxField: '#maxRow'
                },
                tableSizeCheck: true
            }
        },
        messages: {
            minColumn: {
                required: "Please enter a minimum column value.",
                number: "Please enter a valid number.",
                min: `Value must be at least ${MIN_LIMIT}.`,
                max: `Value must be at most ${MAX_LIMIT}.`
            },
            maxColumn: {
                required: "Please enter a maximum column value.",
                number: "Please enter a valid number.",
                min: `Value must be at least ${MIN_LIMIT}.`,
                max: `Value must be at most ${MAX_LIMIT}.`
            },
            minRow: {
                required: "Please enter a minimum row value.",
                number: "Please enter a valid number.",
                min: `Value must be at least ${MIN_LIMIT}.`,
                max: `Value must be at most ${MAX_LIMIT}.`
            },
            maxRow: {
                required: "Please enter a maximum row value.",
                number: "Please enter a valid number.",
                min: `Value must be at least ${MIN_LIMIT}.`,
                max: `Value must be at most ${MAX_LIMIT}.`
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        submitHandler: function(form) {
            generateTable();
            return false; // Prevent actual form submission
        }
    });
});