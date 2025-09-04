function copyText(element) {
  const text = element.innerText;
  navigator.clipboard.writeText(text).then(() => {
    element.style.border = '2px dashed #198754';
    setTimeout(() => {
      element.style.border = 'none';
    }, 1000);
  });
}
