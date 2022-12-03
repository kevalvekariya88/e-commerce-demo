$(document).ready(function () {
  localStorage.setItem('key', JSON.stringify(''));
  $('#sub').click(function (e) {
    getUD();
  });
  RegEx();
  valDate();
});

let data,
  flag = true,
  temp = [],
  arr = [];
function getUD() {
  if (
    $('#username').val() !== '' &&
    $('#fullname').val() !== '' &&
    $('#password').val() !== '' &&
    $('#confPassword').val() !== '' &&
    $('#pimg').val() !== '' &&
    $('#email').val() !== '' &&
    $('#dob').val() !== '' &&
    $('#mobile').val() !== '' &&
    $('#add').val() !== ''
  ) {
    data = {
      username: $('#username').val(),
      fullname: $('#fullname').val(),
      password: $('#password').val(),
      confPassword: $('#confPassword').val(),
      pimg: base64,
      email: $('#email').val(),
      dob: $('#dob').val(),
      mobile: $('#mobile').val(),
      add: $('#add').val(),
    };

    if (JSON.parse(localStorage.getItem('data')) === null) {
      arr.push(data);
      localStorage.setItem('data', JSON.stringify(arr));
      // key
      localStorage.setItem('key', JSON.stringify(data.username));
      $('.regHref').attr('href', '/html/product.html');
    } else {
      EmailOrPass();
      if (flag) {
        temp = JSON.parse(localStorage.getItem('data'));
        temp.forEach(element => {
          arr.push(element);
        });
        arr.push(data);
        localStorage.setItem('data', JSON.stringify(arr));
        // key
        localStorage.setItem('key', JSON.stringify(data.username));
        $('.regHref').attr('href', '/html/product.html');
        $('.frm')[0].reset();
      }
    }
    // $('.frm')[0].reset();
  } else {
    alert('Somthing Was Wrong');
    $('.regHref').attr('href', '');
    $('.frm')[0].reset();
  }
}

function EmailOrPass() {
  let l = [];
  l = JSON.parse(localStorage.getItem('data'));
  l.forEach(element => {
    if (element.username === data.username || element.email === data.email) {
      flag = false;
    }
  });
  if (!flag) {
    alert('This User Was Alredy Exist');
    $('.regHref').attr('href', '');
    // location.reload();
  }
}

// profile image
let base64 = '';
const profileImg = function (myFile) {
  let reader = new FileReader();
  reader.onload = function () {
    base64 = reader.result;
  };
  reader.readAsDataURL(myFile.files[0]);
};

$(document).on('keydown', function (e) {
  if (e.key === 'Enter') {
    getUD();
  }
});

// regex
function RegEx() {
  $('#username').blur(function () {
    let regex = /^[a-zA-Z0-9]+$/;
    let str = $('#username').val();
    if (regex.test(str)) {
      $('#username').removeClass('color');
      $('#userId').remove();
    } else {
      $('#username').addClass('color');
      $('#userId').remove();
      $('.us').append(
        `<small id="userId" class="erorCl">Enter Correct Username</small>`
      );
    }
  });

  $('#password').blur(function () {
    let regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let str = $('#password').val();
    if (regex.test(str)) {
      $('#password').removeClass('color');
      $('#passId').remove();
    } else {
      $('#password').addClass('color');
      $('#passId').remove();
      $('.ps').append(
        `<small id="passId" class="erorCl">Enter Strong Password</small>`
      );
    }
  });

  $('#confPassword').blur(function () {
    if ($('#password').val() === $('#confPassword').val()) {
      $('#confPassword').removeClass('color');
      $('#confPassId').remove();
    } else {
      $('#confPassword').addClass('color');
      $('#confPassId').remove();
      $('.cops').append(
        `<small id="confPassId" class="erorCl">Password Not Match</small>`
      );
    }
  });
  $('#mobile').blur(function () {
    let regex = /^[0-9]{10}$/;
    let str = $('#mobile').val();

    if (regex.test(str)) {
      $('#mobile').removeClass('color');
      $('#mobId').remove();
    } else {
      $('#mobile').addClass('color');
      $('#mobId').remove();
      $('.mob').append(
        `<small id="mobId" class="erorCl">Enter Valid Number</small>`
      );
    }
  });
  $('#email').blur(function () {
    let regex = /\S+@\S+\.\S+/;
    let str = $('#email').val();

    if (regex.test(str)) {
      $('#email').removeClass('color');
      $('#emailId').remove();
    } else {
      $('#email').addClass('color');
      $('#emailId').remove();
      $('.vemail').append(
        `<small id="emailId" class="erorCl">Enter Valid Email</small>`
      );
    }
  });
}

function valDate() {
  let d = new Date();
  let date = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  $('#dob').attr('max', `${year}-0${month}-${date}`);
  if (month === 10 || month === 11 || month === 12) {
    $('#dob').attr('max', `${year}-${month}-${date}`);
  }
}
