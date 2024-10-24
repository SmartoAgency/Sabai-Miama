console.log('data-load-more-projects');

document.body.addEventListener('click', loadMoreProjects);

function loadMoreProjects(evt) {
    const target = evt.target.closest('[data-load-more-projects]');
    if (!target) return;
    console.log('load more projects');
    
}