// Данные услуг
const SERVICES = {
    'tow-truck': {
        title: '🚚 Вызов эвакуатора',
        phone: '+7 (962) 823-30-82',
        description: 'Круглосуточная служба эвакуации автомобилей в Новосибирске. Приедем в течение 30 минут по городу.'
    },
    'commissioner': {
        title: '👨‍💼 Вызов аварийного комиссара',
        phone: '+7 (923) 154-90-60',
        description: 'Профессиональное оформление ДТП на месте для страховой компании. Работаем 24/7.'
    },
    'lawyer': {
        title: '⚖️ Консультация автоюриста',
        phone: '+7 (923) 154-90-60',
        telegram: 'https://t.me/Avtopravonsk',
        description: 'Помощь в спорах со страховыми компаниями, ГИБДД, оспаривании виновности в ДТП.'
    },
    'calculator': {
        title: '🧮 Калькулятор неустойки по ОСАГО',
        description: 'Рассчитайте неустойку за просрочку ремонта'
    },
    'dtp-guide': {
        title: '📋 Что делать при ДТП: пошаговая инструкция',
        guide: [
            '1. <strong>Остановитесь</strong>, включите аварийную сигнализацию, выставьте знак аварийной остановки.',
            '2. <strong>Проверьте, есть ли пострадавшие</strong>. Если есть — немедленно вызовите скорую помощь по номеру 103 или 112.',
            '3. <strong>Вызовите ГИБДД</strong> по номеру 102 и аварийного комиссара.',
            '4. <strong>Не перемещайте</strong> предметы, имеющие отношение к ДТП.',
            '5. <strong>Сфотографируйте</strong> место ДТП с разных ракурсов, повреждения автомобилей, документы участников.',
            '6. <strong>Запишите контакты свидетелей</strong> (ФИО, телефоны).',
            '7. <strong>Заполните извещение о ДТП</strong> вместе со вторым участником (если нет разногласий).',
            '8. <strong>Свяжитесь со страховой компанией</strong> в течение 5 рабочих дней.',
            '9. <strong>Сохраните все документы</strong>: протокол, справку о ДТП, фото, контакты свидетелей.'
        ]
    }
};

// Инициализация Telegram WebApp
let tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand(); // Развернуть на весь экран
    tg.MainButton.hide(); // Скрыть главную кнопку
}

// Показать выбранную услугу
function showService(serviceKey) {
    const contentDiv = document.getElementById('service-content');
    const service = SERVICES[serviceKey];

    contentDiv.innerHTML = '';
    
    let html = `<div class="service-info">
                    <h2>${service.title}</h2>
                    <p>${service.description}</p>`;

    // Для услуг с контактами
    if (serviceKey !== 'dtp-guide') {
        html += `
            <div class="contact-buttons">
                <a href="tel:${service.phone.replace(/\s/g, '')}" class="phone-link">
                    📞 ${service.phone}
                </a>`;
        
        if (service.telegram) {
            html += `
                <a href="${service.telegram}" target="_blank" class="tg-link">
                    💬 Написать в Telegram
                </a>`;
        }
        
        html += `</div>
                <p style="font-size: 0.9rem; color: #666; margin-top: 15px;">
                    Нажмите на номер телефона для автоматического набора
                </p>`;
    } 
    // Для гайда по ДТП
    else {
        html += `<ul class="guide-list">`;
        service.guide.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += `</ul>`;
    }

    html += `
            <div style="margin-top: 25px;">
                <button class="btn btn-white" onclick="goBack()">
                    ← Вернуться к выбору услуги
                </button>
            </div>
        </div>`;
    
    contentDiv.innerHTML = html;
}

// Вернуться на главную
function goBack() {
    document.getElementById('service-content').innerHTML = '';
}
// Функция для показа калькулятора (добавить после goBack())
function showCalculator() {
    // Скрываем обычный контент
    document.getElementById('service-content').style.display = 'none';
    
    // Показываем калькулятор
    const calculatorBlock = document.getElementById('calculator-block');
    calculatorBlock.style.display = 'block';
    
    // Добавляем кнопку "Назад" если её нет
    if (!document.getElementById('calculator-back-btn')) {
        const backButton = document.createElement('div');
        backButton.style.marginTop = '20px';
        backButton.innerHTML = '<button class="btn btn-white" onclick="hideCalculator()">← Вернуться к выбору услуги</button>';
        calculatorBlock.appendChild(backButton);
    }
    
    // Прокручиваем к началу
    window.scrollTo(0, 0);
}

