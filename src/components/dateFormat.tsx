const DateFormat = (fullDate: Date) => {
    const persianDate = fullDate.toLocaleDateString('fa-IR').split('/')

    let monthsInPersian

    switch (persianDate[1]) {
        case '۱':
            monthsInPersian = 'فروردين'
            break;
        case '۲':
            monthsInPersian = 'ارديبهشت'
            break
        case '۳':
            monthsInPersian = 'خرداد'
            break
        case '۴':
            monthsInPersian = 'تير'
            break
        case '۵':
            monthsInPersian = 'مرداد'
            break
        case '۶':
            monthsInPersian = 'شهريور'
            break
        case '۷':
            monthsInPersian = 'مهر'
            break
        case '۸':
            monthsInPersian = 'آبان'
            break
        case '۹':
            monthsInPersian = 'آذر'
            break
        case '۱۰':
            monthsInPersian = 'دي'
            break
        case '۱۱':
            monthsInPersian = 'بهمن'
            break
        case '۱۲':
            monthsInPersian = 'اسفند'
            break
    }

    return <div className='flex space-x-1 justify-end'> <span>{persianDate[0]}</span> <span>{monthsInPersian}</span> <span>{persianDate[2]}</span> </div>
}

export default DateFormat