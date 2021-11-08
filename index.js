var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;

function initApplication() {
    console.log('mustang starting meow'); 
}

function loadIndex() {
    var indexRequest = new XMLHttpRequest();
    //indexRequest.open('GET', 'https://mustangindex-prg.azurewebsites.net/index.json'); // works perfect with my link
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');     // has console error
    indexRequest.onload = function() {
        console.log("index JSON:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        contactURLArray.length = 0;
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("contactURLArray: " + JSON.stringify(contactURLArray));
    }
    indexRequest.send();
}

function loadContacts() {
    contactArray.length = 0;
    loadingContact = 0;
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

function loadNextContact(URL) {
    console.log("url: " + URL);
    contactRequest = new XMLHttpRequest();
    //contactRequest.onreadystatechange = showContents;
    contactRequest.open('GET', URL, true);
    contactRequest.onreadystatechange = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        console.log("contact: " + contact.firstName);
        contactArray.push(contact);
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);
        if (contactRequest.readyState == 0) {
            document.getElementById("statusID").innerHTML = "Uninitiated; object contains no data";
        } else if (contactRequest.readyState == 1) {
        document.getElementById("statusID").innerHTML = ":  Loading:  object is currently loading its data";
        } else if (contactRequest.readyState == 2) {
            document.getElementById("statusID").innerHTML = "Loaded; object has finished loading its data";
        } else if (contactRequest.readyState == 3) {
            document.getElementById("statusID").innerHTML = "Interactive; user may interact with the object even though its is not fully loaded";
        } else if (contactRequest.readyState == 4) {
            document.getElementById("statusID").innerHTML = "Complete; object has finished initializing";}

        loadingContact++;
        if (contactURLArray.length > loadingContact) {
            loadNextContact(contactURLArray[loadingContact]);
        }
    }
    contactRequest.send(null);
    //contactRequest.send();
}

function logContacts() {
    console.log(contactArray);
    document.getElementById("logID").innerHTML = "contacts logged to console";
}
