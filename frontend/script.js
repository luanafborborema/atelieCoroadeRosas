// --- START OF FILE script.js ---

const hamburguer = document.getElementById('menu-hamburguer');
const menuLateral = document.getElementById('menu-lateral');
const fechar = document.getElementById('menu-fechar');

if (hamburguer && menuLateral && fechar) {
    hamburguer.addEventListener('click', () => {
        menuLateral.classList.add('show');
    });

    fechar.addEventListener('click', () => {
        menuLateral.classList.remove('show');
    });

    document.querySelectorAll('.menu-lateral a').forEach(link => {
        link.addEventListener('click', () => {
            // Apenas fecha o menu, não impede a ação do link (como o onclick do contato)
            setTimeout(() => {
                menuLateral.classList.remove('show');
            }, 100);
        });
    });
}