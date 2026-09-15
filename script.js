document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile Hamburger Navigation ---
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburgerMenu.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburgerMenu.classList.toggle("toggle");
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburgerMenu.classList.remove("toggle");
        });
    });


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add("active");
            }
        });
    };

    // Trigger on load
    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);


    // --- Navigation Tracking on Scroll (Active Class tracking) ---
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add("active");
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove("active");
            }
        });
    });


    // --- Simple Form Handler ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for connecting with SAROJ TAX CONSULTANCY! We will contact you shortly.");
            contactForm.reset();
        });
    }
});

// submit google sheet code  extrnal//

// --- Alag se jodne wala Google Sheets Form Code ---
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            const formData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            };

            const scriptURL = "https://script.google.com/macros/s/AKfycbzm4PuewlBfIK-0Rh7NjuDlVqZ_BpC9vQ1cRaH58HecaCWbz6kR0YHxgJ3iXlQaZD5w/exec";

            fetch(scriptURL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                alert("Thank you! Your message has been sent successfully to SAROJ TAX CONSULTANCY.");
                contactForm.reset();
            })
            .catch(error => {
                console.error("Error!", error.message);
                alert("Something went wrong. Please try again.");
            })
            .finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});



