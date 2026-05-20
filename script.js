document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === \"#\") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    const toolLinks = document.querySelectorAll('.card-link');
    toolLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log(Tool clicked: \);
        });
    });
});
