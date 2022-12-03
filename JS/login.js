let stor;
$(document).ready(function () {
  localStorage.setItem('key', JSON.stringify(''));
  stor = JSON.parse(localStorage.getItem('data'));
  $('#Lsub').click(function () {
    validation();
  });

  if (location.reload) {
  }
});

function validation() {
  let flag = true;

  if (stor !== null) {
    stor.forEach(element => {
      if (
        $('#Vusername').val() === element.username &&
        $('#Vpassword').val() === element.password
      ) {
        flag = false;
        localStorage.setItem('key', JSON.stringify(element.username));
        $('.logHref').attr('href', '/html/product.html');
        $('.Lfrm')[0].reset();
      }
    });
  }
  if (flag) {
    alert('Please Enter Correct Username Or Password');
    $('.logHref').attr('href', '');
    $('.Lfrm')[0].reset();
  }
}

// $(document).on("keydown", function (e) {
//   if (e.key === "Enter") {
//     console.log("0909");
//     $("#Lsub").click(validation);
//     // validation();
//   }
// });
