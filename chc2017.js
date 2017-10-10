console.log('loaded chc2017.js')

function chc2017(){
    if(document.getElementById('chc2017Div')){ // call it by default only if from the default index.html
        console.log('root div found')
        callAuth.onclick=chc2017.auth
        if(location.search.length>0){
            chc2017Div.innerHTML='<h3 style="color:green">This is the response of the OAUTH2 call, check original window for the syntax of the URL call</h3>'
        }
    }
    
    //debugger

}

chc2017.ex3=function(){ // call with header
    $.getJSON('https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/AllergyIntolerance?patient=4342012').then(function(x){console.log('exercise 3: ',x)})
    //debugger
}

chc2017.ex4=function(){
    $.getJSON('https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/MedicationStatement?status=active&patient=4342012').then(function(x){console.log('exercise 4: ',x)})
}

chc2017.auth=function(){ // oauth authentication
    // following documentation at http://fhir.cerner.com/millennium/dstu2/
    // and http://fhir.cerner.com/authorization/
    // and http://fhir.cerner.com/smart/
    // Your SMART app chc2017 is registered,
    //    Client-id: b3f7136b-f9ca-4498-96e8-d09e15ce00b5

    // https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/

    // patient FHIR Base URL is at https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca
    // use https://authz-demo.sandboxcerner.com/client/demo to go through teh moves

    var state= Math.random().toString().slice(2)+Date.now()
    var url='https://authorization.sandboxcerner.com/tenants/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/protocols/oauth2/profiles/smart-v1/personas/patient/authorize?redirect_uri='+location.href+'&client_id=b3f7136b-f9ca-4498-96e8-d09e15ce00b5r&state='+state+'&response_type=code&aud=https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca'

    console.log([url])

    window.open('https://authorization.sandboxcerner.com/tenants/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/protocols/oauth2/profiles/smart-v1/personas/patient/authorize?redirect_uri='+location.href+'&client_id=b3f7136b-f9ca-4498-96e8-d09e15ce00b5&state='+state+'&response_type=code&aud=https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca')

    fullAuthUrlCall.textContent=url



    //debugger
}


$(function(){
    chc2017()
})



// reference
// https://developer.box.com/reference

/*

https://authorization.sandboxcerner.com/tenants/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/protocols/oauth2/profiles/smart-v1/personas/patient/authorize?client_id=b3f7136b-f9ca-4498-96e8-d09e15ce00b5&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fchc2017%2F&scope=patient%2FPatient.read&launch=&aud=https%3A%2F%2Ffhir-myrecord.sandboxcerner.com%2Fdstu2%2F0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca&state=2c0399fa-f93c-4558-9f93-be459b9259bd

*/