const $inputBoxes = $('.activities input');
// console.log($inputBoxes);

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
    
    // console.log($totalActivityCost);
    let $activityDate = $checkedBox.attr('data-day-and-time');
    console.log($activityDate);

    // Now i need to compare the activity that was clicked (checkedbox) with all other activites, to disable conflicting times. 

    $.each($inputBoxes, function(i){
        let $checkboxData = $inputBoxes.attr('data-day-and-time');
        console.log($checkboxData);
        if($activityDate === $checkboxData && $checkedBox[i] !== $inputBoxes[0]) {
            
            if($checkedBox.prop('checked')){
                
            // then disable all other matching data-and times prop('disabled',true)
                $inputBoxes[i].setAttribute('disabled',true);
            } else if($checkedBox.prop('checked') === false){
            // then enable all other matching data prop('enabled',true)
                $inputBoxes[i].setAttribute('enabled',true);
            }

        }

    })


    return $totalActivityElement.val($totalActivityCost);


});