// Функция скрытия калькулятора
function hideCalculator() {
    document.getElementById('service-content').style.display = 'block';
    document.getElementById('calculator-block').style.display = 'none';
}
// Функция для показа второго калькулятора
function showCalculator2() {
    // Скрываем обычный контент и первый калькулятор
    document.getElementById('service-content').style.display = 'none';
    
    const calculator1Block = document.getElementById('calculator-block');
    if (calculator1Block) {
        calculator1Block.style.display = 'none';
    }
    
    // Показываем второй калькулятор
    const calculator2Block = document.getElementById('calculator-payment-block');
    calculator2Block.style.display = 'block';
    
    // Добавляем кнопку "Назад" если её нет
    if (!document.getElementById('calculator2-back-btn')) {
        const backButton = document.createElement('div');
        backButton.id = 'calculator2-back-btn';
        backButton.style.marginTop = '20px';
        backButton.style.marginBottom = '40px';
        backButton.innerHTML = '<button class="btn btn-white" onclick="hideCalculator2()">← Вернуться к выбору услуги</button>';
        calculator2Block.appendChild(backButton);
    }
    
// Функция установки дат по умолчанию для второго калькулятора
function setDefaultDatesForCalculator2() {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    
    const dueDateInput = document.getElementById('dueDate');
    const calculationDateInput = document.getElementById('calculationDatePayment');
    
    if (dueDateInput) {
        const twentyDaysAgo = new Date();
        twentyDaysAgo.setDate(today.getDate() - 20);
        const formattedTwentyDaysAgo = twentyDaysAgo.toISOString().split('T')[0];
        dueDateInput.value = formattedTwentyDaysAgo;
    }
    
    if (calculationDateInput) {
        calculationDateInput.value = formattedToday;
    }
}
    // ПОДКЛЮЧАЕМ ОБРАБОТЧИК ЗАНОВО!
    setTimeout(function() {
        const calcBtn = document.getElementById('calculateBtnPayment');
        if (calcBtn) {
            // Удаляем старый обработчик, если есть
            calcBtn.removeEventListener('click', calculatePaymentPenalty);
            // Добавляем новый
            calcBtn.addEventListener('click', calculatePaymentPenalty);
            console.log('Обработчик для второго калькулятора подключен');
        } else {
            console.error('Кнопка calculateBtnPayment не найдена!');
        }
    }, 100);
    
    // Прокручиваем к началу
    window.scrollTo(0, 0);
}

// Функция скрытия второго калькулятора
function hideCalculator2() {
    document.getElementById('service-content').style.display = 'block';
    document.getElementById('calculator-payment-block').style.display = 'none';
}
// Обновляем showService для обработки калькулятора
function showService(serviceKey) {
    // Скрываем оба калькулятора
    if (document.getElementById('calculator-block')) {
        document.getElementById('calculator-block').style.display = 'none';
    }
    if (document.getElementById('calculator-payment-block')) {
        document.getElementById('calculator-payment-block').style.display = 'none';
    }
    
    if (serviceKey === 'calculator') {
        showCalculator();
        return;
    }
    
    if (serviceKey === 'calculator2') {
        showCalculator2();
        return;
    }
    
    document.getElementById('service-content').style.display = 'block';
    
    // Остальной код showService...
}
// ============================================
// КАЛЬКУЛЯТОР НЕУСТОЙКИ (вставить в КОНЕЦ файла)
// ============================================

