// Typewriter Effect
document.addEventListener("DOMContentLoaded", () => {
    const text = "Smart Waste Segregation";
    const element = document.getElementById("typewriter");

    let i = 0;
    let isDeleting = false;
    let currentText = "";

    function typeWriter() {
      if (!isDeleting) {
        if (i < text.length) {
          const span = document.createElement("span");
          const char = text.charAt(i);
          span.innerHTML = char;
          element.appendChild(span);
          currentText += char;
          i++;
          setTimeout(typeWriter, 80);
        } else {
          isDeleting = true;
          setTimeout(typeWriter, 1500);
        }
      } else {
        if (i > 0) {
          element.innerHTML = currentText.slice(0, -1);
          currentText = currentText.slice(0, -1);
          i--;
          setTimeout(typeWriter, 50);
        } else {
          isDeleting = false;
          setTimeout(typeWriter, 1000);
        }
      }
    }

    typeWriter();
});

// Upload Prediction Logic
document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('file', document.getElementById('file').files[0]);

  const response = await fetch('/predict', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  document.getElementById('result').innerText = `Prediction: ${result.prediction}\n${result.disposal_instructions}`;
});

document.getElementById('file').addEventListener('change', function () {
  const preview = document.getElementById('preview');
  const container = document.getElementById('preview-container');
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      container.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    container.style.display = 'none';
  }
});
