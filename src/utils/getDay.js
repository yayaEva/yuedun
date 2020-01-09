import moment from 'moment'

export function getDay(day) {
    let today = new Date()
    let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
    today.setTime(targetday_milliseconds)
    today = moment(today).format('YYYY-MM-DD')
    return {
        id: moment(today).unix(),
        date: today,
    }
}

export function getDayRange(days=[{ value: -7, label: '近一周' }, -15, -30, -90, { value: -365/2, label: '近半年' }, { value: -365, label: '近一年' }]) {
    return days.map((day) => {
            if (typeof day !== 'object') {
                return { value: day, label: `近${Math.abs(day)}天` }
            }
            return day
        })
        .map((day) => ({
            ...getDay(day.value),
            value: day.label,
        }))
}