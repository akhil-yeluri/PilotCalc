var months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

  var Age = {
    date: -12,
    month: -12,
    year: -12,
  };

  var result = CalculateAge(DOB, Age);

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
    Age.year +
    ' Years ' +
    Age.month +
    ' Months ' +
    Age.date +
    ' Days';
}

function CalculateAge(DOB, Age) {
  var today = new Date();

  var currentDate = today.getDate();
  var currentMonth = today.getMonth() + 1;
  var currentYear = today.getFullYear();

  var Today = {
    date: currentDate,
    month: currentMonth,
    year: currentYear,
  };

  if (
    currentMonth == DOB.month &&
    currentDate == DOB.date &&
    currentYear == DOB.year
  )
    return 0;

  if (
    currentYear < DOB.year ||
    currentMonth < DOB.month ||
    currentDate < DOB.date
  )
    return -1;

  //same Year
  if (currentYear == DOB.year) {
    GetAgeForSameYear(DOB, Today, Age);
    return;
  }

  //different Year
  if (DOB.year + 1 == currentYear) {
    //consecutive years
    GetAgeForConsecutiveYears(DOB, Today, Age);
  }

  //non-consecutive years
  else {
    var addYears = Today.year - DOB.year - 1;
    DOB.year = Today.year - 1;
    GetAgeForConsecutiveYears(DOB, Today, Age);
    Age.year += addYears;
    return;
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

function GetAgeForConsecutiveYears(DOB, Today, Age) {
  var monthCounter = 0;

  if (DOB.month == Today.month && DOB.date == Today.date) {
    Age.year = 1;
    Age.month = 0;
    Age.date = 0;
    return;
  }

  //same month different date //stable
  if (DOB.month == Today.month) {
    if (DOB.date > Today.date) {
      var oldMonthsCompleted = Math.abs(12 - DOB.month);
      var newMonthsCompleted = Math.abs(1 - Today.month);

      var oldDaysCompleted = months[DOB.month - 1] - DOB.date;

      Age.year = 0;
      Age.month = oldMonthsCompleted + newMonthsCompleted;
      Age.date = oldDaysCompleted + Today.date;

      return;
    } else {
      var oldMonthsCompleted = Math.abs(12 - DOB.month);
      var newMonthsCompleted = Math.abs(1 - Today.month);

      Age.year = 1;
      Age.month = 0;
      Age.date = Today.date - DOB.date;
      return;
    }
  }

  //stable code
  if (DOB.month < Today.month) {
    Age.year = 1;

    if (DOB.date == Today.date) {
      Age.month = Today.month - DOB.month;
      Age.date = 0;
      return;
    }

    if (DOB.date > Today.date) {
      Age.month = Today.month - DOB.month - 1;

      var pastmonthDays = months[DOB.month - 1] - DOB.date;

      Age.date = pastmonthDays + Today.date;

      return;
    } else {
      Age.month = Today.month - DOB.month;
      Age.date = Today.date - DOB.date;
      return;
    }
  }

  //stable
  if (DOB.month > Today.month && DOB.date <= Today.date) {
    monthCounter++;
    var oldMonthsCompleted = Math.abs(12 - DOB.month);
    var newMonthsCompleted = Math.abs(1 - Today.month);

    Age.year = 0;
    Age.month = monthCounter + oldMonthsCompleted + newMonthsCompleted;
    Age.date = Today.date - DOB.date;

    return;
  }

  //stable
  if (DOB.month > Today.month && DOB.date > Today.date) {
    var oldMonthsCompleted = Math.abs(12 - DOB.month);
    var newMonthsCompleted = Math.abs(1 - Today.month);
    var oldDaysCompleted = 0;

    if (months[DOB.month - 1] == 30)
      oldDaysCompleted = months[DOB.month - 1] - DOB.date + 1;
    else oldDaysCompleted = months[DOB.month - 1] - DOB.date;

    Age.year = 0;
    Age.month = oldMonthsCompleted + newMonthsCompleted;
    Age.date = oldDaysCompleted + Today.date;

    return;
  }
}

function GetAgeForSameYear(DOB, Today, Age) {
  Age.year = 0;

  if (DOB.date == Today.date) {
    Age.date = 0;
    Age.month = Math.abs(Today.month - DOB.month);
    return;
  }

  if (DOB.date > Today.date) {
    Age.date = months[DOB.month - 1] - DOB.date + Today.date;
    Age.month = Today.month - DOB.month - 1;
  }

  if (DOB.date < Today.date) {
    Age.month = Today.month - DOB.month;
    Age.date = Today.date - DOB.date;
  }
}
