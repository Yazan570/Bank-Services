
let serviceCatalogData={};
function getCurrentFormData() {
    return {
        serviceName: document.getElementById('txt1')?.value || "",
        serviceCode: document.getElementById('txt2')?.value || "",
        serviceDescription: document.getElementById('serviceDescription')?.value || "",
        serviceType: document.querySelector('input[name="stype"]:checked')?.value || "",
        financialType: document.querySelector('input[name="fn"]:checked')?.value || "",
        businessOwner: document.getElementById('ownerText')?.value || "",
        isCommonService: document.querySelector('input[name="common"]:checked')?.value || "",
        businessPriority: document.getElementById('businessPriority')?.value || "",
        businessContacts: document.getElementById('businessContacts')?.value || "",
        ITServiceOwners: document.getElementById('ITServiceOwners')?.value || "",
        ITContact: document.getElementById('ITContact')?.value || "",
        hasSLA: document.querySelector('input[name="sla"]:checked')?.value || "",
        serviceHours: document.getElementById('serviceHours')?.value || "",
        serviceDays: document.getElementById('serviceDays')?.value || "",
        deliveryMethods: document.getElementById('serviceDeliveryMethods')?.value || "",
        deliveryChannel: document.getElementById('ch-del')?.value || "",
        qualification: document.getElementById('serviceQual')?.value || "",
        lifecycle: document.getElementById('serviceLife')?.value || "",
        reviews: document.getElementById('serviceReviews')?.value || "",
        requestProcedures: document.getElementById('requestProcedures')?.value || "",
        pricing: document.getElementById('prices')?.value || "",
        fees: document.getElementById('fees')?.value || "",
        commission: document.getElementById('commision')?.value || "",
        categories: Array.from(document.querySelectorAll('.checkboxGrid input[type="checkbox"]:checked')).map(c => c.value),
        imageUrl: URL.createObjectURL(inputFile.files[0])
    };
}


function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar--visible");
}
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");
const removeBtn = document.getElementById("remove-btn");
const cloudIcon = document.getElementById("cloud");
const dragText = document.getElementById("dragKalam");
function uploadImage() {
    const file = inputFile.files[0];
    if (!file) return;
    const imgLink = URL.createObjectURL(file);
    imageView.style.backgroundImage = `url(${imgLink})`;
    imageView.style.backgroundSize = "contain";
    imageView.style.backgroundPosition = "center";

    cloudIcon.style.display = "none";
    dragText.style.display = "none";
    removeBtn.style.display = "inline-block";
}
inputFile.addEventListener("change", uploadImage);
removeBtn.addEventListener("click", () => {
    imageView.style.backgroundImage = "none";
    cloudIcon.style.display = "block";
    dragText.style.display = "block";
    removeBtn.style.display = "none";
    const newInput = inputFile.cloneNode(true);
    inputFile.parentNode.replaceChild(newInput, inputFile);
    newInput.addEventListener("change", uploadImage);
});
let updCrt = 0;
let idToUpdate;
let cardNeeded;



function popupMenu(event){
    const trigg = event.currentTarget;
    if(trigg.id != 'btnHead'){
        updCrt=1;
        cardNeeded = trigg.parentElement;
        idToUpdate = cardNeeded.getAttribute('data-service-id');
    } 
    else updCrt=0;
    const menu=document.querySelector(".popup");
    menu.classList.add("popup_active");
}
function closeMenu(){
    const menu=document.querySelector(".popup");
    menu.classList.remove("popup_active");
}





