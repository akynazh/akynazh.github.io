function setTheme(theme) {
  let stylesDark = $("#styles-dark").attr("value");
  let stylesLight = $("#styles-light").attr("value");
  if (theme === "dark") {
    $("#theme").attr("href", stylesDark);
  } else if (theme === "light") {
    $("#theme").attr("href", stylesLight);
  }
}

function changeTheme(theme) {
  setTheme(theme);
  setSnow = document.getElementById("set-snow").value;
  if (theme === "dark") {
    setUtterancesTheme("github-dark");
    if (setSnow === "1") {
      startSnow()
    }
  } else if (theme === "light") {
    setUtterancesTheme("github-light");
    stopSnow()
  }
  $("#theme-current").attr("value", theme);
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
    $("#theme-current").attr("value", userTheme);
  }
  return $("#theme-current").attr("value");
}