"use strict";

/* =========================================
   CURRENT YEAR
   ========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   MOBILE NAVIGATION
   ========================================= */

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {

  navToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("is-open");

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });


  navMenu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navMenu.classList.remove("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      navToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );

    });

  });

}


/* =========================================
   SCROLL REVEAL
   ========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.10,
      rootMargin: "0px 0px -35px 0px"
    }
  );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================================
   CONTACT MODAL
   ========================================= */

const modal = document.getElementById("contact-modal");

const openContactButtons =
  document.querySelectorAll("[data-open-contact]");

const closeContactButtons =
  document.querySelectorAll("[data-close-contact]");


function openContactModal() {

  if (!modal) {
    return;
  }

  modal.classList.add("is-open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("modal-open");

  const closeButton =
    modal.querySelector(".modal-close");

  closeButton?.focus();

}


function closeContactModal() {

  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("modal-open");

}


openContactButtons.forEach((button) => {

  button.addEventListener(
    "click",
    openContactModal
  );

});


closeContactButtons.forEach((button) => {

  button.addEventListener(
    "click",
    closeContactModal
  );

});


document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    modal?.classList.contains("is-open")
  ) {

    closeContactModal();

  }

});


/* =========================================
   PHONE NUMBER REVEAL
   ========================================= */

const phoneLink = document.getElementById("phone-link");
const phoneText = document.getElementById("phone-text");

let phoneRevealed = false;


if (phoneLink && phoneText) {

  phoneLink.addEventListener("click", (event) => {

    if (!phoneRevealed) {

      event.preventDefault();

      const countryCode = "+977";
      const phoneNumber = "9840031519";

      phoneText.textContent =
        `${countryCode} ${phoneNumber}`;

      phoneLink.href =
        `tel:${countryCode}${phoneNumber}`;

      phoneRevealed = true;

    }

  });

}


/* =========================================
   CERTIFICATE DROPDOWNS

   Keeps only one certificate open at a time.
   ========================================= */

const certificateDropdowns =
  document.querySelectorAll(".certificate-dropdown");


certificateDropdowns.forEach((dropdown) => {

  dropdown.addEventListener("toggle", () => {

    if (!dropdown.open) {
      return;
    }

    certificateDropdowns.forEach((otherDropdown) => {

      if (otherDropdown !== dropdown) {
        otherDropdown.removeAttribute("open");
      }

    });

  });

});