let loggedInUser;

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/users/loggedIn',{
        method:"GET",
        credentials: "include"
    }).then(response => response.json()).then(data => {
        const nameDiv = document.querySelector('.sidebar__user-name');
        const roleDiv = document.querySelector('.sidebar__user-role');
        loggedInUser = data.id;
        if(data.id!=1) {
            roleDiv.textContent = "User";
            nameDiv.textContent = `${data.name}`;
        }
        else{
            roleDiv.textContent = "System Admin";
            nameDiv.textContent = "Yazan Alfanney";
        }  
    return fetch('http://localhost:8080/services');    
    }).then(response=>{
        if(!response.ok) throw new Error("Network response error.");
        return response.json();
    }).then(data => {
        let counter = 0;
        for(let i of data){
            if(loggedInUser==1 || i.user_id==loggedInUser){
            counter++;
         backendId = i.id;
            const cardsGrid = document.getElementById("cards__grid");
            if(backendId%3==1){
                const safeImageUrl = i.imageUrl ? `${i.imageUrl}` : 'fallback.jpg';
                //let imgLink=URL.createObjectURL(inputFile.files[0]);
                image1.innerHTML=`<img src="${safeImageUrl}" alt="User Provided No Image">`;
                title1.innerHTML=`<h3>${i.name}</h3>`;
                category1.textContent = i.category;
                desc1.textContent=i.description;
                card1.setAttribute('data-service-id',backendId);  
                cardsGrid.append(card1.cloneNode(true));
            }
            else if(backendId%3==2){
                //let imgLink=URL.createObjectURL(inputFile.files[0]);
                const safeImageUrl = i.imageUrl ? `${i.imageUrl}` : 'fallback.jpg';

                image2.innerHTML=`<img src="${safeImageUrl}" alt="User Provided No Image">`;
                title2.innerHTML=`<h3>${i.name}</h3>`;
                category2.textContent = i.category;
                desc2.textContent=i.description;
                card2.setAttribute('data-service-id',backendId);          
                cardsGrid.append(card2.cloneNode(true));
            }
            else{
                //let imgLink=URL.createObjectURL(inputFile.files[0]);
                const safeImageUrl = i.imageUrl ? `${i.imageUrl}` : 'fallback.jpg';

                image3.innerHTML=`<img src="${safeImageUrl}" alt="User Provided No Image">`;
                title3.innerHTML=`<h3>${i.name}</h3>`;
                category3.textContent = i.category;
                desc3.textContent=i.description;
                card3.setAttribute('data-service-id',backendId);      
                cardsGrid.append(card3.cloneNode(true));
            }
        }
        if(counter==1){
                document.getElementById("countServices").innerHTML=`${counter} Service`;
                bigCount=counter;
        }
            else {document.getElementById("countServices").innerHTML=`${counter} Services`; bigCount=counter;}
                console.log('Backend Response: ',data);
    
    }    
        }).catch(error => {
    // Handle any errors that occurred during the fetch operation
    console.error('Fetch error:', error);
    });

    
        
    const inputContainers = document.querySelectorAll('.input-container');
    const input1 = document.querySelector('#email');
    const input2 = document.querySelector('#password');
    const label1 = document.querySelector('label[for=email]');
    const label2 = document.querySelector('label[for=password]');
    if(input1 && input2 && label1 && label2){
        function ch(){
            if(input1.value.trim()!=='') label1.classList.add('has-content');
            else label1.classList.remove('has-content');
            if(input2.value.trim()!=='') label2.classList.add('has-content');
            else label2.classList.remove('has-content');
        }
        ch();
        input1.addEventListener('input',ch);
        input2.addEventListener('input',ch);
    }
    inputContainers.forEach(container => {
        const input = container.querySelector('input');
        const label = container.querySelector('label');
        
        if (input && label) {
            function checkInputContent() {
                if (input.value.trim() !== '') {
                    container.classList.add('has-content');
                } else {
                    container.classList.remove('has-content');
                }
            }
            checkInputContent();
            
            input.addEventListener('input', checkInputContent);
        }
    });

    fetch('http://localhost:8080/users').then(response => {
         if(!response.ok) throw new Error("Network response error.");
        return response.json();
    }).then(data => {
        const users = document.querySelector('.users');
        const userDivTemp = document.querySelector('.userInfo');
        userDivTemp.classList.add('userInfo-active');
        users.append(userDivTemp);
        const b = userDivTemp.querySelector('#userTableBody');
        const row = userDivTemp.querySelector('#userTableBody > tr:first-child');
        b.innerHTML='';
        for(let i of data){
            const r = row.cloneNode(true);
            const adminBttn = r.querySelector('#deleteUserBttn');
            if(i.id==1) {adminBttn.remove();}
            r.querySelector('#idPar').textContent = `${i.id}`;
            r.querySelector('#namePar').textContent = `${i.username}`;
            b.appendChild(r);
        }    
    }).catch(error => {
    // Handle any errors that occurred during the fetch operation
    console.error('Fetch error:', error);
    });


    
});





