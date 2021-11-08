var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;
let statusCounter = 0;

function initApplication() {
    console.log('mustang starting meow'); 
}

async function loadIndex() {
    const response = await fetch("https://mustang-index.azurewebsites.net/index.json")
    const contactIndex = await response.text()

    console.log("Index JSON:\n\n" + contactIndex);
    document.getElementById("indexID").innerHTML = contactIndex
    

    const response2 = await fetch("https://mustang-index.azurewebsites.net/index.json")
    const contactIndexJ = await response2.json()

    for (i=0; i<contactIndexJ.length; i++) {
        contactURLArray.push(contactIndexJ[i].ContactURL);
    }
    console.log("contactURL: " + JSON.stringify(contactURLArray));
}

function loadContacts() {
    contactArray.length = 0;
    loadingContact = 0;
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

async function loadNextContact(URL) {
    console.log("url: " + URL);
    const response = await fetch(URL)
    const contactResponse = await response.text()
    contact = JSON.parse(contactResponse)
    console.log(contactResponse)
    console.log("contact: " + contact.firstName);
    contactArray.push(contact); 
    document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);
    console.log(contactArray)

    //vince helped me with this. i originally had it printing if statements for contactRequest.readyState
    //but it was not updating properly.

/*   if (contactRequest.readyState == 0) {
            document.getElementById("statusID").innerHTML = "Uninitiated; object contains no data";
        } else if (contactRequest.readyState == 1) {
        document.getElementById("statusID").innerHTML = ":  Loading:  object is currently loading its data";
        } else if (contactRequest.readyState == 2) {
            document.getElementById("statusID").innerHTML = "Loaded; object has finished loading its data";
        } else if (contactRequest.readyState == 3) {
            document.getElementById("statusID").innerHTML = "Interactive; user may interact with the object even though its is not fully loaded";
        } else if (contactRequest.readyState == 4) {
            document.getElementById("statusID").innerHTML = "Complete; object has finished initializing";}
*/


    document.getElementById("statusID").innerHTML = "status: " + statusCounter;
    i++;
    statusCounter = "";
    statusCounter = statusCounter + "loading contact#: " + i;
    if(i => 38){
        statusCounter = "";
        statusCounter = statusCounter + "all contacts loaded";
    }

   

    loadingContact++;
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}


function logContacts() {
    console.log(contactArray);
    document.getElementById("logID").innerHTML = "contacts logged to console";
}
