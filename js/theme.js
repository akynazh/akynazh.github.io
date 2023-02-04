function setTheme(theme) {
  let stylesDark = document.getElementById("styles-dark").value;
  let stylesLight = document.getElementById("styles-light").value;
  if (theme === "dark") {
    document.getElementById("theme").setAttribute("href", stylesDark);
    document.getElementById("logo").setAttribute("class", "logo-dark");
  } else if (theme === "light") {
    document.getElementById("theme").setAttribute("href", stylesLight);
    document.getElementById("logo").setAttribute("class", "logo-light");
  }
}

function changeTheme(theme) {
  setTheme(theme);
  setSnow = document.getElementById("set-snow").value;
  if (theme === "dark") {
    setUtterancesTheme("github-dark");
    if (setSnow === "1") {
      startSnow();
    }
  } else if (theme === "light") {
    setUtterancesTheme("github-light");
    stopSnow();
  }
  document.getElementById("theme-current").setAttribute("value", theme);
  localStorage.setItem("userTheme", theme);
  // 设置超时时间： 24 小时
  let expire = new Date().getTime() + 1000 * 3600 * 24;
  localStorage.setItem("userThemeExpire", expire);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function setUtterancesTheme(theme) {
  let iframe = document.querySelector(".utterances-frame");
  const message = {
    type: "set-theme",
    theme: theme,
  };
  if (iframe !== undefined && iframe !== null) {
    while (true) {
      if (iframe.contentDocument === null) {
        iframe.contentWindow.postMessage(message, "https://utteranc.es");
        break;
      }
      await sleep(1000);
    }
  }
}

function getCurrentTheme() {
  // user theme
  let userTheme = localStorage.getItem("userTheme");
  let userThemeExpire = localStorage.getItem("userThemeExpire");
  if (
    userTheme !== null &&
    userTheme != "" &&
    userThemeExpire !== null &&
    userThemeExpire > new Date().getTime()
  ) {
    document.getElementById("theme-current").setAttribute("value", userTheme);
  }
  return document.getElementById("theme-current").value;
}

setTheme(getCurrentTheme());