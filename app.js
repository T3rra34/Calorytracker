const StorageCtrl = (function(){
	return {
		storeItem: function(item){
			let items;
			if(localStorage.getItem('items') === null){
				items = [];
				items.push(item);
				localStorage.storeItem('items', JSON.stringify(items));
			} else {
				items = JSON.parse(localStorage.getItem('items'));
				items.push(item);
				localStorage.setItem('items', JSON.stringify(items));
			}
		},
		getItemsFromStorage: function(){
			let items;
			if(localStorage.getItem('items') === null){
				items = [];
			} else {
				items = JSON.parse(localStorage.getItem('items'));
			}
			return items;
		}
	}
})

const ItemCtrl = (function(){
	Const Item = function(id, name, calories){
		this.id = id
		this.name = name
		this.calories = calories
	}
	const data = {
		items: [
			{id: 0, name: 'Steak Dinner', calories: 1200},
			{id: 1, name: 'Cookie' calories: 400},
			{id: 2, name: 'Eggs', calories:300}
		],
		total: 0
	}
	return{
		getItems: function(){
			return data.items
		},
		getItem: function(){
			let ID;
			if(data.items.length > 0){
				ID = data.items[data.items.length - 1].id
			} else {
				ID = 0
			}
			calories = perseInt(calories);
			newItem = new Item(ID, name, calories);
			data.items.push(newItem);
			console.log(data.items)
			console.log(newItem)
			return newItem
		},
		getTotalCalories: function(){
			let total = 0;
			data.items.forEach(function(item){
				total = total + item.calories;
			});
			data.total = total;
			return data.total;
		}
	}
		logData: function(){
			return data
		}
	}
})();

const UICtrl = (function(){

	const UISelectors = {
		itemList: '#Item-list',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		addBtn: '.add-btn',
		totalCalories: '.total-Calories'
	}
	return{
		populateItemList: function(items){
			let html= '';
			items.forEach(function(item){
				html += <li class=`collection-item" id="item ${item.id}"><strong>${item.name}:</strong> <em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
				<i class="edit-item-fa fa-pencil"></i>
				<a/>
				</li>`;
			});

			document.querySelector("#Item-list").innerHTML = html;
		},
		getSelectors: function(){
			return UISelectors;
		},
		getItemInput: function(){
			return{
				name:document.querySelector(UISelectors.itemNameInput).value,
				calories:document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
		addListItem: function(item){
			const li = document.createElement('li');
			li.classname = 'collection-item';
			li.id = `item ${item.id}`
			li.innerHTML =`<strong>${item.name}: </strong> <em>${item.calories} Calories</em> <a href="#" class="secondary-content"><i class="edit-item-fa fa-pencil"></i> </a>`
		document.querySelector(UISelectors.itemList).insertAdjucentElement('beforeend', li)
		},
		clearInput:function(){
			document.querySelector(UISelectors.itemNameInput).value = '';
			document.querySelector(UISelectors.itemCaloriesInput).value = '';
		},
		showTotalCalories: function(totalCalories){
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		}
	}
})();

const App = (function(ItemCtrl, StorageCtrl, UICtrl){
	const loadEventListener = function(){
		console.log('event listeners loading')
		const UISelectors = UICtrl.getSelectors();
		console.log(UISelectors)
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
		document.addEventListener('DOMContentLoaded', getItemsFromStorage)
	}
	const itemAddSubmit = function(event){
		const input = UICtrl.getItemInput()
		console.log(input)
		if(input.name !== '' && input.calories !== ''){
			const newItem = ItemCtrl.addItem(input.name, input.calories)
			const totalCalories = ItemCtrl.getTotalCalories();
			UICtrl.showTotalCalories(totalCalories);
			StorageCtrl.storeItem(newItem);
			UICtrl.clearInput();
		}

		event.preventDefault()
	}
	const getItemsFromStorage = function(){
		const items = StorageCtrl.getItemsFromStorage()
		items.forEach(function(item){
			ItemCtrl.addItem(item['name'], item['calories'])
		})
		const totalCalories = ItemCtrl.getTotalCalories();
		UICtrl.showTotalCalories(totalCalories);
		UICtrl.populateItemList(items)
	}
	return {
		init: function(){
			console.log('initalizing app')
			const items = ItemCtrl.getItems()
			UICtrl.populateItemList(items)
			loadEventListener();
		}
	}
	items.forEach(function(item){
		html += `<li class="collection-item" id="item-${item.id}"> <strong>${item.name}: </strong> <em>${item.calories} Calories</em> <a href="#" class="secondary-content"> <i class="edit-item-fa fa-pencil"></i> </a> </li>`;
	});
	
	console.log(ItemCtrl.logData())
})(ItemCtrl, StorageCtrl, UICtrl);
App.init()