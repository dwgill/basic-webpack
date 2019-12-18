import styles from './index.css';

document.getElementById('root').appendChild((() => {
    const h1 = document.createElement('h1');
    h1.innerHTML = "Hello World!";
    h1.classList.add(styles.header);
    return h1;
})());