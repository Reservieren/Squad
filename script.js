    document.addEventListener('DOMContentLoaded', function() {

        /** LÓGICA DO BOTÃO "VOLTAR AO TOPO" **/
        const backToTopButton = document.getElementById('back-to-top-btn');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        /** LÓGICA DOS FILTROS (NAÇÃO E BUSCA POR NOME) **/
        const nationFilter = document.getElementById('nation-filter');
        const searchFilter = document.getElementById('search-filter');
        const allCards = document.querySelectorAll('#vehicles .vehicle-card, #vehicles .kit-card');

        function applyFilters() {
            const selectedNation = nationFilter.value;
            const searchTerm = searchFilter.value.toLowerCase();

            allCards.forEach(card => {
                const cardNationData = card.getAttribute('data-nation') || 'all';
                const cardNations = cardNationData.split('/');
                const cardName = card.querySelector('.vehicle-name, .kit-name').textContent.toLowerCase();

                const nationMatch = selectedNation === 'all' || cardNations.includes(selectedNation) || cardNationData === 'all';
                const searchMatch = cardName.includes(searchTerm);

                if (nationMatch && searchMatch) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }
        nationFilter.addEventListener('change', applyFilters);
        searchFilter.addEventListener('input', applyFilters);

        /** NAVEGAÇÃO SUAVE E ATIVA **/
        const navLinks = document.querySelectorAll('.main-nav a');
        const sections = document.querySelectorAll('main > section');
        function updateActiveLink() {
            let currentSection = 'home';
            sections.forEach(section => {
                if (window.scrollY >= section.offsetTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection) {
                    link.classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();

        /** SISTEMA DE ABAS (TABS) COM ACESSIBILIDADE **/
        const tabContainer = document.querySelector('.vehicle-tabs');
        if (tabContainer) {
            tabContainer.addEventListener('click', function(e) {
                const clicked = e.target.closest('.tab-btn');
                if (!clicked) return;
                
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                document.querySelectorAll('.vehicle-category-content').forEach(content => content.classList.remove('active'));
                
                clicked.classList.add('active');
                clicked.setAttribute('aria-selected', 'true');
                const tabId = clicked.getAttribute('aria-controls');
                document.getElementById(tabId).classList.add('active');
            });
        }
    });
/**
==================================================
 LÓGICA FINAL: MOSTRAR/OCULTAR DETALHES (COM ANIMAÇÃO)
 ==================================================
 */
document.querySelector('main').addEventListener('click', function(e) {
    // 1. Verifica se o clique foi em um botão de toggle
    const toggleButton = e.target.closest('.toggle-details-btn');
    if (!toggleButton) return;

    // 2. Encontra o 'card' pai mais próximo do botão
    const card = toggleButton.closest('.vehicle-card, .kit-card');
    if (!card) return;

    // 3. Dentro daquele card, encontra o painel de detalhes
    const details = card.querySelector('.details-content');
    if (!details) return;

    // 4. Apenas alterna a classe. O CSS faz todo o trabalho!
    details.classList.toggle('details-are-visible');

    // 5. Atualiza o texto do botão
    if (details.classList.contains('details-are-visible')) {
        toggleButton.textContent = 'Ocultar Detalhes';
    } else {
        toggleButton.textContent = 'Mostrar Detalhes';
    }
});

/**
 * ==================================================
 * LÓGICA PARA A JANELA MODAL DE IMAGEM (LIGHTBOX)
 * ==================================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // Pega os elementos da modal que criamos no HTML
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const captionText = document.getElementById("modal-caption");
    const closeBtn = document.querySelector(".modal-close");

    // Usa delegação de eventos para ouvir cliques em todas as imagens da galeria
    document.querySelector('main').addEventListener('click', function(e) {
        // Verifica se o que foi clicado foi uma imagem dentro de uma .details-gallery
        if (e.target && e.target.tagName === 'IMG' && e.target.closest('.details-gallery')) {
            modal.style.display = "block"; // Mostra a modal
            modalImg.src = e.target.src; // Coloca a imagem clicada dentro da modal
            captionText.innerHTML = e.target.alt; // Usa o texto 'alt' da imagem como legenda
        }
    });

    // Função para fechar a modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Adiciona os eventos de clique para fechar
    closeBtn.addEventListener('click', closeModal); // Clicar no 'X'
    modal.addEventListener('click', function(e) {
        // Se o clique for no fundo preto (e não na imagem), fecha a modal
        if (e.target === modal) {
            closeModal();
        }
    });
});