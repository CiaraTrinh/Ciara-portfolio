'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

//sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); }); //for mobile


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
 
select.addEventListener("click", function () { elementToggleFunc(this); });
 
// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
    
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    
    });
}
 
// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");
 
const filterFunc = function (selectedValue) {
 
    for (let i = 0; i < filterItems.length; i++) {
    
        if (selectedValue === "all") {
        filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
        filterItems[i].classList.add("active");
        } else {
        filterItems[i].classList.remove("active");
        }
    }

}
 
// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
 
for (let i = 0; i < filterBtn.length; i++) {
 
    filterBtn[i].addEventListener("click", function () {
    
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);
    
        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    
    });
 
}

// Back button
// document.getElementById("back-btn").addEventListener("click", function() {
//     pages.forEach(function(page) { page.classList.remove("active"); });
//     document.querySelector("[data-page='portfolio']").classList.add("active");
//     window.scrollTo(0, 0);
// });

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }

    });
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx2yiORzbzDxAe3GdDYU15geycTDC-BAUEyMHE1pNL2cVgDTl8m-z7xjXoH2R-ifblCXg/exec";

form.addEventListener("submit", function (e) {
    e.preventDefault();

    formBtn.setAttribute("disabled", "");
    formBtn.querySelector("span").innerText = "Sending...";

    const payload = {
        from_name: form.querySelector('[name="fullname"]').value,
        from_email: form.querySelector('[name="email"]').value,
        message: form.querySelector('[name="message"]').value,
    };

    fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
    })

    .then((res) => res.json())
    .then((data) => {
        if (data.status === "success") {
            formBtn.querySelector("span").innerText = "Message Sent!";
            form.reset();
            setTimeout(() => {
                formBtn.querySelector("span").innerText = "Send Message";
                formBtn.setAttribute("disabled", "");
            }, 3000);
        }
    })

    .catch((err) => {
        console.error(err);
        formBtn.querySelector("span").innerText = "Failed. Try again.";
        formBtn.removeAttribute("disabled");
    });
});

// page navigation variables
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {

        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navLinks[i].classList.remove("active");
            }
        }
    });
}
