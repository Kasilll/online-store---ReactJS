import React from 'react';
import { Cotegories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPizzas } from '../redux/action/pizzas';
import { setCategory } from '../redux/action/filters';
import { setSortBy } from '../redux/action/filters';

const cotegoryNames = [ 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые' ];

const sortItems = [
	{ name: 'популярности', type: 'popular' },
	{ name: 'цене', type: 'price' },
	{ name: 'алфавит', type: 'name' }
];

export default function Home() {
	const dispatch = useDispatch();
	const items = useSelector(({ pizzas }) => pizzas.items);
	const cartItems = useSelector(({ cart }) => cart.items);
	const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
	const { category, sortBy } = useSelector(({ filters }) => filters);

	const onSelectCategory = React.useCallback((index) => {
		dispatch(setCategory(index));
	});
	const onSelectSortType = React.useCallback((type) => {
		dispatch(setSortBy(type));
	});

	React.useEffect(
		() => {
			dispatch(fetchPizzas(category, sortBy));
		},
		[ category, sortBy ]
	);

	const handleAddPizzaToCart = (obj) => {
		dispatch({
			type: 'ADD_PIZZA_CART',
			payload: obj
		});
	};

	return (
		<div>
			<div className="content__top">
				<Cotegories activeCategory={category} pizza={cotegoryNames} onClickItem={onSelectCategory} />
				<SortPopup activeSortType={sortBy} items={sortItems} onClickSortType={onSelectSortType} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoaded ? (
					items.map((obj) => (
						<PizzaBlock
							onClickAddPizza={handleAddPizzaToCart}
							key={obj.id}
							addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
							{...obj}
						/>
					))
				) : (
					Array(12).fill(<PizzaLoadingBlock/>)
				)}
			</div>
		</div>
	);
}
