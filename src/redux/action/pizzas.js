export const fetchPizzas = (category, sortBy) => (dispatch) => {
	dispatch({
		type: 'SET_LOADED',
		payload: false
	});
	fetch(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
		.then((res) => res.json())
		.then((json) => {
			dispatch(setPizzas(json));
		});
};

export const setLoaded = (paylodad) => ({
	type: 'SET_LOADED',
	paylodad
});

export const setPizzas = (items) => ({
	type: 'SET_PIZZAS',
	payload: items
});
