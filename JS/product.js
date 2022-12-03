$(document).ready(function () {
  if (location.reload) {
  }
  $('.pform').slideUp();

  if (JSON.parse(localStorage.getItem('prod'))) {
    showProduct();
  }

  $('.proBtn').click(function (e) {
    openbox();
    allData();
  });
  $('.over').on('click', function () {
    closebox();
    closeedit();
    closepop();
  });
  $('.Xbtn').on('click', closebox);
  profile();

  // update
  $('#Isub').click(function (e) {
    e.preventDefault();
    update();
    profile();
  });

  // add
  $('.addProduct').click(function (e) {
    productAdd();
    pbase642 = '';
    pbase643 = '';
  });

  $('.slidBtn').click(function () {
    $('.pform').slideToggle('slow');
  });

  $('.jsCross').click(function () {
    $(this).parents('.forZ').addClass('hide');
  });

  $('.prName').on('keyup', function () {
    $('.upPrd').removeAttr('disabled');
  });

  $('.crossCl').click(function () {
    $(this).parent('label').siblings('input').val('');
  });
  regexF();
});

// key
let ke = JSON.parse(localStorage.getItem('key'));

// all data
let data = JSON.parse(localStorage.getItem('data'));

// update
let temp = [];
temp = data;
function update() {
  temp.forEach(element => {
    if (
      element.username === ke &&
      $('#Iemail').val() !== '' &&
      $('#Ifull').val() !== '' &&
      $('#Idob').val() !== '' &&
      $('#Imobile').val() !== '' &&
      $('#Iadd').val() !== ''
    ) {
      element.username = $('#Iusername').val();
      element.email = $('#Iemail').val();
      element.fullname = $('#Ifull').val();
      element.dob = $('#Idob').val();
      element.mobile = $('#Imobile').val();
      element.add = $('#Iadd').val();
      if ($('#Iimg').val()) {
        element.pimg = base64;
      }
      localStorage.setItem('key', JSON.stringify(element.username));
      ke = JSON.parse(localStorage.getItem('key'));

      localStorage.setItem('data', JSON.stringify(temp));
      data = JSON.parse(localStorage.getItem('data'));
      // closebox();
    }
  });
}

// edit
function allData() {
  data.forEach(element => {
    if (element.username === ke) {
      $('#Iusername').val(element.username);
      $('#Ifull').val(element.fullname);
      $('#Iemail').val(element.email);
      $('#Idob').val(element.dob);
      $('#Imobile').val(element.mobile);
      $('#Iadd').val(element.add);
    }
  });
}

// profile change
function profile() {
  data.forEach(element => {
    if (element.username === ke) {
      $('.imgCl').attr('src', element.pimg);
      $('.nameP').text(element.fullname);
    }
  });
}

// image
let base64 = '';
const profileImg = function (myFile) {
  let reader = new FileReader();
  reader.onload = function () {
    base64 = reader.result;
  };
  reader.readAsDataURL(myFile.files[0]);
};

function openbox() {
  $('.Ifrm').removeClass('hide');
  $('.over').removeClass('hide');
}

function closebox() {
  $('.Ifrm').addClass('hide');
  $('.over').addClass('hide');
}

$(document).on('keydown', function (e) {
  if (e.key === 'Escape') {
    closebox();
    closeedit();
    closepop();
  }
});

// product img
let pbase64 = '';
const productImg = function (myFile) {
  let reader = new FileReader();
  reader.onload = function () {
    pbase64 = reader.result;
    $(myFile).siblings('.forZ').removeClass('hide');
    $('.editimgPr').attr('src', pbase64);
  };
  reader.readAsDataURL(myFile.files[0]);
  pbase64 = '';
};

let pbase642 = '';
const productImg2 = function (myFile) {
  let reader = new FileReader();
  reader.onload = function () {
    pbase642 = reader.result;
    $(myFile).siblings('.forZ').removeClass('hide');
    $('.editimgPr2').attr('src', pbase642);
  };
  reader.readAsDataURL(myFile.files[0]);
};

