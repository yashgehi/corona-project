const districtInput = document.getElementById('districtInput')
const output = document.getElementById('output')
const error = document.getElementById('error')
const statesInput = document.getElementById('statesDropdown')
const loading = document.getElementById('loading')
const statesDropdown = document.querySelector('#states')
const districtsDropdown = document.querySelector('#districtsDropdown')
const m1 = document.getElementById('m1');
const m2 = document.getElementById('m2');
const m3 = document.getElementById('m3');
const m4 = document.getElementById('m4');
const m5 = document.getElementById('m5');
const m6 = document.getElementById('m6');
const header = document.getElementById('header');

$(document).ready(function(){
    $("#card1").css("center-block")   
});


var wholeData;
function district(){    
    fetch('https://api.covid19india.org/state_district_wise.json').then((response)=>{
        response.json().then((data)=>{
            wholeData = data;
            let states = Object.keys(data)
            let stateHTML = '<option> Please Select your state</option>'
            let p;
            for(p = 1; p < states.length; p++){
                stateHTML += `<option value = "${states[p]}">${states[p]}</option>`
            }
            statesDropdown.innerHTML = stateHTML
            loading.textContent = ''
            statesInput.style.display = "block";
        })
    }).catch((error)=>{
        loading.textContent = 'failed to load. Please check your connection!'
    })

    statesDropdown.addEventListener('change', districtState)
}
district();

function districtState(){
    output.style.display = "none";
    if(!wholeData[statesDropdown.value]){
        return districtsDropdown.textContent = "please select a valid option"
    }

    districts = Object.keys(wholeData[statesDropdown.value].districtData)
    districtsData = wholeData[statesDropdown.value].districtData

    districtHTML = '<label>District:  </label><select name="districts" id="districts">'
    let p;
    for(p=0; p<districts.length; p++){
        districtHTML += `<option value = "${districts[p]}">${districts[p]}</option>`
    }
    districtHTML += '</select>'
    districtsDropdown.innerHTML = districtHTML
    
    document.getElementById('districts').addEventListener('change', ()=>{
        districtName = document.getElementById('districts').value
        var data = districtsData[districtName];
        header.textContent = districtName;
        m1.textContent = data.active;
        m6.textContent = data.deceased;
        m5.textContent = data.recovered;
        m2.textContent = data.delta.confirmed;
        m4.textContent = data.delta.deceased;
        m3.textContent = data.delta.recovered;
        output.style.display = "block";
    })
}
