document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const modalText = document.getElementById('modal-text');
    const menuItems = document.querySelectorAll('.menu-item');
    const quantityDisplay = document.getElementById('quantity');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const registrationModal = document.getElementById('registration-modal');
    const closeRegistrationModal = registrationModal.querySelector('.close');
    const registrationForm = document.getElementById('registration-form');
    let quantity = 1;
    let cartData = [];

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalContentKey = item.getAttribute('data-modal-content');
            modalText.innerHTML = modalContents[modalContentKey];
            quantity = 1;
            quantityDisplay.textContent = quantity;
            modal.style.display = 'block';
            currentItem = {
                name: item.querySelector('h3').textContent,
                price: parseInt(item.getAttribute('data-price'))
            };
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    closeRegistrationModal.addEventListener('click', () => {
        registrationModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        } else if (event.target === registrationModal) {
            registrationModal.style.display = 'none';
        }
    });

    document.getElementById('decrease-quantity').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    document.getElementById('increase-quantity').addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    document.getElementById('add-to-cart').addEventListener('click', () => {
        const itemInCart = cartData.find(item => item.name === currentItem.name);
        if (itemInCart) {
            itemInCart.quantity += quantity;
        } else {
            cartData.push({ ...currentItem, quantity });
        }
        updateCart();
        modal.style.display = 'none';
        cart.style.display = 'block';
    });

    document.getElementById('checkout').addEventListener('click', () => {
        cartData = [];
        updateCart();
        cart.style.display = 'none';
        registrationModal.style.display = 'block';
    });

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const notes = document.getElementById('notes').value;

        console.log(`Full Name: ${fullName}, Phone: ${phone}, Address: ${address}, City: ${city}, Notes: ${notes}`);

        alert('Дякуємо за замовлення!');
        registrationModal.style.display = 'none';
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cartData.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-quantity">${item.quantity} шт.</span>
                <span class="cart-item-price">${item.price * item.quantity} грн</span>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = `Разом: ${total} грн`;
    }
});

