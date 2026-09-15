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



// <!-- 
// AI ASSISTANT CODE EXTRANAL "s4info Assistant" -->

// S4 Assistant Widget Scripting
const s4Toggle = document.getElementById('s4ChatToggle');
const s4Box = document.getElementById('s4ChatBox');
const s4Close = document.getElementById('s4CloseBtn');
const s4Send = document.getElementById('s4SendBtn');
const s4Input = document.getElementById('s4UserInput');
const s4Messages = document.getElementById('s4ChatMessages');

s4Toggle.addEventListener('click', () => s4Box.classList.toggle('active'));
s4Close.addEventListener('click', () => s4Box.classList.remove('active'));

async function sendToS4Assistant() {
    const text = s4Input.value.trim();
    if (!text) return;

    // Append user message
    s4Messages.innerHTML += `<div class="s4-message user">${text}</div>`;
    s4Input.value = '';
    s4Messages.scrollTop = s4Messages.scrollHeight;

    // Show temporary loading indicator
    const loadingId = 'loading-' + Date.now();
    s4Messages.innerHTML += `<div class="s4-message bot" id="${loadingId}">Thinking...</div>`;
    s4Messages.scrollTop = s4Messages.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        
        const data = await response.json();
        document.getElementById(loadingId).remove();
        
        // Append bot reply
        s4Messages.innerHTML += `<div class="s4-message bot">${data.reply || "I couldn't process that right now."}</div>`;
    } catch (error) {
        document.getElementById(loadingId).remove();
        s4Messages.innerHTML += `<div class="s4-message bot">Error connecting to S4 Assistant.</div>`;
    }
    s4Messages.scrollTop = s4Messages.scrollHeight;
}

s4Send.addEventListener('click', sendToS4Assistant);
s4Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendToS4Assistant();
});