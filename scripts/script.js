document.addEventListener('DOMContentLoaded', function () {
    const authModal = document.getElementById('auth-modal');
    const closeBtn = authModal.querySelector('.modal-close');
    const tabLinks = authModal.querySelectorAll('.tab-link');
    const formContents = authModal.querySelectorAll('.form-content');

    function switchTab(formType) {
        tabLinks.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.form === formType);
        });
        formContents.forEach(content => {
            content.classList.toggle('active', content.id === `${formType}-content`);
        });
    }

    function openModal(initialForm) {
        switchTab(initialForm);
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        authModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.sign-in').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal('login');
        });
    });

    document.querySelectorAll('.sign-up').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal('signup');
        });
    });

    closeBtn.addEventListener('click', closeModal);
    authModal.addEventListener('click', e => {
        if (e.target === authModal) closeModal();
    });

    authModal.querySelector('.modal-tabs').addEventListener('click', e => {
        if (e.target.classList.contains('tab-link')) {
            switchTab(e.target.dataset.form);
        }
    });

    function submitForm(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch('index.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                alert('Успешно!');
                closeModal();
            } else {
                alert('Ошибка: ' + data.message);
            }
        })
        .catch(err => {
            alert('Произошла ошибка. Попробуйте позже.');
            console.error(err);
        });
    }

    document.getElementById('form-login').addEventListener('submit', submitForm);
    document.getElementById('form-signup').addEventListener('submit', submitForm);
});
