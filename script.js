// RETRIVE DATA
function retrivedata() {
  let rdata = localStorage.getItem("entries");
  if (rdata) {
    rdata = JSON.parse(rdata);
  } else {
    rdata = [];
  }
  return rdata;
}
let tabdata = retrivedata();
// console.log(tabdata);
let tbody = document.getElementById("rdata");
function printTable() {
  for (i = 0; i < tabdata.length; i++) {
    tbody.innerHTML += ` <tr>
  <td>${tabdata[i].name}</td>
  <td>${tabdata[i].email}</td>
  <td>${tabdata[i].password}</td>
  <td>${tabdata[i].dob}</td>
  <td>${tabdata[i].acceptTerms}</td>
</tr>
`;
  }
}

// AGE VALIDATION
let form = document.querySelector("form");
let entries = tabdata;
function validate() {
  let dob = form[3].value;
  // console.log(form[3].value.length);
  let year = Number(dob.substr(0, 4));
  let month = Number(dob.substr(5, 2)) - 1;
  let day = Number(dob.substr(8, 2));
  let today = new Date();
  let age = today.getFullYear() - year;
  if (
    today.getMonth() < month ||
    (today.getMonth() == month && today.getDate() < day)
  )
    age--;

  // console.log(age);
  if (age < 18 || age > 55) {
    form[3].setCustomValidity("Age Must Be Greater Than 18 And Less Than 55");
  } else if (!validateEmail(form[1].value)) {
    form[1].setCustomValidity("Enter Correct Email Id");
  } else {
    //LOCAL STORAGE SAVE '
    let data = {
      name: form[0].value,
      email: form[1].value,
      password: form[2].value,
      dob: form[3].value,
      acceptTerms: form[4].value,
    };
    entries.push(data);
    localStorage.setItem("entries", JSON.stringify(entries));
    printTable();
  }
}
printTable();
// VALIDATE EMAIL
function validateEmail(email) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}
