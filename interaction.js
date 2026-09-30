document.getElementById('year').textContent = new Date().getFullYear();

const projectCards = [...document.querySelectorAll('[data-project-categories]')];
const projectFilters = [...document.querySelectorAll('.project-filter')];
const projectGrid = document.querySelector('.project-grid');
const projectResults = document.getElementById('project-results');

projectFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    projectFilters.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));

    let count = 0;
    projectCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.projectCategories.split(' ').includes(filter);
      card.hidden = !matches;
      if (matches) count += 1;
    });

    const visibleGridCards = [...projectGrid.querySelectorAll('.project-card:not([hidden])')];
    projectGrid.hidden = visibleGridCards.length === 0;
    projectGrid.classList.toggle('single-visible', visibleGridCards.length === 1);
    const labels = { all: 'projects', client: 'client project', web: 'web projects', ai: 'AI and vision projects' };
    projectResults.textContent = filter === 'all'
      ? `Showing all ${count} projects`
      : `Showing ${count} ${labels[filter]}`;
  });
});

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
