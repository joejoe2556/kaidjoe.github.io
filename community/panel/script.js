document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');

    panels.forEach(panel => {
        const img = document.createElement('img');
        img.src = panel.getAttribute('data-gif');
        img.alt = panel.querySelector('.title').innerText;
        panel.appendChild(img);

        panel.addEventListener('mouseover', () => {
            img.style.display = 'block';
        });

        panel.addEventListener('mouseout', () => {
            img.style.display = 'none';
        });
    });
});
