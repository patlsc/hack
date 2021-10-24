window.addEventListener("load", () => {
   $("#learn-button").on("click", () => {
      window.location.href = "http://127.0.0.1:3000/test";
   });
   $("#review-button").on("click", () => {
      window.location.href = "http://127.0.0.1:3000/test";
   });
   $("#stats-button").on("click", () => {
      window.location.href = "http://127.0.0.1:3000/student_status";
   });
});