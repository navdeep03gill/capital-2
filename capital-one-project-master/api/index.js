
button.addEventListener('click', () => {

    // if track is stopped, play it
    if (playBtn.getAttribute('class') === 'paused') {
        audioElement.play();
        playBtn.setAttribute('class', 'playing');
        playBtn.textContent = 'Pause'
        // if track is playing, stop it
    } else if (playBtn.getAttribute('class') === 'playing') {
        audioElement.pause();
        playBtn.setAttribute('class', 'paused');
        playBtn.textContent = 'Play';
    }
});