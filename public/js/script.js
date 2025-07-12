// Bootstrap logic to make fields required!
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()




// Navbar
const dropdown = document.getElementById("dropdown"); // Dropdown toggle
function toggleMenu() {
  dropdown.classList.toggle("hidden");
}
document.addEventListener("click", function (event) { // Close on outside click
  const isClickInside = event.target.closest(".menu-wrapper");
  if (!isClickInside) {
    dropdown.classList.add("hidden");
  }
});

// Mobile Dropdown Panel
const mobileDropdown = document.getElementById("mobileDropdown");
function toggleMobileDropdown(event) {
  event.stopPropagation();
  if (mobileDropdown) {
    mobileDropdown.classList.toggle("hidden");
  }
}
document.addEventListener("click", function (event) {
  if (mobileDropdown && !mobileDropdown.classList.contains("hidden")) {
    const isClickInside = event.target.closest("#mobileDropdown") || event.target.closest(".navbar-toggler");
    if (!isClickInside) {
      mobileDropdown.classList.add("hidden");
    }
  }
});
