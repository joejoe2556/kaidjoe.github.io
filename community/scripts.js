document.getElementById("enter-button").addEventListener("click", function(event) {
    event.stopPropagation(); // Prevents click from affecting anything underneath
    document.getElementById("welcome-overlay").style.display = "none"; // Hides the overlay
});

// Ensure the overlay itself captures any other clicks
document.getElementById("welcome-overlay").addEventListener("click", function(event) {
    event.stopPropagation(); // Prevents any clicks from affecting elements underneath
});
document.addEventListener('DOMContentLoaded', function() {
    const panels = document.querySelectorAll('.panel');

    panels.forEach(panel => {
        const staticImg = document.createElement('img');
        staticImg.src = panel.getAttribute('data-static');
        staticImg.className = 'static-img';
        panel.appendChild(staticImg);

        const gifImg = document.createElement('img');
        gifImg.src = panel.getAttribute('data-gif');
        gifImg.className = 'gif-img';
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

    const outerContainer = document.querySelector('.outer-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    outerContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        outerContainer.classList.add('active');
        startX = e.pageX - outerContainer.offsetLeft;
        scrollLeft = outerContainer.scrollLeft;
    });

    outerContainer.addEventListener('mouseleave', () => {
        isDown = false;
        outerContainer.classList.remove('active');
    });

    outerContainer.addEventListener('mouseup', () => {
        isDown = false;
        outerContainer.classList.remove('active');
    });

    outerContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - outerContainer.offsetLeft;
        const walk = (x - startX) * 2; //scroll-fast
        outerContainer.scrollLeft = scrollLeft - walk;
    });
});
