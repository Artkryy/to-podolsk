import "./_vendor";
import "./_functions";
import "./_components";

import IMask from "imask";

const LOCATION_TO = [37.55929914152266, 55.405819044014464];
const TELEGRAM_BOT_TOKEN = "7086166678:AAEEFwluOfWmwdnNcrAnMo51ekykLanz2Hk";
const TELEGRAM_CHAT_ID = "@ToPodolsk1";
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

const phoneMask = () => {
  const phoneInput = document.getElementById("tel");
  const maskOptions = {
    mask: "+{7}(000)000-00-00",
  };
  const mask = IMask(phoneInput, maskOptions);
  return mask;
};
phoneMask();

const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formBtn = document.querySelector(".form__btn");
  const formPhoneInp = form.querySelector(".form__input-tel");
  const formSendResult = document.querySelector(".form__send-result");
  formSendResult.textContent = "";

  const { name, tel, descr } = Object.fromEntries(new FormData(form).entries());

  const text = `Заявка на техосмотр:\n Имя: ${name}\n Телефон: ${tel}\n Сообщение: ${descr}`;

  try {
    formBtn.textContent = "Отправка...";

    if (formPhoneInp.value.length < 16) {
      throw new Error("Пожалуйста, введите корректный номер телефона");
    } else {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
        }),
      });

      if (response.ok) {
        formSendResult.textContent =
          "Заявка отправлена! Мы свяжемся с Вами в ближайшее время!";
        formSendResult.style.color = "green";
        form.reset();
      } else {
        throw new Error("Что-то пошло не так... Попробуйте позже");
      }
    }
  } catch (error) {
    formSendResult.textContent = error.message;
    formSendResult.style.color = "red";
  } finally {
    formBtn.textContent = "Отправить заявку";
    setTimeout(() => {
      formSendResult.textContent = "";
    }, 3000);
  }
});

initMap();

async function initMap() {
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapControls,
  } = ymaps3;

  const { YMapDefaultMarker } = await ymaps3.import(
    "@yandex/ymaps3-markers@0.0.1"
  );

  const { YMapGeolocationControl } = await ymaps3.import(
    "@yandex/ymaps3-controls@0.0.1"
  );

  const { YMapZoomControl } = await ymaps3.import(
    "@yandex/ymaps3-controls@0.0.1"
  );

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: LOCATION_TO,
      zoom: 16,
    },
    autoFitToViewport: 'always'
  });

  map.addChild(new YMapDefaultSchemeLayer({ theme: "dark" }));
  map.addChild(new YMapDefaultFeaturesLayer());
  map.addChild(
    new YMapControls({ position: "left" }).addChild(
      new YMapGeolocationControl({})
    )
  );
  map.addChild(
    new YMapControls({ position: "right" }).addChild(new YMapZoomControl({}))
  );

  const marker = new YMapDefaultMarker({
    coordinates: LOCATION_TO,
    title: "Техосмотр Подольск",
    subtitle: "ул. Правды, д. 28",
    color: "#0144c2",
  });
  map.addChild(marker);
}
