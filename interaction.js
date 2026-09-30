document.getElementById('year').textContent = new Date().getFullYear();

const inquiryForm = document.getElementById('inquiry-form');
const formStatus = document.getElementById('form-status');

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const choice = inquiryForm.querySelector(`input[name="service"][value="${link.dataset.service}"]`);
    if (choice) choice.checked = true;
  });
});

inquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const data = new FormData(inquiryForm);
  const service = String(data.get('service') || 'Project');
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const project = String(data.get('project') || '').trim();
  if (!name || !email || !project) return;

  const subject = `Project inquiry: ${service}`;
  const body = [
    'Hi Mohamed,',
    '',
    `I would like to discuss a ${service.toLowerCase()} project.`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Project details:',
    project,
  ].join('\n');
  formStatus.textContent = 'Your email draft is opening. Please send it from your email app.';
  window.location.href = `mailto:mo.anwar26102002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
