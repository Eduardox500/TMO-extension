chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: clickElementTmo,
        args: ['IsTmo'],
      });
    });
  }
});


chrome.commands.onCommand.addListener((command) => {
  console.log(command);

  if (command === "prev" || command === "next" || command === "back") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: clickElementTmo,
        args: [command],
      });
    });
  }
});

function clickElementTmo(arg) {
  if (arg === "prev" || arg === "next") {
    const elementToClick = document.querySelector(`.chapter-${arg} a`);
    if (elementToClick) {
      elementToClick.click();
    }
  }
  
  if (arg === "back") {
    if (document.getElementsByTagName("a")[1].getAttribute("title").toLowerCase() !== "volver")
    {
      const elementToClick = document.getElementsByTagName("a")[2];
      if (elementToClick) {
        elementToClick.click();
      }
    }
    else
    {
      const elementToClick = document.getElementsByTagName("a")[1];
      if (elementToClick) {
        elementToClick.click();
      }
    }
    
  }

  if (arg === "IsTmo" && document.getElementsByTagName("a")[0].getAttribute("href") === "https://visortmo.com") {
    var IsVisor = undefined
    var IsDark = document.getElementsByTagName("body")[0].getAttribute("class") === 'dark-mode'

    try {
      IsVisor = document.querySelectorAll('[property="og:type"]')[0].content === 'website'
    } catch (error) {
      IsVisor = false
    }  

    if (!IsVisor) {
      const MangaCapCode = document.getElementsByTagName("a")[2].href.split('/')[4]
      window.location.href = 'https://visortmo.com/viewer/' + MangaCapCode + '/cascade'
    }
    
    if (!IsDark) {
      const elementToClick = document.querySelector(`#toggleLightDarkBtn`)
      if (elementToClick) {
        elementToClick.click();
      }
    }

    if (IsVisor && document.getElementsByTagName("a")[3].href.split('/')[5] === 'cascade') {
      const elementToClick = document.getElementsByTagName("a")[3];
      if (elementToClick) {
        elementToClick.click();
      }
    }
  }
}
