function roll(min, max, floatFlag) {
    const r = Math.random() * (max - min) + min;
    return floatFlag ? r : Math.floor(r);
};
const startDay = new Date("3/15/2020");
const month = buildMonth(startDay);
const annualIncome = roll(31000, 40000, 1).toFixed(2);
const monthlyIncome = parseFloat(annualIncome) / 12;
const rent = roll(1200, 1800, 1).toFixed(2);
const utilities = roll(300, 500, 1).toFixed(2)
const monthlyBudget = monthlyIncome - parseFloat(rent) - parseFloat(utilities)
const monthlyNetValue = getMonthNetValue()
displayMonth(month, monthlyBudget, monthlyNetValue)
displayExpenses()
function generateExpenses() {
    const expenseCount = roll(0, 4)
    return [...Array(expenseCount)].map((_, i) => {
        return {
            index: i,
            value: roll(1, 30, 1)
        }
    })
}
function displayExpenses() {
    const days = document.getElementsByClassName('day')
    Array.from(days).forEach(function(day, i) {
        let dayHtml = day.innerHTML
        dayHtml += month[i].expenses.reduce(function(accum, expense) {
            return accum + `<div class="expense">
                -\$${expense.value.toFixed(2)}
            </div>`    
        }, '')
        day.innerHTML = dayHtml
    })
}
function getMonthNetValue() {
    const monthlyExpenseTotal = month.reduce(function(accum, day) {
        return accum + getDailyCost(day)    
    }, 0)
    
    return monthlyBudget - monthlyExpenseTotal
}
function getDailyCost(day) {
    return day.expenses.reduce(function(accum, expense) {
        return accum + parseFloat(expense.value)    
    }, 0)    
}
function getNextDay(day) {
    const nextDay = new Date(day)
    nextDay.setDate(day.getDate() + 1)
    return nextDay
}
function buildMonth(day) {
    const daysInMonth = getDaysInMonth(day.getMonth() + 1, day.getFullYear())
    let iterableDay = new Date(day)
    iterableDay.setDate(1)
    const month = [...Array(daysInMonth)].map((_, i) => {
        const monthDay = {
            index: i,
            date: iterableDay,
            expenses: generateExpenses()
        }
        iterableDay = getNextDay(iterableDay)
        return monthDay
    })
    return month
}
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}
function displayMonth(month, budget, netValue) {
    const monthHtml = `<div class="monthly-summary">
        Budget: \$${budget.toFixed(2)} | Net Value: \$${netValue.toFixed(2)}
    </div>` +
    month.reduce(function(accumulator, day) {
        return accumulator + `<div class="day">${day.date.getDate()}</div>`    
    }, '')
    document.getElementById('MonthlyExpenses').innerHTML = monthHtml
}