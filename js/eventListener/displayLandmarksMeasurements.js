/** 
 * Display Landmarks and/or Measurements
 * 
 * Retrieves values from database and prints them on web page
*/

window.addEventListener("load", () => {
    // uncheck everything from previous session (autocomplete=off)
    var allCheck = document.querySelectorAll('input[type=checkbox]')
    for(var i=0; i<allCheck.length; i++) {
        allCheck[i].checked = false
    } // end for

    var sql = { // get Landmark and Measurement names
        JSON_Type:  'Landmark_And_Measurement_Tables',
        sqlM:       'SELECT Type, Name, MeasurementAbbrv FROM measurement ORDER BY FIELD(Type, \'Distances\', \'Distances - Surface\', \'Angles\', \'Ratios\', \'Areas - Surface\', \'Volumes\');',
        sqlL:       'SELECT Name, LandmarkAbbrv FROM landmark;'
    } // end sql
    postCheckbox(sql)
    

    function postCheckbox(zaJson) {
        // post request to db, result data sent to be displayed on web page
        $.ajax({
            method: 'POST',
            url: 'https://localhost:8000',
            data:       JSON.stringify(zaJson),
            dataType:   'json',
            contentType: 'text/plain',
            success: function(data) { // https://www.tutorialsteacher.com/jquery/jquery-ajax-method
                showBox(data.body.Measurements, data.body.MeasurementAbbreviation, data.body.MeasurementType, "Measurement")
                showBox(data.body.Landmarks, data.body.LandmarkAbbreviation, {}, "Landmark")
            } // end success
        }); // end testPost
    } // end postCheckbox

    function showBox(name, abbrv, type, divID) { // insert db values into html div/box
        var myDiv = document.getElementById(divID)
        var typeFlag = ""

        for(var i=0; i<name.length; i++) {
            if(divID=="Measurement") {
                if(typeFlag!=type[i]) {
                    var br = document.createElement('br')
                    var hr = document.createElement('hr')
                    
                    var typeHeader = document.createElement('label')
                    typeHeader.style.fontWeight = "bold"
                    typeHeader.style.padding = "5px"
                    typeHeader.style.marginBottom = "0px"
                    typeHeader.appendChild(document.createTextNode(type[i]))

                    if(typeFlag!="") {myDiv.appendChild(br)} 
                    myDiv.appendChild(typeHeader)
                    myDiv.appendChild(hr)
                    typeFlag = type[i]
                } // end typeFlag if
            } // end divId if


            var checkbox = document.createElement('input')
            checkbox.type = "checkbox"
            checkbox.id = name[i]
            checkbox.value = abbrv[i]
            var label = document.createElement('label')
            label.htmlFor = name[i]
            label.appendChild(document.createTextNode(name[i]))

            var div = document.createElement('div')
            div.appendChild(checkbox)
            div.appendChild(label)

            myDiv.appendChild(div)
        } // end for
    } // end showBox

    // 'Select All' buttons
    let measurementButton = document.getElementById('selectAllMeasurement')
    let landmarkButton = document.getElementById('selectAllLandmark')

    measurementButton.addEventListener("click", () => {
        (selectAllLandmarkOrMeasurement('Measurement'))
    }) // end measurementButton event listener
    landmarkButton.addEventListener("click", () => {
        (selectAllLandmarkOrMeasurement('Landmark'))
    }) // end landmarkButton event listener

    function selectAllLandmarkOrMeasurement(thisId) {
        let flag
        let inputs = document.querySelectorAll('#' + thisId + ' input[type=checkbox]:not(:checked)')
        if(inputs.length>0) {
            flag = false
        } else {
            inputs = document.querySelectorAll('#' + thisId + ' input[type=checkbox]:checked')
            flag = true
        }
        inputs.forEach((e) => {
            if(flag) {
                e.checked = false
            } else {
                e.checked = true
            } // end if else
        }) // end forEach
    } // end selectAllLandmarkOrMeasurement
}) // end load event listener