function setTheme(theme) {
  let stylesDark = $("#styles-dark").attr("value");
  let stylesLight = $("#styles-light").attr("value");
  if (theme === "dark") {
    // base
    $("#logo").attr("class", "logo-dark");
    $("#theme-current").attr("value", "dark");
    $("#theme").attr("href", stylesDark);
    // utterances
    setUtterancesTheme("github-dark");
  } else if (theme === "light") {
    $("#logo").attr("class", "logo-light");
    $("#theme-current").attr("value", "light");
    $("#theme").attr("href", stylesLight);
    // utterances
    setUtterancesTheme("github-light");
  }
}
function setUtterancesTheme(theme) {
  let iframe = document.querySelector(".utterances-frame");
  if (iframe !== undefined && iframe !== null) {
    const message = {
      type: "set-theme",
      theme: theme,
    };
    iframe.contentWindow.postMessage(message, "https://utteranc.es");
  }
}
$(document).ready(function () {
  // get user theme
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
  // set theme
  let themeCurrent = $("#theme-current").attr("value");
  setTheme(themeCurrent);
  // button: change theme
  $("#logo, #theme-change").click(function () {
    let themeCurrent = $("#theme-current").attr("value");
    let newTheme;
    if (themeCurrent === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
    // 设置超时时间： 24 小时
    let expire = new Date().getTime() + 1000 * 3600 * 24;
    localStorage.setItem("userThemeExpire", expire);
  });
  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function () {
    $("#header > #nav > ul").toggleClass("responsive");
  });

  /**
   * Controls the different versions of the menu in blog post articles
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function () {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function () {
        var topDistance = menu.offset().top;

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if (!$("#menu-icon").is(":visible") && topDistance < 50) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($("#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop) {
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page,
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});
