// Ícones SVG para os serviços
const ICONS = {
    sofa: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="24" width="48" height="20" rx="2"></rect><path d="M12 24V18a4 4 0 014-4h32a4 4 0 014 4v6"></path><rect x="4" y="28" width="6" height="12" rx="1"></rect><rect x="54" y="28" width="6" height="12" rx="1"></rect><line x1="16" y1="44" x2="16" y2="50"></line><line x1="48" y1="44" x2="48" y2="50"></line></svg>`,
    
    cabeceira: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="10" width="48" height="34" rx="4"></rect><line x1="8" y1="44" x2="56" y2="44"></line><line x1="32" y1="10" x2="32" y2="44"></line><line x1="8" y1="44" x2="8" y2="54"></line><line x1="56" y1="44" x2="56" y2="54"></line></svg>`,
    
    puff: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="32" cy="38" rx="24" ry="12"></ellipse><ellipse cx="32" cy="30" rx="24" ry="12"></ellipse><line x1="12" y1="42" x2="12" y2="50"></line><line x1="52" y1="42" x2="52" y2="50"></line></svg>`,
    
    poltrona: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 16h24a4 4 0 014 4v12H16V20a4 4 0 014-4z"></path><rect x="12" y="32" width="40" height="10" rx="2"></rect><line x1="16" y1="42" x2="14" y2="54"></line><line x1="48" y1="42" x2="50" y2="54"></line><path d="M12 32V24"></path><path d="M52 32V24"></path></svg>`
};

function injectIcons() {
    const iconDivs = document.querySelectorAll('[data-icon]');
    
    iconDivs.forEach(div => {
        const iconName = div.getAttribute('data-icon');
        if (ICONS[iconName]) {
            div.innerHTML = ICONS[iconName];
        }
    });
}

// Executar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', injectIcons);
