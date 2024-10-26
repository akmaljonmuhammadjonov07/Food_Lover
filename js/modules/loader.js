function loader() {
	const loaderWrapper = document.querySelector('.loader-wrapper');

	setTimeout(() => {
		loaderWrapper.style.display = 'none';
	}, 1500);
}
export default loader;
