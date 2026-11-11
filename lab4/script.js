const checks = [...document.querySelectorAll('.step-check')];
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
function updateProgress() {
  const done = checks.filter(item => item.checked).length;
  progressText.textContent = `${done} / ${checks.length} бөлім`;
  progressFill.style.width = `${(done / checks.length) * 100}%`;
  checks.forEach(input => input.closest('.step-card').classList.toggle('completed', input.checked));
}
checks.forEach(input => input.addEventListener('change', updateProgress));

const toast = document.getElementById('toast');
let toastTimer;
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const code = button.closest('.code-block').querySelector('pre code').innerText;
    try {
      await navigator.clipboard.writeText(code);
      toast.textContent = 'Командалар көшірілді ✓';
    } catch (error) {
      const area = document.createElement('textarea');
      area.value = code;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      toast.textContent = 'Командалар көшірілді ✓';
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  });
});
