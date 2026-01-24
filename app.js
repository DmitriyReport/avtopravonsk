// Данные услуг
const SERVICES = {
    'tow-truck': {
        title: '🚚 Вызов эвакуатора',
        phone: '+7 (999) 123-45-67',
        description: 'Круглосуточная служба эвакуации автомобилей в Новосибирске. Приедем в течение 30 минут по городу.'
    },
    'commissioner': {
        title: '👨‍💼 Вызов аварийного комиссара',
        phone: '+7 (999) 987-65-43',
        description: 'Профессиональное оформление ДТП на месте для страховой компании. Работаем 24/7.'
    },
    'lawyer': {
        title: '⚖️ Консультация автоюриста',
        phone: '+7 (999) 555-44-33',
        telegram: 'https://t.me/Avtoyurist_NSK',
        description: 'Помощь в спорах со страховыми компаниями, ГИБДД, оспаривании виновности в ДТП.'
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

