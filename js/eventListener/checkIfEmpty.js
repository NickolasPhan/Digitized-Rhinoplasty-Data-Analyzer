/**
 * Check If Empty
 * 
 * Checks if any required user input is left empty
 */

function checkIfEmptyDriver(emptyArr, landMeasChoice) {
    // check if html elements are emtpy, add to array
    if(checkIfEmpty('genderCheckboxDropdown')) emptyArr.push('Gender')
    if(checkIfEmpty('ethnicityCheckboxDropdown')) emptyArr.push('Ethnicity')
    if(checkIfEmpty('surgeryCheckboxDropdown')) emptyArr.push('Facial Surgery')
    if(checkIfEmpty(landMeasChoice)) emptyArr.push(landMeasChoice)
    if(checkIfEmpty('statsCheckboxes')) emptyArr.push('Statistics')
    if(document.getElementById('ageStart').value=="") emptyArr.push('Age Start')
    if(document.getElementById('ageEnd').value=="") emptyArr.push('Age End')

    return emptyArr
} // end checkIfEmptyDriver

function checkIfEmpty(parentId) {
    // function to check checkbox inputs
    let flag
    let inputs = document.querySelectorAll('#' + parentId + ' input[type=checkbox]')
    for(var i=0; i<inputs.length; i++) {
        if(!inputs[i].checked) {
        flag = true
        } else {
        return false
        } // end if else
    } // end for
    return flag
} // end checkIfEmpty

function printEmptyError(emptyArr) {
    // print error message
    document.getElementById('output').style.display = "none"
    let output = document.getElementById('errorOutput')
    output.innerHTML = "Input required:<br>"
    output.append(emptyArr.join(', '))
    output.style.color = "red"
} // end printEmptyError