// Список официальных праздничных дней РФ (2024-2026 гг.)
const holidays = [
    // 2024 год - официальные праздники
    '2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07',
    '2024-02-23',
    '2024-03-08',
    '2024-05-01', '2024-05-09',
    '2024-06-12',
    '2024-11-04',
    
    // 2024 год - дополнительные выходные дни
    '2024-04-29', '2024-04-30',
    '2024-05-10',
    '2024-12-30', '2024-12-31',
    
    // 2025 год - официальные праздники
    '2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05', '2025-01-06', '2025-01-07',
    '2025-02-23',
    '2025-03-08',
    '2025-05-01', '2025-05-09',
    '2025-06-12',
    '2025-11-04',
    
    // 2025 год - дополнительные выходные дни
    '2025-05-02', '2025-05-08',
    '2025-06-13',
    '2025-11-03',
    '2025-12-31',
    
    // 2026 год - официальные праздники
    '2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05', '2026-01-06', '2026-01-07', '2026-01-08',
    '2026-02-23',
    '2026-03-08',
    '2026-05-01', '2026-05-09',
    '2026-06-12',
    '2026-11-04',
    
    // 2026 год - дополнительные выходные дни
    '2026-01-09',
    '2026-03-09',
    '2026-05-11',
    '2026-12-31'
];

// Дополнительные рабочие дни (рабочие субботы)
const extraWorkingDays = [
    '2024-04-27',
    '2024-11-02',
    '2024-12-28',
    '2025-11-01'
];

// Функция проверки, является ли день рабочим
function isWorkingDay(date) {
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    
    if (extraWorkingDays.includes(dateStr)) {
        return true;
    }
    
    if (dayOfWeek === 0) {
        return false;
    }
    if (dayOfWeek === 6 && !extraWorkingDays.includes(dateStr)) {
        return false;
    }
    
    if (holidays.includes(dateStr)) {
        return false;
    }
    
    return true;
}

// Функция нахождения даты окончания 30 рабочих дней
function findDeadlineDate(startDate) {
    let currentDate = new Date(startDate);
    let workingDaysCount = 0;
    let deadlineDate = new Date(startDate);
    
    while (workingDaysCount < 30) {
        if (isWorkingDay(new Date(currentDate))) {
            workingDaysCount++;
        }
        deadlineDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return deadlineDate;
}

// Функция подсчета календарных дней между двумя датами (включительно)
function countCalendarDaysInclusive(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays + 1;
}

// Функция форматирования даты
function formatDate(date) {
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Функция расчета неустойки для ремонта
function calculateRepairPenalty() {
    const repairCost = parseFloat(document.getElementById('repairCost').value);
    const startDateStr = document.getElementById('startDate').value;
    const calculationDateStr = document.getElementById('calculationDateRepair').value;
    
    if (!repairCost || repairCost <= 0 || isNaN(repairCost)) {
        alert('Пожалуйста, введите корректную стоимость ремонта');
        document.getElementById('repairCost').focus();
        return;
    }
    
    if (!startDateStr || !calculationDateStr) {
        alert('Пожалуйста, заполните обе даты');
        return;
    }
    
    const startDate = new Date(startDateStr);
    const calculationDate = new Date(calculationDateStr);
    
    if (calculationDate < startDate) {
        alert('Дата расчета должна быть позже даты передачи автомобиля');
        return;
    }
    
    const deadlineDate = findDeadlineDate(startDate);
    const firstOverdueDay = new Date(deadlineDate);
    firstOverdueDay.setDate(firstOverdueDay.getDate() + 1);
    
    let calendarOverdueDays = 0;
    
    if (calculationDate > deadlineDate) {
        if (calculationDate > firstOverdueDay) {
            const startCountingDate = new Date(firstOverdueDay);
            startCountingDate.setDate(startCountingDate.getDate() + 1);
            calendarOverdueDays = countCalendarDaysInclusive(startCountingDate, calculationDate);
        }
    }
    
    const Z = repairCost * (0.5 / 100) * calendarOverdueDays;
    const formattedResult = Z.toLocaleString('ru-RU', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('resultValueRepair').textContent = formattedResult + ' рублей';
    
    let detailsHtml = `
        <p><strong>Детали расчета:</strong></p>
        <p>Стоимость ремонта: <strong>${repairCost.toLocaleString('ru-RU', {minimumFractionDigits: 2})} руб.</strong></p>
        <p>Период: <strong>${formatDate(startDate)}</strong> - <strong>${formatDate(calculationDate)}</strong></p>
        <p>Дата окончания 30 рабочих дней: <strong>${formatDate(deadlineDate)}</strong></p>
        <p>Первый день возможной просрочки: <strong>${formatDate(firstOverdueDay)}</strong></p>
    `;
    
    if (calculationDate <= deadlineDate) {
        detailsHtml += `<p><strong>Просрочки нет</strong> - срок ремонта не превысил 30 рабочих дней.</p>`;
    } else if (calculationDate === firstOverdueDay) {
        detailsHtml += `<p><strong>Первый день просрочки</strong> - неустойка начисляется со следующего дня.</p>`;
    } else {
        detailsHtml += `
            <p>Календарных дней просрочки: <strong>${calendarOverdueDays}</strong> дней</p>
            <p>Ставка неустойки: 0,5% от стоимости ремонта за каждый календарный день просрочки</p>
            <p><strong>Итоговая сумма к выплате страхователю:</strong></p>
            <p>${repairCost.toLocaleString('ru-RU')} × 0,5% × ${calendarOverdueDays} = <strong>${formattedResult} руб.</strong></p>
            <p><small><i>В расчете учтены все официальные праздничные и выходные дни на 2024-2026 годы.</i></small></p>
        `;
    }
    
    document.getElementById('resultDetailsRepair').innerHTML = detailsHtml;
    document.getElementById('resultContainerRepair').style.display = 'block';
}

// Инициализация калькулятора при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('calculateBtnRepair')) {
        document.getElementById('calculateBtnRepair').addEventListener('click', calculateRepairPenalty);
    }
});
// ============================================
// КАЛЬКУЛЯТОР 2: НЕУСТОЙКА ЗА НАРУШЕНИЕ СРОКА ВЫПЛАТЫ
// ============================================