let pbase643 = '';
const productImg3 = function (myFile) {
  let reader = new FileReader();
  reader.onload = function () {
    pbase643 = reader.result;

    $(myFile).siblings('.forZ').removeClass('hide');
    $('.editimgPr3').attr('src', pbase643);
  };
  reader.readAsDataURL(myFile.files[0]);
};

// product
let bunch = [],
  pdata,
  opt = [];
function productAdd() {
  if (
    $('.pName').val() !== '' &&
    $('#pImg').val() !== '' &&
    $('#pPrice').val() !== ''
  ) {
    alert('Your Product Add Sucsessfully');
    pdata = {
      pusername: JSON.parse(localStorage.getItem('key')),
      pname: $('.pName').val(),
      pimg: pbase64,
      pimg2: pbase642,
      pimg3: pbase643,
      pprice: $('#pPrice').val(),
    };
    pbase642 = '';
    pbase643 = '';
    if (JSON.parse(localStorage.getItem('prod')) === null) {
      bunch.push(pdata);
      localStorage.setItem('prod', JSON.stringify(bunch));
      bunch.length = 0;
      $('.pform')[0].reset();
    } else {
      opt = JSON.parse(localStorage.getItem('prod'));
      opt.forEach(element => {
        bunch.push(element);
      });
      bunch.push(pdata);
      localStorage.setItem('prod', JSON.stringify(bunch));
      opt.length = 0;
      bunch.length = 0;
      $('.pform')[0].reset();
    }
  } else {
    alert('Fill Item');
  }
  showProduct();
}

// show product
let showpr = [];
function showProduct() {
  showpr = JSON.parse(localStorage.getItem('prod'));
  $('.pdt1').remove();
  showpr.forEach((element, ind) => {
    if (JSON.parse(localStorage.getItem('key')) === element.pusername) {
      $('.productSec').append(`<div class="pdt1">
      <div class="pdt mar op">
      <a class="imgA" onclick="popup(${ind})">
            <div>
              <img
                class="productImg"
                src="${element.pimg}"
              />
          </div>
          <p class="filName">${element.pname}</p>
          <b class="filPrice">${element.pprice}</b>
          <div> </a>
        <button type="button" onclick="prEdit(${ind})" class="edit newbtn btn">edit</button>
        <button type="button" onclick="deleted(${ind})" class="edit newbtn btn">delete</button></div>
  </div></div>
  `);
    }
  });
  showpr.length = 0;
}

// delete
let del = [];
function deleted(ind) {
  if (confirm('Sure You Delete This Product') === true) {
    del = JSON.parse(localStorage.getItem('prod'));
    del.splice(ind, 1);
    localStorage.setItem('prod', JSON.stringify(del));
    showProduct();
  }
}

// product img popup
let pop = [];
function popup(prInd) {
  pop = JSON.parse(localStorage.getItem('prod'));
  pop.forEach((element, ind) => {
    if (ind === prInd) {
      $('.img1').attr('src', element.pimg);
      $('.img2').attr('src', element.pimg2);
      $('.img3').attr('src', element.pimg3);
    }
  });
  openpop();
}

// popup open close
function openpop() {
  $('.prImg').removeClass('hide');
  $('.over').removeClass('hide');
}
function closepop() {
  $('.prImg').addClass('hide');
  $('.over').addClass('hide');
}

// edit product
let products = [];
let flag = false;
function prEdit(value) {
  openedit();
  $('.prbtn').click(function () {
    closeedit();
  });
  products = JSON.parse(localStorage.getItem('prod'));

  products.forEach((element, ind) => {
    if (value === ind) {
      $('.editimgPr').attr('src', element.pimg);
      $('.editimgPr2').attr('src', element.pimg2);
      if (element.pimg2 === '') {
        $('.editimgPr2').parents('.forZ').addClass('hide');
      } else {
        $('.editimgPr2').parents('.forZ').removeClass('hide');
      }

      $('.editimgPr3').attr('src', element.pimg3);
      if (element.pimg3 === '') {
        $('.editimgPr3').parents('.forZ').addClass('hide');
      } else {
        $('.editimgPr3').parents('.forZ').removeClass('hide');
      }
      $('.prName').val(element.pname);
      $('.prPrice').val(element.pprice);
      $('#prImg').val('');

      $('.upPrd').click(function () {
        if ($('.prName').val() !== '' && $('.prPrice').val() !== '') {
          // $(".upPrd").removeAttr("disabled");
          element.pname = $('.prName').val();
          element.pprice = $('.prPrice').val();
          if ($('#prImg').val()) {
            element.pimg = pbase64;
          }
          if ($('#prImg2').val()) {
            element.pimg2 = pbase642;
          }
          if ($('#prImg3').val()) {
            element.pimg3 = pbase643;
          }
          try {
            localStorage.setItem('prod', JSON.stringify(products));
          } catch (error) {
            console.log(error);
          }
          showProduct();
          closeedit();
        } else {
          $('.upPrd').attr('disabled');
        }
      });
    }
  });
}

