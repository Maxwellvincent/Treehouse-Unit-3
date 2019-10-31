const inputBoxes = $('.activities input');
// console.log(inputBoxes);

// Focus the form to the first text input
$('#name').focus();

// create a text field that shows when "other" option is selected from the Job role drop down menu
$('#other-title').show();

// T- Shirt Selection Hide the Select option theme 
// $('#design').find("option").eq(0).hide();
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
let nameField = $('#name').val();

    $('button').click(function(event){
        // console.log("Button was clicked");

            function nameValidate (){
                if(nameField == ""){
                    alert("please eneter name!");
                   nameField.focus();
                    return false;
                }
            }
            // // Email Validation
            // function emailValidate (){
            //     var email = $('#mail');
            //     var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
            //     if (!filter.test(email.value)) {
            //     alert('Please provide a valid email address');
            //     email.focus;
            //     return false;
            //     }
            // }
        
            // // Activity Section Validation
            // function activityChecked (){
            //     if(inputBoxes.checked){
            //         alert('please select and activity');
            //         inputBoxes.focus;
            //         return false;
            //     }
            // }
            // // Credit Card Validation (only if credit card is selected)
            // function creditValidate (){
            //     if($('#payment').val() === 'Credit Card'){
            //         let cardNumberfield = $('cc-num').val();
            //         let matchCardNumber = /^(?:3[47][0-9]{13})$/;
            //         let cardZip = $('#zip').val();
            //         let zipValid = /^[0-9]{5}(?:-[0-9]{4})?$/;
            //         let cvv = $('#cvv').val();
            //         let cvvValid = /^[0-9]{3,4}$/
        
            //         if(cardNumberfield !== matchCardNumber){
            //             alert('Please enter a valid credit card number!');
            //             $('cc-num').focus;
            //             return false;
            //         }
            //         // zip code validation (only if credit card is selected)
            //         if(cardZip !== zipValid){
            //             alert('Please enter Valid Zip-Code!')
            //             $('#zip').focus;
            //             return false;
            //         }
            //         // cvv only if CC is selected
            //         if(cvv !== cvvValid){
            //             alert('Please enter Valid cvv!')
            //             ('#cvv').focus;
            //             return false;
            //         }
            //     }
            // }
            event.preventDefault();
    });
   