// Список официальных праздничных дней РФ (только указанные даты)
const holidays2 = [
    // 2024 год
    '2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07',
    '2024-02-23',
    '2024-03-08',
    '2024-05-01', '2024-05-09',
    '2024-06-12',
    '2024-11-04',
    
    // 2025 год
    '2025-01-01', '2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05', '2025-01-06', '2025-01-07',
    '2025-02-23',
    '2025-03-08',
    '2025-05-01', '2025-05-09',
    '2025-06-12',
    '2025-11-04',
    
    // 2026 год
    '2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05', '2026-01-06', '2026-01-07', '2026-01-08',
    '2026-02-23',
    '2026-03-08',
    '2026-05-01', '2026-05-09',
    '2026-06-12',
    '2026-11-04'
];

// Функция проверки, является ли день праздничным
function isHoliday2(date) {
    const dateStr = date.toISOString().split('T')[0];
    return holidays2.includes(dateStr);
}

// Функция: Определение даты, когда заканчиваются 20 рабочих (без праздников) дней
function getDeadlineDate2(startDate) {
    let deadline = new Date(startDate);
    let workingDaysCounted = 0;
    
    while (workingDaysCounted < 20) {
        if (!isHoliday2(new Date(deadline))) {
            workingDaysCounted++;
        }
        if (workingDaysCounted < 20) {
            deadline.setDate(deadline.getDate() + 1);
        }
    }
    
    let nextDay = new Date(deadline);
    nextDay.setDate(nextDay.getDate() + 1);
    
    while (isHoliday2(nextDay)) {
        nextDay.setDate(nextDay.getDate() + 1);
    }
    
    return nextDay;
}

