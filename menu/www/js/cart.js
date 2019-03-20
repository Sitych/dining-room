var cart = {}; //корзина

$.getJSON('goods.json', function (data) {
    var goods = data; //все товары в массиве
    // console.log(goods);
	
    checkCart();
    //console.log(cart);
    showCart(); //вывожу товары на страницу
	var man = 0
	man=summa();
	
	function summa(){//считаю общую сумму товаров в корзине
		for( var i in cart){
		var many =	cart[i]*goods[i].cost;
		console.log(many);
		man += many;
		}	
		return man;
	}
		$('#costs').html("К ОПЛАТЕ:  " + man + "  руб");
    function showCart() {
		   if ($.isEmptyObject(cart)) {
            //корзина пуста
			var mane = '<h3> ПУСТО :( </h3>';
            var out = '<h2  class="h" >Корзина пуста. <a href="index.html">Добавьте товар в корзину </h2><br/></a>';
            $('#my-cart').html(out);
			$('#costs').html(mane);
        }
        else {
        var out = '';
        for (var key in cart) {//добавляем всё в одну общую строку,чтобы проще было вывести сразу все

			out += '<div class="purchases">';
			out +='<h3>'+goods[key].name+'</h3>'+'<br/>';
			out += '<img height="130" src="'+goods[key].image+'" >';
            out += '<br/>'+'<button class= "delete" data-art="'+key+'"> x </button>';
            out += '<b>'+"Количество:  "+'</b>'+'<button class="minus" data-art="'+key+'"> - </button>';
            out += '<b>'+cart[key]+'</b>'+"  шт";
            out += '<button class="plus" data-art="'+key+'"> + </button>';
			out += '<br/>'+'<b>'+"Всего:  " +cart[key]*goods[key].cost+'</b>'+"  руб";
            out +='<br/>';
			out +='</div>';
        }

		$('#costs').html("К ОПЛАТЕ:  " + man + "  руб");
        $('#my-cart').html(out);
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
    }
	}

    function plusGoods(){//для увеличения количества в корзине на 1 при нажатии на кнопку
        var articul = $(this).attr('data-art');
        cart[articul]++;
		man+=Number(goods[articul].cost);
		console.log(man);
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }

    function minusGoods(){//для уменьшения в корзине на 1
        var articul = $(this).attr('data-art');
        if (cart[articul]>1) {
            cart[articul]--;
			man-=Number(goods[articul].cost);
			console.log(man);
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }

    function deleteGoods(){// для удаления из корзины вообще
        var articul = $(this).attr('data-art');
		man-=Number(cart[articul]*goods[articul].cost);
		console.log(man);
        delete cart[articul];
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }

});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS(){
    localStorage.setItem('cart', JSON.stringify(cart) );
}