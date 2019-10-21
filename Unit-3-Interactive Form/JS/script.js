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
    console.log($(event.target).val());
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

var $totalActivityElement = $('<input type="number" readonly>');
var $totalActivityCost = 0; 


$('.activities').append($totalActivityElement);
// add change event listener to the activity section, grabing the parent of class (activities)
$('.activities').change(function(e){

    // Gives me the input element that is clicked.
    // console.log($(event.target)); WORKS

    // set the input element to a variable
    var $checkedBox = $(event.target);
    // console.log($checkedBox);

    // Takes the attribute which is a string and turns it into a number, check with typeOf
    var $activityCost = parseInt(($checkedBox.attr('data-cost').substring(1)));
    // console.log($activityCost);

    //$checkedBox.attr('checked','true')

    if($checkedBox.attr("checked","true")){
        $totalActivityCost += $activityCost;
        // console.log($totalActivityCost);
    }else if($checkedBox.attr("checked","false")){
        $totalActivityCost -= $activityCost;
    }

    $totalActivityElement.val($totalActivityCost);
});

