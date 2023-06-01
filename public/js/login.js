import { auth, onAuthStateChanged, signInWithEmailAndPassword } from "/public/js/config.js";

const signInBtn = document.querySelector(".sign-in");
const errHandler = document.querySelector(".error");

onAuthStateChanged(auth, (user) => {
    if (user && user.uid === "nW2xockgUwdXcSpBZTOCoWSsc1h1") location.href = '/admin';
    else if (user && user.uid !== "nW2xockgUwdXcSpBZTOCoWSsc1h1") location.href = '/portal';
});

const handleSubmit = async (e) => {
    e.preventDefault();

    const loginDetails = Object.fromEntries(new FormData(e.target).entries());
    signInBtn.classList.toggle("sign-in-disabled");
    
    errHandler.innerHTML = '';

    signInWithEmailAndPassword(auth, loginDetails.email+"@sairamfreshers.com", loginDetails.password).then((result) => {
    }).catch(err => {
        console.log(err);
        if (err.code === "auth/wrong-password"){
            errHandler.innerHTML = "Wrong Password";
            signInBtn.classList.toggle("sign-in-disabled");
        }else if(err.code === "auth/too-many-requests"){
            errHandler.innerHTML = "Too many invalid attempts. Contact admin or try later";
            signInBtn.classList.toggle("sign-in-disabled");
        }else if(err.code === "auth/user-not-found"){
            errHandler.innerHTML = "Invalid username";
            signInBtn.classList.toggle("sign-in-disabled");
        }else{
            errHandler.innerHTML = "Unknown error. Try again later.";
            signInBtn.classList.toggle("sign-in-disabled");
        }
    });
}

document.querySelector("form").addEventListener("submit", handleSubmit);