const { active, none, countryCode } = {
  active: "active",
  none: "d-none",
  countryCode: "countryCode",
};

const getSavedLanguage = localStorage.getItem(countryCode);
const changeLanguage = document.querySelectorAll(".change-language");

$(document).ready(function () {
  $(".lang button").removeClass(active);
  if (getSavedLanguage) {
    $(`*[data-lang="${getSavedLanguage}"]`).addClass(active);
  }

  $(".select-wrap select").select2({
    minimumResultsForSearch: -1,
  });

  $(".phone-number-input").inputmask({
    mask: "+7 (999) 999 - 99 - 99",
  });

  $(".lang button").on("click", function () {
    $(".lang button").removeClass("active");
    $(this).addClass("active");
  });

  $(".continue-form").validate({
    errorPlacement: function (error, element) {},
    submitHandler: function (form) {
      window.location.href = "continue2.html";
    },
  });

  $(".continue-form2").validate({
    errorPlacement: function (error, element) {},
    submitHandler: function (form) {
      window.location.href = "select-service.html";
    },
  });

  $(".rate-form").validate({
    errorPlacement: function (error, element) {},
    submitHandler: function (form) {
      window.location.href = "end.html";
    },
  });

  $(".login-form").validate({
    errorPlacement: function (error, element) {},
  });
  $(".close-shift-form").validate({
    errorPlacement: function (error, element) {},
  });

  const starEls = document.querySelectorAll(".star.rating");
  starEls.forEach((star) => {
    star.addEventListener("click", function (e) {
      let starEl = e.currentTarget;
      console.log(
        starEl.parentNode.dataset.stars + ", " + starEl.dataset.rating
      );
      starEl.parentNode.setAttribute("data-stars", starEl.dataset.rating);
    });
  });

  // TRANSLATE

  const elmTranslate = document.querySelectorAll(".tr");

  function translateSite(isoCode) {
    elmTranslate.forEach((item) => {
      const getKey = item.dataset.key;
      if (getKey) {
        const getKeyTranslate = translateKeys.find((tr) => tr.key === getKey);

        if (getKeyTranslate) {
          item.innerHTML = getKeyTranslate[isoCode];
        } else {
          console.error("No key for translateKeys Array");
        }
      } else {
        console.error("No Data Key");
      }
    });
  }

  function Request(url, option = {}) {
    return fetch(url, option).then((res) => res.json());
  }

  Request("https://ipapi.co/json").then((res) => {
    if (getSavedLanguage) {
      translateSite(getSavedLanguage.toLowerCase());
    } else {
      let code = res.country_code;

      if (code !== "ru" || code !== "kz") {
        code = "ru";
      }

      translateSite(code.toLowerCase());
      localStorage.setItem(countryCode, code.toLowerCase());
    }
  });

  changeLanguage.forEach((item) => {
    item.addEventListener("click", function () {
      const lang = this.dataset.lang;
      if (lang) {
        translateSite(lang);
        localStorage.setItem(countryCode, lang.toLowerCase());
      } else {
        console.log("Lang err");
      }
    });
  });

  $(".popup").magnificPopup({
    type: "inline",
    mainClass: "mfp-fade",
  });
});
