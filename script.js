//your JS code here. If required.
const sounds = [];

for (let i = 1; i <= 6; i++) {
  sounds.push(new Promise((resolve, reject) => {
    const sound = new Audio(`sounds/audio${i}.mp3`);
    sound.addEventListener('canplay', () => {
      resolve(sound);
    });
    sound.addEventListener('error', (error) => {
      reject(error);
    });
  }));
}

Promise.all(sounds)
  .then((loadedSounds) => {
    const buttons = document.querySelectorAll('.btn');
    const stopButton = document.querySelector('.stop');

    function playSound(index) {
      stopSounds();
      loadedSounds[index].play();
    }

    function stopSounds() {
      loadedSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
      });
    }

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        playSound(index);
      });
    });

    stopButton.addEventListener('click', () => {
      stopSounds();
    });
  })
  .catch((error) => {
    console.error('Failed to load sounds', error);
  });