// Функция подсчета дней просрочки
function countOverdueDays2(deadlineDate, endDate) {
    if (endDate < deadlineDate) return 0;
    
    let count = 0;
    const currentDate = new Date(deadlineDate);
    const finalDate = new Date(endDate);
    
    currentDate.setHours(0, 0, 0, 0);
    finalDate.setHours(0, 0, 0, 0);
    
    while (currentDate <= finalDate) {
        count++;
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
}

// Функция подсчета всех календарных дней между датами
function countCalendarDays2(startDate, endDate) {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Функция получения праздничных дней в периоде
function getHolidaysInPeriod2(startDate, endDate) {
    const holidaysInPeriod = [];
    const currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    
    while (currentDate <= endDate) {
        if (isHoliday2(new Date(currentDate))) {
            const formattedHoliday = formatDate(new Date(currentDate));
            holidaysInPeriod.push(formattedHoliday);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return holidaysInPeriod;
}

// Функция расчета неустойки и штрафа
function calculatePaymentPenalty() {
    const compensationAmount = parseFloat(document.getElementById('compensationAmount').value);
    const dueDateStr = document.getElementById('dueDate').value;
    const calculationDateStr = document.getElementById('calculationDatePayment').value;
    
    if (!compensationAmount || compensationAmount <= 0 || isNaN(compensationAmount)) {
        alert('Пожалуйста, введите корректную сумму страхового возмещения');
        document.getElementById('compensationAmount').focus();
        return;
    }
    
    if (!dueDateStr || !calculationDateStr) {
        alert('Пожалуйста, заполните обе даты');
        return;
    }
    
    const dueDate = new Date(dueDateStr);
    const calculationDate = new Date(calculationDateStr);
    
    if (calculationDate < dueDate) {
        alert('Дата расчета должна быть позже даты обязательной выплаты');
        return;
    }
    
    const deadlineDate = getDeadlineDate2(dueDate);
    const overdueDays = countOverdueDays2(deadlineDate, calculationDate);
    const totalCalendarDays = countCalendarDays2(dueDate, calculationDate);
    
    const penalty = compensationAmount * (1 / 100) * overdueDays;
    
    let fine = 0;
    if (overdueDays > 0) {
        fine = (compensationAmount + penalty) * 0.5;
    }
    
    const totalAmount = compensationAmount + penalty + fine;
    
    const holidayList = getHolidaysInPeriod2(dueDate, calculationDate);
    
    document.getElementById('resultPenaltyValue').textContent = formatAmount(penalty) + ' рублей';
    document.getElementById('resultFineValue').textContent = formatAmount(fine) + ' рублей';
    document.getElementById('resultTotalValue').textContent = formatAmount(totalAmount) + ' рублей';
    
    const formattedCompensation = formatAmount(compensationAmount);
    const formattedPenalty = formatAmount(penalty);
    const formattedFine = formatAmount(fine);
    const formattedTotal = formatAmount(totalAmount);
    
    let detailsHtml = `
        <p><strong>Детали расчета:</strong></p>
        <p>Сумма страхового возмещения: <strong>${formattedCompensation} руб.</strong></p>
        <p>Период <strong>${formatDate(dueDate)}</strong> - <strong>${formatDate(calculationDate)}</strong>:</p>
        <p>• Праздничных дней в периоде: <strong>${holidayList.length}</strong></p>
        <p>• Дата окончания 20-дневного срока (без праздников): <strong>${formatDate(new Date(deadlineDate.getTime() - 24*60*60*1000))}</strong></p>
        <p>• Дата начала просрочки: <strong>${formatDate(deadlineDate)}</strong></p>
        <p>• Дней просрочки: <strong>${overdueDays} дней</strong></p>
    `;
    
    if (overdueDays > 0) {
        detailsHtml += `<p>Ставка неустойки: 1% от размера невыплаченного страхового возмещения за каждый календарный день просрочки</p>`;
        detailsHtml += `<p>Штраф: 50% от суммы страхового возмещения и неустойки</p>`;
    } else {
        detailsHtml += `<p>Неустойка не начисляется, так как не превышен лимит в 20 дней без праздников</p>`;
    }
    
    detailsHtml += `
        <p><strong>Итоговая сумма к выплате страхователю:</strong></p>
        <p>${formattedCompensation} руб. (возмещение) + ${formattedPenalty} руб. (неустойка) + ${formattedFine} руб. (штраф) = <strong class="total-amount">${formattedTotal} руб.</strong></p>
        <p><small><i>В расчете учтены все официальные праздничные дни на 2024-2026 годы.</i></small></p>
    `;
    
    document.getElementById('resultDetailsPayment').innerHTML = detailsHtml;
    document.getElementById('resultContainerPayment').style.display = 'block';
}

// Инициализация второго калькулятора
if (document.getElementById('calculateBtnPayment')) {
    document.getElementById('calculateBtnPayment').addEventListener('click', calculatePaymentPenalty);
}


