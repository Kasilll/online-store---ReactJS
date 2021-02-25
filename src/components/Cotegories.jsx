import React from 'react';



const Categories = React.memo(function Categories({ activeCategory, pizza, onClickItem }) {

	const onSelectPizza = (index) => {
		onClickItem(index)
	};

	return (
		<div>
			<div className="categories">
				<ul>
					<li className={activeCategory === null ? 'active' : ''} onClick={() => onSelectPizza(null)}>
						Все
					</li>
					{pizza &&
						pizza.map((name, index) => (
							<li
								className={activeCategory === index ? 'active' : ''}
								onClick={() => onSelectPizza(index)}
								key={`${name}_${index}`}
							>
								{name}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
})

export default Categories;