function SetAge()
{
    var dob = document.getElementById("dob").value
    
    var date = GetDate(dob)
    var month = GetMonth(dob)
    var year = GetYear(dob)
    
    var DateObject = {
        "date":date,
        "month":month,
        "year": year
    }

    var result = CalculateAge(DateObject)
    
    if(result==-1)
    {
        document.getElementById('age').innerHTML = "DOB can't be greater than current date"
        return;
    }

    if(result==0)
    {
        document.getElementById('age').innerHTML = "Some Random Seconds"
        return;
    }

  document.getElementById('age').innerHTML = 'Your Age is '+DateObject.year+' Years '+DateObject.month+' Months '+DateObject.date+' Days';
}

function CalculateAge(DateObject)
{
    var Today= new Date();

    var currentDate = Today.getDate();
    var currentMonth = Today.getMonth()+1;
    var currentYear = Today.getFullYear();

    if(currentMonth == DateObject.month && currentDate==DateObject.date && currentYear==DateObject.year)
    {
        return 0;
    }

    if((currentMonth <= DateObject.month && currentDate<DateObject.date && currentYear<=DateObject.year)|| currentYear<DateObject.year)
            return -1;

    if(currentMonth >= DateObject.month && currentDate>=DateObject.date)
        DateObject.year = Math.abs(currentYear-DateObject.year)
    else
        DateObject.year = Math.abs(currentYear-DateObject.year)-1

    if(currentMonth!=DateObject.month)
        DateObject.month=Math.abs(currentMonth-DateObject.month)
    else
        if(currentDate>=DateObject.date )
            DateObject.month=0
        else
            DateObject.month=11


    
     DateObject.date = Math.abs(currentDate-DateObject.date)

     
      
}


function GetDate(Date)
{  
  return parseInt( Date.substring(Date.length-2,Date.length))
}

function GetMonth(Date)
{  
    return parseInt( Date.substring(Date.length-5,Date.length-3))
}

function GetYear(Date)
{  
    return parseInt( Date.substring(0,5))
}