let backendId;
let count=0;
let bigCount=0;
const card1=document.getElementById("uni");
const image1=card1.querySelector("#cardIconDiv");
const title1=card1.querySelector("#cardTitle");
const category1=card1.querySelector("#cardCategory");
const desc1=card1.querySelector("#cardDescription");

const card2=document.getElementById("desktop");
const image2=document.querySelector("#cardIconDiv2");
const title2=card2.querySelector("#cardTitle");
const category2=card2.querySelector("#cardCategory");
const desc2=card2.querySelector("#cardDescription");

const card3=document.getElementById("print");
const image3=document.querySelector("#cardIconDiv3");
const title3=card3.querySelector("#cardTitle");
const category3=card3.querySelector("#cardCategory");
const desc3=card3.querySelector("#cardDescription");
document.getElementById("cards__grid").innerHTML="";
function collectData(){
    serviceCatalogData = getCurrentFormData();
    if(updCrt == 0){
         count+=1;
        if(count>3)count=1;
        bigCount+=1;
        const formData = new FormData();
        formData.set('name',serviceCatalogData["serviceName"]);
        formData.set('category',serviceCatalogData["categories"].join(", "));
        formData.set('description',serviceCatalogData["serviceDescription"]);
        formData.set('imageUrl',inputFile.files[0]);
        formData.set('user_id',loggedInUser);
        //Connect to back-end.
        fetch('http://localhost:8080/services',{
            method:'POST',
            body:formData
        }).then(response => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();
        }).then(data=>{
            backendId = data[0].id;
            const cardsGrid = document.getElementById("cards__grid");
            if(count==1){
                let imgLink=URL.createObjectURL(inputFile.files[0]);
                image1.innerHTML=`<img src="${imgLink}" alt="User Provided No Image">`;
                title1.innerHTML=`<h3>${serviceCatalogData["serviceName"]}</h3>`;
                category1.textContent = serviceCatalogData["categories"].join(", ");
                desc1.textContent=serviceCatalogData["serviceDescription"];
                card1.setAttribute('data-service-id',backendId);  
                cardsGrid.append(card1.cloneNode(true));
            }
            else if(count==2){
                let imgLink=URL.createObjectURL(inputFile.files[0]);
                image2.innerHTML=`<img src="${imgLink}" alt="User Provided No Image">`;
                title2.innerHTML=`<h3>${serviceCatalogData["serviceName"]}</h3>`;
                category2.textContent = serviceCatalogData["categories"].join(", ");
                desc2.textContent=serviceCatalogData["serviceDescription"];
                card2.setAttribute('data-service-id',backendId);          
                cardsGrid.append(card2.cloneNode(true));
            }
            else{
                let imgLink=URL.createObjectURL(inputFile.files[0]);
                image3.innerHTML=`<img src="${imgLink}" alt="User Provided No Image">`;
                title3.innerHTML=`<h3>${serviceCatalogData["serviceName"]}</h3>`;
                category3.textContent = serviceCatalogData["categories"].join(", ");
                desc3.textContent=serviceCatalogData["serviceDescription"];
                card3.setAttribute('data-service-id',backendId);      
                cardsGrid.append(card3.cloneNode(true));
            }
            if(bigCount==1)
                document.getElementById("countServices").innerHTML=`${bigCount} Service`;
            else document.getElementById("countServices").innerHTML=`${bigCount} Services`;
                console.log('Backend Response: ',data);
            }).catch(error=>{
                console.error('Error sending data:',error);
            });
    }
    else{
        const content = cardNeeded.querySelector(".service-card__content");
        const title = content.querySelector('#cardTitle');
        const category = content.querySelector('#cardCategory');
        const description = content.querySelector('#cardDescription');
        const img = cardNeeded.querySelector('.service-card__icon');
        const formData = new FormData();
        const name = document.getElementById('txt1')?.value || "";
        const categories = Array.from(document.querySelectorAll('.checkboxGrid input[type="checkbox"]:checked')).map(c => c.value);
        const d = document.getElementById('serviceDescription')?.value || "";
        formData.set('name',name);
        formData.set('category',categories.join(", "));
        formData.set('description',d);
        formData.set('imageUrl',inputFile.files[0]);
        formData.set('user_id',loggedInUser);
        fetch(`http://localhost:8080/services/${idToUpdate.toString()}`,{
            method:'PUT',
            body:formData
        }).then(response => {
        if (!response.ok) throw new Error("Network response was not ok.");
        return response.json();}).then(data=>{
            title.textContent = data[0].name;
            category.textContent = data[0].category;
            description.textContent = data[0].description;
            img.innerHTML = `<img src="${data[0].imageUrl}" alt="User Provided No Image"></img>`
            console.log("Backend Updated data to ==> ", data);
        }).catch(error=>{
            console.error("Error in updating data: ", error);
        });
    }
    closeMenu();
}
function handleDelete(event){
    const myBtn = event.currentTarget;
    const cardDel = myBtn.parentElement;
    const cId = cardDel.getAttribute('data-service-id');
    console.log(cId);//Debuggggggg :)
    cardDel.remove();
    if(cId){
        fetch(`http://localhost:8080/services/${cId.toString()}`,{
            method:'DELETE',
        })
        .then(res=>res.json()).then(data=>{
             bigCount--;
     if(bigCount==1)
        document.getElementById("countServices").innerHTML=`${bigCount} Service`;
    else document.getElementById("countServices").innerHTML=`${bigCount} Services`;
            console.log("Deleted form server: ", data);
        }).catch(err=>{
            console.error("Failed to delete from server: ",err);
        });
    }
}




















