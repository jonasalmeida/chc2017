console.log('loaded chc2017.js')

function chc2017(){
    localStorage.chc2017_client_id='b3f7136b-f9ca-4498-96e8-d09e15ce00b5'
    localStorage.chc2017_app_id='6c9bee89-d529-4593-a156-7e36513a6042'
    if(location.href.match("http://localhost:8000/chc2017")){
        localStorage.chc2017_client_id='d737b157-faef-4bfc-b7fe-2fc17e2f2794'
        localStorage.chc2017_app_id='9934f08b-760e-4256-b5d7-b10c7813ecec'
    }
    
    if(document.getElementById('chc2017Div')){ // call it by default only if from the default index.html
        console.log('root div found')
        appLink.innerHTML='This patient facing App is registered at <a href="https://code.cerner.com/developer/smart-on-fhir/apps/'+localStorage.chc2017_app_id+'" target="_blank">https://code.cerner.com/developer/smart-on-fhir/apps/'+localStorage.chc2017_app_id+'</a>'
        callAuth.onclick=chc2017.auth
        if(location.search.length>0){
            if(location.search.match('code=')){
                var h = '<h3 style="color:green">This is the response of the OAUTH2 call, check original window for the syntax of the URL call</h3>'
                h += '<p style="color:blue">'+location.search+'</p>'
                h += '<h4><button id="getAccessToken">Get Access token</button></h4>'
                chc2017Div.innerHTML=h
                getAccessToken.onclick=function(){
                    
                }

            }else if(true){
                debugger
            }
                
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
    var url='https://authorization.sandboxcerner.com/tenants/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca/protocols/oauth2/profiles/smart-v1/personas/patient/authorize?redirect_uri='+location.href+'&client_id='+localStorage.chc2017_client_id+'&state='+state+'&response_type=code&aud=https://fhir-myrecord.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca&scope=patient/Patient.read'

    console.log([url])

    window.open(url)

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