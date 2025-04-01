document.getElementById('rainbowEffect').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
              let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
              let index = 0;
              setInterval(() => {
                  document.body.style.backgroundColor = colors[index];
                  index = (index + 1) % colors.length;
              }, 500);
          }
      });
  });
});

document.getElementById('selectImage').addEventListener('click', () => {
  document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const imageUrl = e.target.result;
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              const tab = tabs[0];
              chrome.scripting.executeScript({
                  target: { tabId: tab.id },
                  func: (imageUrl) => {
                      document.body.style.backgroundImage = `url(${imageUrl})`;
                      document.body.style.backgroundSize = 'cover';
                  },
                  args: [imageUrl]
              });
          });
      };
      reader.readAsDataURL(file);
  }
});

document.getElementById('customColor').addEventListener('input', (event) => {
  const color = event.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (color) => {
              document.body.style.backgroundColor = color;
          },
          args: [color]
      });
  });
});

document.getElementById('clearCache').addEventListener('click', () => {
  chrome.browsingData.removeCache({}).then(() => {
      alert('Cache cleared!');
  });
});

document.getElementById('blockAds').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
              const ads = document.querySelectorAll('iframe, img[alt="Ad"]');
              ads.forEach(ad => ad.style.display = 'none');
          }
      });
  });
});

document.getElementById('toggleDarkMode').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
              const darkMode = document.body.style.filter === 'invert(100%)';
              document.body.style.filter = darkMode ? '' : 'invert(100%)';
          }
      });
  });
});

document.getElementById('resetBackground').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
              document.body.style.backgroundColor = '';
              document.body.style.backgroundImage = '';
          }
      });
  });
});