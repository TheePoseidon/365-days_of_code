document.querySelectorAll('.sidebar ul li').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Navigating to ${item.textContent}`);
    });
});