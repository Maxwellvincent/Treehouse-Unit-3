// Focus the form to the first text input
$('#name').focus();

// create a text field that shows when "other" option is selected from the Job role drop down menu
$('#other-title').show();

// T- Shirt Selection Hide the Select option theme 
$('#design').find("option").eq(0).hide();

// Creates a new Option element to have this shown first, with selected attribute list
$('#color').prepend("<option selected>Please Select a T-Shirt Theme</option>");

// Hides all color options 
$('#color option[value !=all]').hide();