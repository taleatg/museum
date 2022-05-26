let valueBasic;
let valueSenior;
let value1;
let value2;
let euro;
let totalEuro;
let ticketType;
let currentTotal;
let currentTypeTicket;
let date;
let paymentTime;
let typeInPayment;
let totalPayment;
let costCurrentTypeBasic;
let costCurrentTypeSenior;
let costBasic;
let costSenior;
let today;
let options;
let selectTypeInPayment;
let currentTicket;
let type;

function ticketsAmount() {
    const basicMinus = document.querySelectorAll('.basic-button-minus');
    const basicPlus = document.querySelectorAll('.basic-button-plus');
    const seniorMinus = document.querySelectorAll('.senior-button-minus');
    const seniorPlus = document.querySelectorAll('.senior-button-plus');
    ticketType = document.querySelectorAll('.radio-tickets');
    valueBasic = localStorage.getItem('basic') || 1;
    valueSenior = localStorage.getItem('senior') || 1;
    euro = document.querySelector('.euro');
    currentTotal = localStorage.getItem('total');
    currentTypeTicket = localStorage.getItem('type');
    typeInPayment = document.querySelector('.payment__tickets-type');
    totalPayment = document.querySelector('.total__value-payment');
    costCurrentTypeBasic = document.querySelectorAll('.cost-current-type__basic');
    costCurrentTypeSenior = document.querySelectorAll('.cost-current-type__senior');
    costBasic = document.querySelector('.cost-basic');
    costSenior = document.querySelector('.cost-senior');
    selectTypeInPayment = document.getElementById('select');

    date = document.querySelector('.date');

    totalEuro = 0;

    basicMinus.forEach(item => {
        item.addEventListener('click', () => removeTicket(valueBasic, 'basic'));
    })

    basicPlus.forEach(item => {
        item.addEventListener('click', () => addTicket(valueBasic, 'basic'));
    })

    seniorMinus.forEach(item => {
        item.addEventListener('click', () => removeTicket(valueSenior, 'senior'));
    })


    seniorPlus.forEach(item => {
        item.addEventListener('click', () => addTicket(valueSenior, 'senior'));
    })

    ticketType.forEach(item => {
        item.addEventListener('click', currentTicketType);
    })

    selectTypeInPayment.onchange = function () {
        selectTypeTicket();
    }

    window.addEventListener('DOMContentLoaded', currentValue);

    today = new Date;
    options = {month: 'long', day: 'numeric', weekday: 'long',};


    document.getElementById('date').min = today.getFullYear() + '-' + (+today.getMonth() + 1) + '-' + today.getDate();
    document.getElementById('date').max = today.getFullYear() + '-' + (+today.getMonth() + 5) + '-' + today.getDate();

    document.getElementById('time').onchange = function () {
        document.querySelector('.payment__time ').innerHTML = document.getElementById('time').value || '09:00';
    };

    document.getElementById('date').onchange = function () {
        let selectDate = new Date(document.getElementById('date').value);

        document.querySelector('.payment__date ').innerHTML = selectDate.toLocaleDateString('en-BR', options);
    }
}

function selectedTime() {
    document.querySelector('.payment__time ').innerHTML = document.getElementById('selected-time').value;
}

    function removeTicket(ticketAmount, className) {
        if (ticketAmount > 0) {
            ticketAmount--;
            document.getElementById(className).value = ticketAmount;
            document.getElementById('book-' + className).value = ticketAmount;
            document.querySelector('.amount-tickets__' + className).innerHTML = ticketAmount;
            className === 'basic' ? valueBasic-- : valueSenior--;
            currentTicketType();
            localStorage.setItem(className, ticketAmount);
        }
    }

    function addTicket(ticketAmount, className) {
        if (ticketAmount < 20) {
            ticketAmount++;
            document.getElementById(className).value = ticketAmount;
            document.getElementById('book-' + className).value = ticketAmount;
            document.querySelector('.amount-tickets__' + className).innerHTML = ticketAmount;
            className === 'basic' ? valueBasic++ : valueSenior++;
            currentTicketType();
            localStorage.setItem(className, ticketAmount);
        }
    }

    function typeTicket(currentType) {
        selectTypeInPayment.value =  currentType;
        typeInPayment.innerHTML = currentType;

        if (currentType === 'Permanent exhibition') {
            value1 = 20;
            value2 = 10;
            costOneTicket(value1, value2);
        } else if (currentType === 'Temporary exhibition') {
            value1 = 25;
            value2 = 12.5;
            costOneTicket(value1, value2);
        } else if (currentType === 'Combined admission') {
            value1 = 40;
            value2 = 20;
            costOneTicket(value1, value2);
        }

        localStorage.setItem('type', currentType);
        localStorage.setItem('value1', value1);
        localStorage.setItem('value2', value2);
    }

    function selectTypeTicket() {
        type = selectTypeInPayment.value;
        countTotalSum(type);
        defineCurrentType(type)
    }

    function currentTicketType() {
        currentTicket = document.querySelector('input[name="radio"]:checked').value;
        countTotalSum(currentTicket);
    }

    function costOneTicket(value1, value2) {
        costCurrentTypeBasic[0].innerHTML = costCurrentTypeBasic[1].innerHTML = value1 + ' €';
        costCurrentTypeSenior[0].innerHTML =  costCurrentTypeSenior[1].innerHTML = value2 + ' €';

        costSelectedTicket();
    }

    function costSelectedTicket() {
        costBasic.innerHTML = value1 * valueBasic + ' €';
        costSenior.innerHTML = value2 * valueSenior + ' €';
    }

    function countTotalSum(type) {
        typeTicket(type);

        totalEuro = value1 * valueBasic + value2 * valueSenior;
        euro.innerHTML = totalEuro;
        totalPayment.innerHTML = totalEuro + ' €';

        localStorage.setItem('total', totalEuro);
    }

    function defineCurrentType(arg) {
        for (let i = 0; i < ticketType.length; i++) {
            if (ticketType[i].value === arg) {
                ticketType[i].checked = true;
                selectTypeInPayment.value = ticketType[i].value;
                break;
            }
        }
    }

    function currentValue() {
        document.querySelector('.payment__date ').innerHTML = today.toLocaleDateString('en-BR', options);
        defineCurrentType(currentTypeTicket);
        euro.innerHTML = currentTotal || 30;
        totalPayment.innerHTML = (currentTotal || 30) + ' €';
        document.getElementById('basic').value = valueBasic || 1;
        document.getElementById('book-basic').value = valueBasic || 1;
        document.querySelector('.amount-tickets__basic').innerHTML = valueBasic || 1;

        document.getElementById('senior').value = valueSenior || 1;
        document.getElementById('book-senior').value = valueSenior || 1;
        document.querySelector('.amount-tickets__senior').innerHTML = valueSenior || 1;

        typeInPayment.innerHTML = localStorage.getItem('type') || ticketType[0].value;

        costCurrentTypeBasic[0].innerHTML = costCurrentTypeBasic[1].innerHTML = (localStorage.getItem('value1') || 20) + ' €';
        costCurrentTypeSenior[0].innerHTML =  costCurrentTypeSenior[1].innerHTML = (localStorage.getItem('value2') || 10) + ' €';

        costBasic.innerHTML = (localStorage.getItem('value1') * valueBasic || 20) + ' €';
        costSenior.innerHTML = (localStorage.getItem('value2') * valueSenior || 10) + ' €';
    }

export {
    ticketsAmount,
}


