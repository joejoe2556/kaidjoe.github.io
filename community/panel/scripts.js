document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');

    panels.forEach(panel => {
        const staticPath = panel.getAttribute('data-static');
        const gifPath = panel.getAttribute('data-gif');

        const staticImg = document.createElement('img');
        staticImg.src = staticPath;
        staticImg.alt = panel.querySelector('.title').innerText;
        staticImg.classList.add('static-img');

        const gifImg = document.createElement('img');
        gifImg.src = gifPath;
        gifImg.alt = panel.querySelector('.title').innerText;
        gifImg.classList.add('gif-img');

        panel.appendChild(staticImg);
        panel.appendChild(gifImg);

        panel.addEventListener('mouseover', () => {
            staticImg.style.display = 'none';
            gifImg.style.display = 'block';
        });

        panel.addEventListener('mouseout', () => {
            staticImg.style.display = 'block';
            gifImg.style.display = 'none';
        });
    });
});
