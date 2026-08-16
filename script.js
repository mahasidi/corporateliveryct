// Footer year
document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.style.display === 'flex';
    mainNav.style.display = isOpen ? 'none' : 'flex';
    mainNav.style.flexDirection = 'column';
    mainNav.style.position = 'absolute';
    mainNav.style.top = '76px';
    mainNav.style.left = '0';
    mainNav.style.right = '0';
    mainNav.style.background = '#fff';
    mainNav.style.padding = '12px 24px';
    mainNav.style.borderBottom = '1px solid #E4E6EA';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });
}

// Book a Ride form: submit via fetch, swap in a success card on the same page
var rideForm = document.getElementById('rideForm');
var formSuccess = document.getElementById('formSuccess');
if (rideForm) {
  rideForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = document.getElementById('formStatus');
    var submitBtn = rideForm.querySelector('button[type="submit"]');
    status.textContent = '';
    status.className = 'form-status';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(rideForm.action, {
      method: 'POST',
      body: new FormData(rideForm),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          rideForm.reset();
          rideForm.hidden = true;
          if (formSuccess) formSuccess.classList.add('is-visible');
        } else {
          status.textContent = 'Something went wrong. Please call us at (860) 817-4795 instead.';
          status.classList.add('error');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit';
        }
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please call us at (860) 817-4795 instead.';
        status.classList.add('error');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      });
  });
}