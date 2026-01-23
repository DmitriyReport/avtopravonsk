// Конфигурация
const CONFIG = {
    BOT_TOKEN: '8183136407:AAEhfxcLsmXiNT2iFqBqtQEpY01CsiluP3w', // ЗАМЕНИТЕ НА ВАШ ТОКЕН БОТА
    CHAT_ID: '540982785', // ЗАМЕНИТЕ НА ВАШ ID В ТЕЛЕГРАМ
    SERVICES: {
        'tow-truck': {
            title: '🚚 Вызов эвакуатора',
            phone: '+7 (962) 823-30-82',
            description: 'Круглосуточная служба эвакуации автомобилей. Приедем в течение 30 минут.'
        },
        'commissioner': {
            title: '👨‍💼 Вызов аварийного комиссара',
            phone: '+7 (923) 154-90-60',
            description: 'Профессиональное оформление ДТП на месте для страховой компании.'
        },
        'lawyer': {
            title: '⚖️ Консультация автоюриста',
            phone: '+7 (923) 154-90-60',
            description: 'Помощь в спорах со страховыми, ГИБДД, оспаривании вины.',
            telegram: 'https://t.me/Avtopravonsk' // Замените на реальный юзернейм
        },
        'dtp-guide': {
            title: '📋 Что делать при ДТП: пошаговая инструкция',
            guide: [
                '1. **Остановитесь**, включите аварийную сигнализацию, выставьте знак аварийной остановки.',
                '2. **Проверьте**, есть ли пострадавшие. Если есть — немедленно вызовите скорую (103).',
                '3. **Вызовите ГИБДД** (102) и аварийного комиссара (кнопка выше).',
                '4. **Не перемещайте** предметы, имеющие отношение к ДТП.',
                '5. **Сфотографируйте** место ДТП, повреждения, документы участников.',
                '6. **Запишите** контакты свидетелей.',
                '7. **Заполните** извещение о ДТП (если нет разногласий).',
                '8. **Свяжитесь со страховой компанией** в течение 5 рабочих дней.',
                '9. **Если нужна юридическая помощь** — нажмите кнопку "Автоюрист".'
            ]
        }
    }
};

// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand(); // Развернуть приложение на весь экран
tg.MainButton.hide(); // Скрыть главную кнопку (она нам пока не нужна)

// Показать секцию с выбранной услугой
function showService(serviceKey) {
    const contentDiv = document.getElementById('service-content');
    const formDiv = document.getElementById('feedback-form');
    const service = CONFIG.SERVICES[serviceKey];

    // Скрываем форму
    formDiv.style.display = 'none';
    contentDiv.innerHTML = ''; // Очищаем предыдущий контент

    let html = `<div class="service-info">
                    <h2>${service.title}</h2>`;

    // Для первых трех услуг (эвакуатор, комиссар, юрист)
    if (serviceKey !== 'dtp-guide') {
        html += `<p>${service.description}</p>
                 <p><strong>Телефон:</strong></p>
                 <a href="tel:${service.phone.replace(/\s/g, '')}" class="phone-link">📞 ${service.phone}</a>`;

        // Для юриста добавляем кнопку Telegram
        if (serviceKey === 'lawyer' && service.telegram) {
            html += `<a href="${service.telegram}" target="_blank" class="tg-link">💬 Написать в Telegram</a>`;
        }

        html += `<br><br><button class="btn btn-white" onclick="showForm('${serviceKey}')">Заказать обратный звонок</button>`;
    } else {
        // Для гайда по ДТП
        html += `<ul class="guide-list">`;
        service.guide.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += `</ul>`;
        html += `<br><button class="btn btn-blue" onclick="goBack()">Вернуться на главную</button>`;
    }

    html += `</div>`;
    contentDiv.innerHTML = html;
}

// Показать форму обратной связи
function showForm(serviceKey) {
    document.getElementById('service-content').style.display = 'none';
    const formDiv = document.getElementById('feedback-form');
    formDiv.style.display = 'block';
    document.getElementById('service-type').value = serviceKey;
}

// Вернуться на главную
function goBack() {
    document.getElementById('service-content').innerHTML = '';
    document.getElementById('service-content').style.display = 'block';
    document.getElementById('feedback-form').style.display = 'none';
}

// Отправка формы
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Остановить обычную отправку формы

    const serviceKey = document.getElementById('service-type').value;
    const service = CONFIG.SERVICES[serviceKey];
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Формируем сообщение для Telegram
    const message = `📋 *Новая заявка с АвтоправоНСК!*
%0A*Услуга:* ${service.title}
%0A*Имя:* ${name}
%0A*Телефон:* ${phone}
%0A*Время:* ${new Date().toLocaleString('ru-RU')}`;

    // Отправляем данные боту (через GET-запрос к Telegram Bot API)
    // Это простейший способ, на хостингах часто не требуется серверный код
    fetch(`https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage?chat_id=${CONFIG.CHAT_ID}&text=${message}&parse_mode=Markdown`)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('✅ Заявка отправлена! Мы свяжемся с вами в течение 10 минут.');
                goBack(); // Возвращаем на главную
                document.getElementById('contact-form').reset(); // Очищаем форму
            } else {
                alert('❌ Ошибка отправки. Пожалуйста, позвоните нам напрямую.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('❌ Ошибка сети. Проверьте соединение.');
        });
});