const modalContents = {
    'bruschetta': `
    <h3>Брускетта з Помідорами</h3>
    <p>Традиційні італійські тости з хрусткого хліба, натерті часником та политі оливковою олією. Зверху викладаються соковиті помідори, базилік та дрібка солі, що робить цю страву ідеальним початком трапези.</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 3 г</li>
        <li>Жири: 5 г</li>
        <li>Вуглеводи: 15 г</li>
    </ul>
`,
    'caprese': `
    <h3>Капрезе</h3>
    <p>Свіжий та легкий салат, що поєднує стиглі помідори, м'яку моцарелу та ароматний базилік, поливаний бальзамічним оцтом та оливковою олією. Цей класичний італійський салат підкорює своїм простим, але неперевершеним смаком. Ідеальний вибір для любителів здорового харчування.</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 4 г</li>
        <li>Жири: 8 г</li>
        <li>Вуглеводи: 3 г</li>
    </ul>
`,
'carpaccio-veal': `
    <h3>Карпаччо з Телятини</h3>
    <p>Тонко нарізана сира телятина, подана з руколою, каперсами та лимонним соусом. Свіжість та ніжність телятини підкреслюються ароматами оливкової олії та лимонного соку. Цей вишуканий делікатес буде чудовим початком вашого гастрономічного досвіду в нашому ресторані.</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 20 г</li>
        <li>Жири: 5 г</li>
        <li>Вуглеводи: 0 г</li>
    </ul>
`,
'carpaccio-beef': `
    <h3>Карпаччо з Яловичини</h3>
    <p>Сира яловичина, тонко нарізана та подана з руколою, пармезаном та краплями лимонного соку. Цей класичний італійський рецепт дозволяє насолоджуватись ніжністю та смаком яловичини у поєднанні зі свіжими та пікантними додатками.</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 25 г</li>
        <li>Жири: 10 г</li>
        <li>Вуглеводи: 1 г</li>
    </ul>
`,
'arancini': `
    <h3>Аранчіні</h3>
    <p>Рисові кульки з начинкою з м'яса, сиру та горошку, обсмажені до золотистої скоринки. Це традиційна сицілійська закуска, що підкорює своїм насиченим смаком та хрусткою текстурою. Спробуйте цей неперевершений делікатес у нашому ресторані!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 8 г</li>
        <li>Жири: 10 г</li>
        <li>Вуглеводи: 30 г</li>
    </ul>
`,
'florentine-steak': `
     <h3>Флорентійський Стейк</h3>
     <p>Великий та соковитий шматок смаженого яловичого стейку, приправлений ароматним розмарином. Ідеально приготований на грилі, щоб зберегти всі соки та природний смак м'яса. Ця класична італійська страва стане справжньою насолодою для поціновувачів м'яса!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 26 г</li>
        <li>Жири: 17 г</li>
        <li>Вуглеводи: 0 г</li>
    </ul>
`,
'carbonara': `
     <h3>Спагеті Карбонара</h3>
    <p>Класичні італійські спагеті, приготовані з хрустким беконом, змішані з кремовим соусом з яйцем та тертим пармезаном, щедро посипані свіжомеленим чорним перцем. Це страва, яка поєднує в собі насичений смак та неймовірну простоту!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 10 г</li>
        <li>Жири: 12 г</li>
        <li>Вуглеводи: 45 г</li>
    </ul>
`,
'risotto': `
     <h3>Різото з Грибами</h3>
    <p>Кремовий ризото, приготований з ароматними лісовими грибами та ніжним тертим пармезаном, що надає страві насичений смак та витончену текстуру. Це справжній шедевр італійської кухні, який підкорить вас своїм багатим грибним ароматом!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 7 г</li>
        <li>Жири: 9 г</li>
        <li>Вуглеводи: 30 г</li>
    </ul>
`,
'lasagna': `
     <h3>Лазанья Болоньєзе</h3>
    <p>Класична італійська лазанья, приготована з шарами тонких листів пасти, наповнених смачним м'ясним соусом Болоньєзе та кремовим бешамельним соусом. Ця страва відома своєю ситністю і глибоким смаком, який точно вас здивує!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 9 г</li>
        <li>Жири: 12 г</li>
        <li>Вуглеводи: 13 г</li>
    </ul>
`,
'ministrone': `
     <h3>Мінестроне</h3>
    <p>Мінестроне - це традиційний італійський овочевий суп, який часто містить різноманітні овочі, такі як помідори, морква, картопля, капуста, кабачки, а також пасту або рис. Цей суп часто приправляють оливковою олією, петрушкою та іншими травами для підсилення смаку!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 2 г</li>
        <li>Жири: 1 г</li>
        <li>Вуглеводи: 8 г</li>
    </ul>
`,
'margherita': `
     <h3>Маргарита</h3>
    <p>Піца Маргарита - це класична італійська піца з томатним соусом, моцареллою та свіжим базиліком. Ця піца відома своєю простотою та смаком, який виникає від ідеального поєднання томатів, м'якого моцарелли та ароматного базиліку!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 10 г</li>
        <li>Жири: 9 г</li>
        <li>Вуглеводи: 27 г</li>
    </ul>
`,
'quattro-stagioni': `
     <h3>Чотири Сезони</h3>
    <p>Піца Чотири Сезони - це італійська піца, розділена на чотири різні частини, представлені різними інгредієнтами: прошутто (італійська шинка), гриби, артишоки та оливки. Кожна частина піци представляє символічно різні пори року, що надає страві особливого шарму і смаку!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 12 г</li>
        <li>Жири: 15 г</li>
        <li>Вуглеводи: 20 г</li>
    </ul>
`,
'vegetarian': `
     <h3>Вегетаріанська</h3>
     <p>Піца Вегетаріанська - це італійська піца з виключно овочевими інгредієнтами: цукіні, баклажани, помідори та оливки. Ця піца ідеально підходить для вегетаріанців та тих, хто цінує свіжість та смак овочів!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 5 г</li>
        <li>Жири: 8 г</li>
        <li>Вуглеводи: 12 г</li>
    </ul>
`,
'tiramisu': `
     <h3>Тірамісу</h3>
    <p>Тірамісу - це традиційний італійський десерт, що складається з шарів савоярді, змочених у каві, крему з маскарпоне, яєць і цукру, присипаних какао. Цей десерт має ніжну текстуру і насичений смак, який робить його одним із найулюбленіших італійських десертів у всьому світі!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 6 г</li>
        <li>Жири: 20 г</li>
        <li>Вуглеводи: 30 г</li>
     </ul>
`,
'panna-cotta': `
     <h3>Панна Котта</h3>
    <p>Панна Котта - це ніжний італійський вершковий пудинг, зазвичай подається з соусом з червоних ягід, що додає солодкому десерту приємну кислинку. Цей десерт відомий своєю гладкою текстурою та легким, освіжаючим смаком!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 3 г</li>
        <li>Жири: 15 г</li>
        <li>Вуглеводи: 20 г</li>
     </ul>
`,
'lemone-sorbet': `
     <h3>Джелато</h3>
    <p>Джелато - це традиційне італійське морозиво, відоме своєю кремовою текстурою та насиченим смаком. Воно виготовляється вручну з використанням свіжих інгредієнтів і доступне в різних смаках, таких як ваніль, шоколад, фісташка, малина, лимон!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 4 г</li>
        <li>Жири: 7 г</li>
        <li>Вуглеводи: 24 г</li>
     </ul>
`,
'lemonchello': `
     <h3>Лімончелло</h3>
    <p>Лімончелло - це традиційний італійський лимонний лікер, відомий своїм яскравим, освіжаючим смаком. Лікер виготовляється шляхом настоювання лимонної цедри в спирті з подальшим додаванням цукрового сиропу, що робить його ідеальним завершенням трапези або освіжаючим напоєм влітку!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 0 г</li>
        <li>Жири: 0 г</li>
        <li>Вуглеводи: 4 г</li>
     </ul>
`,
'prosecco': `
     <h3>Просекко</h3>
    <p>Просекко - це італійське ігристе вино, відоме своїм легким і свіжим смаком з нотками зелених яблук, груш та квітів. Воно часто використовується як аперитив або для святкових випадків завдяки своїй бульбашковій структурі і приємному аромату!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 0 г</li>
        <li>Жири: 0 г</li>
        <li>Вуглеводи: 2 г</li>
     </ul>
`,
'aperol-spritz': `
     <h3>Апероль Шприц</h3>
    <p>Просекко - це італійське ігристе вино, відоме своїм легким і свіжим смаком з нотками зелених яблук, груш та квітів. Воно часто використовується як аперитив або для святкових випадків завдяки своїй бульбашковій структурі і приємному аромату!</p>
    <p>Енергетична цінність на 100 г:</p>
    <ul>
        <li>Білки: 0 г</li>
        <li>Жири: 0 г</li>
        <li>Вуглеводи: 2 г</li>
     </ul>
`,

};