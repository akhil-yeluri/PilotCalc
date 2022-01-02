function SetAge() {
  var dob = document.getElementById('dob-picker').value;

  var date = GetDate(dob);
  var month = GetMonth(dob);
  var year = GetYear(dob);

  var DOB = {
    date: date,
    month: month,
    year: year,
  };

  var result = CalculateAge(DOB);

  if (result == -1) {
    document.getElementById('ageText').innerHTML =
      "DOB can't be greater than current date";
    return;
  }

  if (result == 0) {
    document.getElementById('ageText').innerHTML = 'Some Random Seconds';
    return;
  }

  document.getElementById('ageText').innerHTML =
    'Your Age is ' +
    DOB.year +
    ' Years ' +
    DOB.month +
    ' Months ' +
    DOB.date +
    ' Days';
}

function CalculateAge(DOB) {
  var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var Today = new Date();

  var currentDate = Today.getDate();
  var currentMonth = Today.getMonth() + 1;
  var currentYear = Today.getFullYear();

  if (
    currentMonth == DOB.month &&
    currentDate == DOB.date &&
    currentYear == DOB.year
  )
    return 0;

  if (
    (currentMonth <= DOB.month &&
      currentDate < DOB.date &&
      currentYear <= DOB.year) ||
    currentYear < DOB.year
  )
    return -1;

  //same Year
  if (currentYear == DOB.year) {
    DOB.year = 0;
    DOB.month = Math.abs(DOB.month - currentMonth);
    DOB.date = Math.abs(DOB.date - currentDate);
  }

  //different Year
  if (DOB.year < currentYear) {
    //consecutive years
    if (DOB.year + 1 == currentYear) {
      //exact 1 year
      if (currentMonth - DOB.month == 0 && currentDate - DOB.date == 0) {
        DOB.year = 1;
        DOB.month = 0;
        DOB.date = 0;
        return;
      }

      if (DOB.month > currentMonth) {
        DOB.year = 0;
        var oldMonthsCompleted = Math.abs(DOB.month - 12);
        var newMonthsCompleted = Math.abs(1 - currentMonth);

        var oldDaysCompleted = Math.abs(DOB.date - months[DOB.month - 1]);
        var newDaysCompleted = Math.abs(0 - currentDate);

        DOB.month = oldMonthsCompleted + newMonthsCompleted;
        DOB.date = oldDaysCompleted + newDaysCompleted;

        if (DOB.date >= 30) {
          DOB.month++;
          DOB.date = Math.abs(DOB.date - months[currentMonth - 1]);
        }
      }
    }
  }
}

function GetDate(Date) {
  return parseInt(Date.substring(Date.length - 2, Date.length));
}

function GetMonth(Date) {
  return parseInt(Date.substring(Date.length - 5, Date.length - 3));
}

function GetYear(Date) {
  return parseInt(Date.substring(0, 5));
}
