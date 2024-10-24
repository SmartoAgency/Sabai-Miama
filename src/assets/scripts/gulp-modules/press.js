document.body.addEventListener('click', loadMoreProjects);

function loadMoreProjects(evt) {
    const target = evt.target.closest('[data-load-more-press]');
    if (!target) return;
    console.log('data-load-more-press');
    
}