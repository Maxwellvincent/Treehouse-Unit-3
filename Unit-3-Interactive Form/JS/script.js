const inputBoxes = $('.activities input');
// console.log(inputBoxes);

// Focus the form to the first text input
$('#name').focus();

// create a text field that shows when "other" option is selected from the Job role drop down menu
$('#other-title').show();

// T- Shirt Selection Hide the Select option theme 
$('#design').find("option").eq(0).hide();
$('#design').find("option").eq(0).attr({"hidden":"true","disabled":"true"});

// Creates a new Option element to have this shown first, with selected attribute list
$('#color').prepend("<option selected>Please Select a T-Shirt Theme</option>");

// Hides all color options 
$('#color option[value !=all]').attr("hidden","true");

// Grab the design select element add an event listener 
$('#design').change(function(e){
    // console.log($(event.target).val());
    if($(event.target).val() === "js puns"){
            $('#color option[value=cornflowerblue]').attr("selected","selected").show();
            $('#color option[value=darkslategrey]').show();
            $('#color option[value=gold]').show();
    }else if($(event.target).val() === "heart js"){
        $('#color option[value=tomato]').attr("selected","selected").show();
        $('#color option[value=steelblue]').show();
        $('#color option[value=dimgrey]').show();
    }
});

// ACTIVITY FORM SECTION
// create an element to display total activity cost

let $totalActivityElement = $('<label>Total Cost: </label><input type="number" name="Total Cost:" readonly>');
let $totalActivityCost = 0; 


$('.activities').append($totalActivityElement);
// add change event listener to the activity section, grabing the parent of class (activities)
$('.activities').change(function(e){

    // Gives me the input element that is clicked.
    // console.log(event);

    // set the input element to a variable, this is the element that is clicked
    let $checkedBox = $(event.target);
    // console.log(($checkedBox));

    // Takes the attribute which is a string and turns it into a number, check with typeOf
    let $activityCost = parseInt(($checkedBox.attr('data-cost').substring(1)));
    // console.log($activityCost);

    // Have to use checked.prop given that there isnt an inital attr element for the checkbox 
    // console.log(($checkedBox.prop('checked')));

    // if statement to add and subtract activities that are clicked on and off 
    if($checkedBox.prop('checked')){
        $totalActivityCost += $activityCost;
    } else if ($checkedBox.prop('checked') === false){
        $totalActivityCost -= $activityCost;
    }
    
    // // console.log($totalActivityCost);
    // let $activityDate = $checkedBox.attr('data-day-and-time');
    // console.log($activityDate);

    // Now i need to compare the activity that was clicked (checkedbox) with all other activites, to disable conflicting times. 

    let clicked = e.target;
    let clickedType = clicked.getAttribute('data-day-and-time');
    // console.log(clicked);
    // console.log(clickedType);
    for(let i = 0; i < inputBoxes.length; i++){
        let checkboxType = inputBoxes[i].getAttribute('data-day-and-time');
        console.log(checkboxType); 
        if(clickedType === checkboxType && clicked !== inputBoxes[i]){
            if(clicked.checked){
                inputBoxes[i].disabled = true;
            }else {
                inputBoxes[i].disabled = false;
            }
        }   
    }

    return $totalActivityElement.val($totalActivityCost);
});

// Payment Section 
// Need to hide the select payment option 
$('#payment option[value="select method"]').hide();

// Created a function that runs every time the select option is changed, and hide the different elements. 
$('#payment').change(function(e){
    let selectedPayment = $(this).val();
    console.log(selectedPayment);
    if(selectedPayment === 'Credit Card'){
        $('#paypal').hide();
        $('#bitcoin').hide();
        $('#credit-card').show();
    } else if (selectedPayment === 'PayPal'){
        $('#paypal').show();
        $('#credit-card').hide();
        $('#bitcoin').hide();
        
    }else{
        $('#paypal').hide();
        $('#credit-card').hide();
        $('#bitcoin').show();
    }

})

// Form Validation

    $('button').click(function(event){
        // console.log("Button was clicked");
        let nameField = $('#name').val();
        let lookforBoxes = $('.activities input');
        // console.log(nameField); Only works within the function, function is not aware of the variable outside. 
            function nameValidate (){
                if(nameField === ""){
                    $('#name').after('<span id="error-message"> Please Enter A Name </span>');
                   $('#name').focus();
                   return false;
                } else {
                    $('#error-message').hide();
                }
                
            }
            nameValidate();

            // // Email Validation
            function emailValidate (){
                var email = $('#mail').val();
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
                if (!filter.test(email)) {
                    $('#mail').after('<span id="error-message"> Please provide a valid email address </span>');
                    email.focus;
                    return false;
                } else {
                    $('#error-message').hide();
                }
            }
            emailValidate();
        
            // // Activity Section Validation
            function activityChecked (){
                // a counter 
                let boxesChecked = 0;
                // need to go through and check all boxes and see if they are checked, not just one
                for(let i = 0; i < lookforBoxes.length; i++){
                    
                    if(lookforBoxes[i].checked){
                        boxesChecked++;
                    }
                }

                if(boxesChecked === 0){
                    $('.activities legend').after('<span id="error-message"> Please Select an Activity </span>');
                   return false;
                } else {
                    $('#error-message').hide();
                }
            }
            activityChecked();

            // // Credit Card Validation (only if credit card is selected)
            function creditValidate (){
                if($('#payment').val() === 'Credit Card'){
                    let cardNumberfield = $('#cc-num').val();
                    // console.log(cardNumberfield);
                    let matchCardNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
                    let cardZip = $('#zip').val();
                    // console.log(cardZip);
                    let zipValid = /^[0-9]{5}(?:-[0-9]{4})?$/;
                    let cvv = $('#cvv').val();
                    let cvvValid = /^[0-9]{3,4}$/
        
                    if(matchCardNumber.test(cardNumberfield) === 'false' || cardNumberfield == ""){
                        $('#cc-num').after('<span id="error-message"> Please enter a valid credit card number! </span>');
                        $('#cc-num').focus;
                        return false;

                        // zip code validation (only if credit card is selected)
                    } else if(zipValid.test(cardZip) === 'false' || cardZip === ""){
                        $('#zip').after('<span id="error-message"> Please enter Valid Zip-Code! </span>');
                        $('#zip').focus;
                        return false;

                        // cvv only if CC is selected
                    } else if(cvvValid.test(cvv) === 'false' || cvv == "" ){
                        $('#cvv').after('<span id="error-message"> Please enter Valid cvv! </span>');
                        $('#cvv').focus;
                        return false;
                    }
                    
                }
            }
            creditValidate();

            event.preventDefault();
    });
   
