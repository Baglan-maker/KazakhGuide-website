const currentMode = localStorage.getItem("theme");

if (currentMode === "dark") {
  document.body.classList.add("dark-mode");
}

document.getElementById("mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});


function validateContactForm() {
    clearErrors();

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let country = document.getElementById("country").value;
    let review = document.getElementById("review").value;

    let isValid = true;

    if (fname === "") {
        displayError("fnameError", "First name is required");
        isValid = false;
    }

    if (lname === "") {
        displayError("lnameError", "Last name is required");
        isValid = false;
    }

    if (email === "") {
        displayError("emailError", "Email is required");
        isValid = false;
    } else if (!validateEmail(email)) {
        displayError("emailError", "Invalid email format");
        isValid = false;
    }

    if (review === "") {
        displayError("reviewError", "Please provide a reason for visiting Kazakhstan");
        isValid = false;
    }

    return isValid; 
}

function displayError(fieldId, message) {
    let errorField = document.getElementById(fieldId);
    errorField.style.display = "block"; 
    errorField.innerText = message;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearErrors() {
    let errorFields = document.getElementsByClassName("error-tooltip");
    for (let i = 0; i < errorFields.length; i++) {
        errorFields[i].style.display = "none"; 
        errorFields[i].innerText = "";
        
        
    }
}

document.getElementById("open-form").onclick = function() {
    document.getElementById("popup-form").style.display = "flex";
    document.getElementById("message").style.display = "none"; 
};

document.getElementById("close-btn").onclick = function() {
    document.getElementById("popup-form").style.display = "none";
};

document.getElementById("subscription-form").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const formData = new FormData(this); 

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            showMessage("Subscription successful!"); 
        } else {
            showMessage("Error: " + response.statusText);
        }
    } catch (error) {
        showMessage("Network error: " + error.message);
    }
});

function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.display = "block";
    setTimeout(() => {
        messageDiv.style.display = "none"; 
    }, 4000); 
}

window.onclick = function(event) {
    const popup = document.getElementById("popup-form");
    if (event.target === popup) {
        popup.style.display = "none";
    }
};


const BackgroundColorManager = {
    colors: ['#ff5733', '#33ff57', '#3357ff', '#f0f33f', '#ff33a1', '#33fff0'],

    changeColor() {
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        document.body.style.backgroundColor = randomColor;
        console.log("You changed color");
    }
};

document.getElementById('color-btn').addEventListener('click', () => BackgroundColorManager.changeColor());



const StarRating = {
    stars: document.querySelectorAll('.star'),
    ratingMessage: document.getElementById('ratingMessage'),
    selectedRating: 0, 

    init() {
        this.stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const value = star.getAttribute('data-value');
                this.highlightStars(value);
            });

            star.addEventListener('mouseout', () => {
                this.resetStars();
            });

            star.addEventListener('click', () => {
                const value = star.getAttribute('data-value');
                this.setRating(value);
            });
        });
    },

    highlightStars(value) {
        this.stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    },

    resetStars() {
        if (this.selectedRating > 0) {
            this.highlightStars(this.selectedRating); 
        } else {
            this.stars.forEach(star => {
                star.classList.remove('selected');
            });
        }
    },

    setRating(value) {
        this.selectedRating = value; 
        this.ratingMessage.textContent = `You rated this ${value} star(s).`;
    }
};

StarRating.init();


const GreetingManager = {
    greetingElement: document.getElementById('greeting'),

    updateGreeting() {
        const nameInput = document.getElementById('nameInput').value; 
        this.greetingElement.textContent = `Hello, ${nameInput}! Welcome to our website!`;
        document.getElementById('nameInput').value = ''; 
        return false;
    }
};

document.getElementById('nameForm').onsubmit = () => GreetingManager.updateGreeting();


const NavigationManager = {
    navItems: document.querySelectorAll('.nav-item') ,
    currentIndex: 0,

    init() {
        this.navItems[this.currentIndex].focus();
        
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    },

    handleKeyDown(event) {
        if (event.key === 'ArrowRight') {
            this.currentIndex = (this.currentIndex + 1) % this.navItems.length; 
            this.navItems[this.currentIndex].focus();
        } else if (event.key === 'ArrowLeft') {
            this.currentIndex = (this.currentIndex - 1 + this.navItems.length) % this.navItems.length; 
            this.navItems[this.currentIndex].focus();
        } else if (event.key === 'Enter') {
            this.navItems[this.currentIndex].querySelector('a').click();
        }
    }
};

NavigationManager.init();
