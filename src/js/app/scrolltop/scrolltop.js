var scrollTopButton = addElement('button', 'scroll-top');
document.body.append(scrollTopButton);
var pageFooter = document.querySelector('.page-footer');
var pageFooterTop = pageFooter.offsetTop;

scrollTopButton.addEventListener('click', () => {
    document.documentElement.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});

window.onscroll = function() {
    scrollTopListener()
};
function scrollTopListener() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopButton.classList.add('scroll-top_showed');
    } else {
        scrollTopButton.classList.remove('scroll-top_showed');
    };

    if ((document.body.scrollTop > (pageFooter.offsetTop - window.innerHeight)) || (document.documentElement.scrollTop > (pageFooter.offsetTop - window.innerHeight))) {
        scrollTopButton.style.bottom = pageFooter.offsetHeight - 40 + 'px';
        scrollTopButton.classList.add('scroll-top_bottom');
    } else {
        scrollTopButton.removeAttribute('style');
        scrollTopButton.classList.remove('scroll-top_bottom');
    }
}
