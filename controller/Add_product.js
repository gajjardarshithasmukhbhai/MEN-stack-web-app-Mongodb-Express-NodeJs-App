const path=require('path');
let inner_data=[];
const fs=require('fs');
let Cart=require("../modal/cart.js");
let Data_conn=require("../modal/update_cart.js");
var sequelize=require('../util/database.js');
var Database=require('../modal/all_file_data.js');
var texsting=require('../index.js');
var User=require('../modal/user.js');
exports.add_product_data_controller=(req,res,next)=>{
		let UserId=User.UserId();
		let obj=new Database(req.body.Title,req.body.Image,req.body.price,req.body.description,UserId);
		obj.save()
		.then(resolve=>{
			res.redirect("/shop");
		}).catch(err=>{
			console.log(err);
			res.end();
		});
}
exports.order_controller=(req,res,next)=>{
	res.render("order");
}
exports.admin_delete_product_controller=(req,res,next)=>{
	let delete_cart_id=req.params.iid;
	Database.productDelete(delete_cart_id)
	.then(e=>{
		res.redirect('/Admin_Product');
	})
	.catch(err=>{
		console.log('not solved');
			res.end();
	
	});
}
exports.add_products_controller=(req,res,next)=>{
	let email=req.body.email;
	let password=req.body.password;
	console.log("my Email",email,"my PAssWord",password);
	User.saveUser(email,password)
	.then(resolve=>{
		res.redirect("/Add_product");//change res.redirect('Add_product');
	})
	.catch(err=>{
		console.log(err);
			res.end();
	
	});
}
exports.admin_product_controller=(req,res,next)=>{
	Database.fetchall().then((ata)=>{
			res.render("Admin_product",{data:ata});
	});
}
exports.admin_edit_product_controller=(req,res,next)=>{
	let confirmId;
	let user_data=req.params.id;
	let delete_cart_id=req.params.iid;
	Database.findProduct(user_data).then((ata)=>{
		res.render("Admin_edit_product",{verifies_data:ata});
	}).catch(err=>{
			res.end();

	});	
}
exports.admin_update_product_controller=(req,res,next)=>{
	let Id=req.params.Id;
	let title=req.body.update_title;
	let price=req.body.update_price;
	let description=req.body.update_description;
	let image=req.body.update_image;
	let UserId=User.UserId();
	Database.upda(Id,title,price,description,image,UserId).then(er=>{
		res.redirect('/Admin_Product');
	})
	.catch(err=>{
		console.log(err)
			res.end();

	});	
}
exports.cart_controller=(req,res,next)=>{
	res.redirect("/Carts");
}
exports.carts_controller=(req,res,next)=>{
	let KmId=req.body.ProductId;
	let KmPrice=req.body.price;
	let KmTitle=req.body.Title;

	Cart.cart(KmId,KmPrice,KmTitle)
	.then(resolve=>{
		setTimeout(()=>{
			res.redirect("/Carts");				
		},50)
	}).catch(err=>{
		console.log(err);
			res.end();

	});
}
exports.cart_show_controller=(req,res,next)=>{
	let obej;	
		Cart.information()
		.then(products=>{
				let totalPrICE;
				products.map(wer=>{
					totalPrICE=wer.totalPrice;
				});
				//[{data}]->data leva Object.values(products[0].items);
				obej=Object.values(products[0].items);
				// res.end();
				res.render("cart",{cart_data:obej,totalPrice:totalPrICE});
			}).catch(err=>{
				res.end();
				console.log(err);
			});	
}
exports.products_controller=(req,res,next)=>{
	res.redirect("/Shop");
}
exports.carts_redirect_controller=(req,res,next)=>{
	res.render("cart");
}
exports.carts_delete_controller=(req,res,next)=>{
	let deleteId=req.params.deleteId;
	Cart.delete(deleteId).then(resolve=>{
		setTimeout(()=>{
			res.redirect("/Carts");//change1
		},50);
	})
	.catch(err=>{
		console.log(err);
			res.end();

	});
	// res.render("cart");
}
exports.product_controller=(req,res,next)=>{
	const uid=req.params.productId;
	Database.findId(uid).then((ata)=>{
			console.log(ata,"ata");
			res.render("product",{id_data:ata});
	}).catch(err=>{
			res.end();

	});
}
exports.delete=(req,res,next)=>{
	res.end();
}
exports.shop_controller=(req,res,next)=>{
    Database.fetchall().then(products => {
            res.render("shop", {
                data: products,
            });
        })
        .catch(err => {
            console.log(err);
			res.end();
        
        });

}
exports.home_controller=(req,res,next)=>{
	res.render("index");
}
exports.add_product_controller=(req,res,next)=>{
	res.render("Add_product");
}