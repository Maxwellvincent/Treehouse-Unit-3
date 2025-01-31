const inputBoxes = $('.activities input');
// console.log(inputBoxes);

// Focus the form to the first text input
$('#name').focus();

// credit card is the first selected method
$('#payment option[value="Credit Card"]').prop('selected',true);
$('#paypal').hide();
$('#bitcoin').hide();


// create a text field that shows when "other" option is selected from the Job role drop down menu
// Future reference element needs to be created before function, element is created within HTML which allows it to be interacted with 
// using Jquery in script;


$('#otherJob').hide();
$('#title').change(function(e){
    let jobSelect = e.target.value;
    if(jobSelect === "other"){
        $('#otherJob').show();
    } else {
        $('#otherJob').hide();
    }
})



// T- Shirt Selection Hide the Select option theme 
$('#design').find("option").eq(0).hide();
// These do the same exact thing
// $('#design').find("option").eq(0).attr({"hidden":"true","disabled":"true"});

// Creates a new Option element to have this shown first, with selected attribute list
$('#color').prepend("<option selected>Please Select a T-Shirt Theme</option>");

// Hides all color options 
$('#color option[value !=all]').attr("hidden","true");

// Grab the design select element add an event listener 
$('#design').on("change", function(e){
    if(this.value === "js puns"){
        $('#color option[value=cornflowerblue]').attr("selected","selected").show();
        $('#color option[value=darkslategrey]').show();
        $('#color option[value=gold]').show();

        $('#color option[value=tomato]').removeAttr("selected","selected").hide();
        $('#color option[value=steelblue]').hide();
        $('#color option[value=dimgrey]').hide();

    }else if(this.value === "heart js"){
        $('#color option[value=cornflowerblue]').removeAttr("selected","false").hide();
        $('#color option[value=darkslategrey]').hide();
        $('#color option[value=gold]').hide();

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
        // console.log(checkboxType); 
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
    console.log(this);
    // console.log(selectedPayment);
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
let username = $('#name');
let email = $('#mail');
let activity = $('.activities input')


$('form').on("submit input change", function(e){
    console.log(username.val());
    
    // Name validation

    if(username.val() < 1){
        $('#name-error').show();
        $('#name').focus();
        event.preventDefault();
    }else {
        $('#name-error').hide();
    }

    // Email validation

    if(email.val() < 1){
        $("#email-error").show();
        $('#mail').focus();
        event.preventDefault();
    }else{
        $('#email-error').hide();
        let emailEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(!emailEx.test(email.val())){
            $("email-error").show();
            $('mail').focus();
            e.preventDefault();
        }else {
            $('email-error').hide();
        }
    }
    
    // Activity Validation
    
    let counter = 0;
    for(let i =0; i < activity.length; i++){
        
        if(activity[i].checked){
            counter++;
        }
    }
    if(counter === 0){
        $('#activity-error').show();
        e.preventDefault();
    }else{
        $("#activity-error").hide();
        
    }
    
    // Credit Card Validation
    if($('#payment').val() === 'Credit Card'){

        let cardNumberfield = $('#cc-num').val();
        // console.log(cardNumberfield);
        let matchCardNumber = /^[0-9]{13,16}$/;
        
        let cardZip = $('#zip').val();
        // console.log(cardZip);
        let zipValid = /^[0-9]{5}(?:-[0-9]{4})?$/;
        let cvv = $('#cvv').val();
        let cvvValid = /^[0-9]{3,4}$/

        if(!matchCardNumber.test(cardNumberfield) || cardNumberfield === ""){
            $('#ccnum-error').show();
            $('#cc-num').focus;
            e.preventDefault();
           
        }else{
            $('#ccnum-error').hide();
        }
            // zip code validation (only if credit card is selected)
        if(!zipValid.test(cardZip) || cardZip === ""){
            $('#zip-error').show();
            $('#zip').focus;
            e.preventDefault();
        }else {
            $('#zip-error').hide();
        }
            // cvv only if CC is selected
        if(!cvvValid.test(cvv) || cvv === "" ){
            $('#cvv-error').show()
            $('#cvv').focus;
            e.preventDefault();
        } else {
            $('#cvv-error').hide();
            return true;
        }
    }
})


