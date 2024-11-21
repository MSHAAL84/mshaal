// تحديث التاريخ الميلادي والهجري والوقت والشفت
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  // اليوم
  const dayOptions = { weekday: "long" };
  document.getElementById(
    "current-day"
  ).textContent = `اليوم: ${now.toLocaleDateString("ar-SA", dayOptions)}`;

  // التاريخ الميلادي
  document.getElementById(
    "gregorian-date"
  ).textContent = `التاريخ الميلادي: ${now.toLocaleDateString(
    "ar-SA",
    options
  )}`;

  // التاريخ الهجري
  const hijriOptions = {
    calendar: "islamic",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  document.getElementById(
    "hijri-date"
  ).textContent = `التاريخ الهجري: ${now.toLocaleDateString(
    "ar-SA-u-ca-islamic",
    hijriOptions
  )}`;

  // الوقت
  const hours = now.getHours() % 12 || 12; // نظام 12 ساعة
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const period = now.getHours() >= 12 ? "مساءً" : "صباحًا";
  document.getElementById(
    "current-time"
  ).textContent = `الوقت: ${hours}:${minutes}:${seconds} ${period}`;

  // الشفت
  if (now.getHours() >= 6 && now.getHours() < 14) {
    document.getElementById("shift-time").textContent = "الشفت: صباحي";
  } else {
    document.getElementById("shift-time").textContent = "الشفت: مسائي";
  }
}

// عداد الوقت
let timer;
let seconds = 0,
  minutes = 0,
  hours = 0;

document.getElementById("start-timer").addEventListener("click", function () {
  timer = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    document.getElementById("timer-display").textContent = `الوقت: ${String(
      hours
    ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }, 1000);
});

// تغيير النص في التقييم
document.querySelectorAll(".slider").forEach((slider) => {
  slider.addEventListener("input", function () {
    const value = parseInt(this.value);
    const text = this.nextElementSibling;

    if (value <= 3) {
      text.textContent = "سيئ";
      text.style.color = "red";
    } else if (value <= 6) {
      text.textContent = "جيد";
      text.style.color = "#007bff";
    } else if (value <= 8) {
      text.textContent = "جيد جدًا";
      text.style.color = "green";
    } else {
      text.textContent = "ممتاز";
      text.style.color = "darkgreen";
    }
  });
});

// إرسال التقييم عبر واتساب
const form = document.getElementById("employee-evaluation-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const evaluationData = new FormData(form);
  let evaluationText = "تقييم الموظف:\n";
  evaluationData.forEach((value, key) => {
    if (key !== "comments") {
      evaluationText += `${key}: ${value}\n`;
    }
  });

  const comments = document.getElementById("comments").value;
  evaluationText += `ملاحظات: ${comments}`;

  const whatsappMessage = encodeURIComponent(evaluationText);
  const whatsappUrl = `https://wa.me/0536102914?text=${whatsappMessage}`;
  window.open(whatsappUrl, "_blank");
  alert("تم إرسال التقييم بنجاح!");
});

setInterval(updateDateTime, 1000);