const dropArea = document.getElementById("drop-area");

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, e => e.preventDefault());
    dropArea.addEventListener(eventName, e => e.stopPropagation());
});

["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.add("highlight");
    });
});

["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove("highlight");
    });
});

dropArea.addEventListener("drop", e => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
        // Trick: Manually set files to input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        inputFile.files = dataTransfer.files;
        uploadImage();
    }
});





const usersTab = document.querySelector('#usersTab');
usersTab.addEventListener('click',function(){
   const hideEls = document.querySelectorAll('.main > :nth-child(n+2)');
   for(let x of hideEls){
        x.style.display = "none";
   }
   const showDiv = document.querySelector('.users');
   showDiv.style.display = "block";
});

const catalogTab = document.querySelector('#catalogTab');
catalogTab.addEventListener('click',function(){
   const hideEls = document.querySelectorAll('.main > :nth-child(n+2)');
   for(let x of hideEls){
        x.style.display = "block";
   }
   const showDiv = document.querySelector('.users');
   showDiv.style.display = "none";
});


function rem(e){
    const me = e.currentTarget;
    const make = me.parentElement;
    make.remove();
}


function deleteUser(event){
    event.preventDefault();
    const bttn = event.currentTarget;
    const par = bttn.parentElement;
    const mainPar = par.parentElement;
    const idPar = mainPar.firstElementChild;
    const id = idPar.textContent;
    fetch(`http://localhost:8080/users/${id}`,{
        method:"DELETE",
    }).then(response=>{
        if(!response.ok) {
            /*const alertDiv = document.createElement('div');
            alertDiv.textContent="!!Access Denied!!";
            alertDiv.classList.add('alertAccess');
            const clearBttn = document.createElement('button');
            clearBttn.textContent="OK";
            clearBttn.classList.add("inButton");
            clearBttn.onclick = (e) => rem(e);
            alertDiv.appendChild(clearBttn);
            document.body.appendChild(alertDiv);*/
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            console.log("Failed to delete, might be due to access issues.");
        }
        else return response.json();
    }).then(data => {
        const id = data[0].id;
        mainPar.remove();
        Swal.fire({
            icon: "success",
            title: "Deleted",
            text: "User deleted successfuly!",
        });
    }).catch(error => {
    // Handle any errors that occurred during the fetch operation
    console.error('Fetch error:', error);
    });
}