function openedit() {
  $('.prFrm').removeClass('hide');
  $('.over').removeClass('hide');
}

function closeedit() {
  $('.prFrm').addClass('hide');
  $('.over').addClass('hide');
  $('.forZ').removeClass('hide');
}

// add product regex
let arr1 = JSON.parse(localStorage.getItem('prod'));
$('.pName').blur(function () {
  let str = $('.pName').val();
  let fl = false;
  $('.pName').removeClass('color');
  $('#undnd').remove();
  arr1.forEach(element => {
    if (element.pname === str) {
      fl = true;
    }
  });
  if (fl) {
    $('.pName').val('');
    $('.pName').addClass('color');
    $('.und').append(
      `<br><small id="undnd" style="color: red;">User Was Already Exist</small>`
    );
  }
});

// edit product regex
$('#prPrice').blur(function () {
  let regex = /^[0-9]{1,}$/;
  let str = $('#prPrice').val();
  if (regex.test(str)) {
    $('#prPrice').removeClass('color');
  } else {
    $('#prPrice').addClass('color');
  }
});

$('#prName').blur(function () {
  let regex = /^[0-9a-zA-Z@#$%&*!]{1,}$/;
  let str = $('#prName').val();
  if (regex.test(str)) {
    $('#prName').removeClass('color');
  } else {
    $('#prName').addClass('color');
  }
});

function regexF() {
  $('#Iemail').blur(function () {
    let regex = /\S+@\S+\.\S+/;
    let str = $('#Iemail').val();

    if (regex.test(str)) {
      $('#Iemail').removeClass('color');
    } else {
      $('#Iemail').val('');
      $('#Iemail').addClass('color');
    }
  });

  $('#Imobile').blur(function () {
    let regex = /^[0-9]{10}$/;
    let str = $('#Imobile').val();

    if (regex.test(str)) {
      $('#Imobile').removeClass('color');
    } else {
      $('#Imobile').val('');
      $('#Imobile').addClass('color');
    }
  });

  $('#Ifull').blur(function () {
    let str = $('#Ifull').val();
    if (str === '') {
      $('#Ifull').addClass('color');
    } else {
      $('#Ifull').removeClass('color');
    }
  });

  let d = new Date();
  let date = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  if (month === 10 || month === 11 || month === 12) {
    $('#Idob').attr('max', `${year}-${month}-${date}`);
  } else {
    $('#Idob').removeAttr('max');
    $('#Idob').attr('max', `${year}-0${month}-0${date}`);
  }
}

// searching
$(document).ready(function () {
  $('#myInput').on('keyup', function () {
    console.log(this);
    var value = $(this).val().toLowerCase();
    $('.productSec .filName').filter(function () {
      $(this)
        .parents('.pdt1')
        .toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

// price filter
function demo1(val) {
  $('.productSec .filPrice').filter(function () {
    $(this)
      .parents('.pdt1')
      .toggle(Number($(this).text()) > val);
  });
}
function demo2(val) {
  $('.productSec .filPrice').filter(function () {
    $(this)
      .parents('.pdt1')
      .toggle(Number($(this).text()) < val);
  });
}

// $(document).ready(function () {
// let first, last;
//   $('.productSec .filPrice').filter(function () {
//     $(this)
//       .parents('.pdt1')
//       .toggle(Number($(this).text()) > 1);
//     $(this)
//       .parents('.pdt1')
//       .toggle(Number($(this).text()) < 100);
//   });
// });
