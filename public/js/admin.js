import { auth, signOut, onAuthStateChanged } from "./config.js";

const loading = document.querySelector(".loading");
const userBtn = document.querySelector(".user-btn");
const userMenu = document.querySelector(".user-menu");
const chevronIcon = document.querySelector(".chevron-down");
const signOutBtn = document.querySelector(".sign-out");
const userBtnName = document.querySelector(".user-btn-name");
const modal = document.querySelector(".popup-overlay");
const modalInner = document.querySelector(".popup");

onAuthStateChanged(auth, (user) => {
    if (user && user.uid === "nW2xockgUwdXcSpBZTOCoWSsc1h1") userBtnName.innerHTML = `Welcome, ${user.email.split("@")[0]}`;
    else location.href='/';
});

const populateData = async (domElem) => {

    try{
        const request = await fetch("/schedule");
        const data = await request.json();
        // console.log(data);
        var dataMarkup = '';
        data.data.forEach((entry, i) => {
            dataMarkup += `
            <li>
                <div class="schedule-item-admin" data-key="${i+1}">
                    <h3 class="schedule-title"><strong>Title:</strong> ${entry.title}</h3>
                    <p class="ff-inter fs-2s"><strong>Time:</strong> ${entry.time}</p>
                    <p class="ff-inter fs-2s"><strong>Link:</strong> ${entry.link}</p>
                    <p class="ff-inter fs-2s"><strong>Duration:</strong> ${entry.duration} hour(s)</p>
                    <div>
                        <a href="#" class="admin-cta admin-edit ff-inter fs-s">Edit</a>
                        <a href="#" class="admin-cta admin-delete ff-inter fs-s">Delete</a>
                    </div>
                    <br>
                </div>
            </li>
            \n
            `;
        });
        // console.log(dataMarkup);
        domElem.innerHTML = dataMarkup;

    }catch(err){
        domElem.innerHTML = `
        Unable to fetch data. Try refreshing the page.
        `;
        console.log(err);
    }
}

const toggleModal = (e) => {
    e.preventDefault();
    console.log(e.target.parentNode.parentNode.dataset.key); // ipo indha key ah vechi dhaan
    // i need to put the values of the obtained data into the popup form
    modal.classList.toggle("popup-hidden");
} 

window.onload = async (e) => {
    loading.classList.add("loaded");
    setTimeout(() => {
        loading.style.display = "none";
    }, 300);

    const olList = document.querySelector(".admin-container ol");

    await populateData(olList);

    const adminEditBtn = document.querySelector(".admin-edit");
    const adminDelBtn = document.querySelector(".admin-delete");
    const saveEditBtn = document.querySelector(".save-edit");
    const cancelEditBtn = document.querySelector(".cancel-edit");
    
    adminEditBtn.addEventListener("click", toggleModal);
    cancelEditBtn.addEventListener("click", toggleModal);
}

userBtn.addEventListener("click", (e) => {
    userMenu.classList.toggle("user-menu-open");
    chevronIcon.classList.toggle("chevron-down-open");
});

signOutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        location.href = "/";
    });
})