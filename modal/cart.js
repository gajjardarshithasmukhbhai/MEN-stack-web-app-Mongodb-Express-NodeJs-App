let mongodb=require('mongodb');
let getdb=require('../util/database.js');
let UserId;
let User_Email;
let User_Password;
let mongo_products_id=[];
let items_object=[];
let mongodb_total_price;
module.exports=class User{
	static cart(ikd,prices,Title)
	{
		let id=ikd;
		let price=prices;
		let db=getdb.getDb();
		console.log(Title,"title");
		return db.collection('user').
        	   find().toArray().
        	   then(products=>{
        	   		let _id;
        	   		let user_object;
        	   		products.map(wer=>{
        	   			items_object=wer.items;
        	   			mongodb_total_price=wer.totalPrice;
        	   		});
        	   		products.map(we=>{
        	   			UserId=we._id;
        	   			User_Email=we.email;
        	   			User_Password=we.password;
        	   		});
        	   		let re=products.find(data=>{
        	   			return data.items;
        	   		});
        	   		if(re===undefined){
	        	   		// step:2
						let totalprice=parseInt(price);
						db.collection('user').update({_id:UserId},{email:User_Email,password:User_Password,items:[{productId:id,price:parseInt(price),quantity:1,title:Title}],totalPrice:totalprice})//insert({cart,totalPrice:20000})<-True;insert({cart},{totalPrice:20000})<-False
						.catch(err=>{console.log(err,"1")});
        	   		}
        	   		else{

        	   			let mongodb_items_array;
        	   			let items_findId=items_object.findIndex(pro=>pro.productId===ikd);
        	   			let productExist=items_object[items_findId];
        	   			if(productExist)
        	   			{
        	   				productExist.quantity=productExist.quantity+1;
        	   				
        	   			}
        	   			else{
        	   				let updateProduct={productId:ikd,price:parseInt(price),quantity:1,title:Title}
        	   				items_object=[...items_object,updateProduct];
        	   			}
        	   			let totalprice=mongodb_total_price+ +price;

        	   			db.collection('user').update({_id:UserId},{email:User_Email,password:User_Password,items:items_object,totalPrice:totalprice})//insert({cart,totalPrice:20000})<-True;insert({cart},{totalPrice:20000})<-False
							.catch(err=>{console.log(err,"1")});
                    } 

        	   }).
        	   catch(err=>{
                    return err;
        	   });
		
	}
	static information()
	{
		let db=getdb.getDb();
		return db.collection('user').
        	   find().toArray().
        	   then(products=>{
 					
                    return products; 

        	   }).catch(err=>{ 
        	   	return err});
        
	}
    static delete(id)
    {
        let All_object=[];
        let items_object=[];
        let db=getdb.getDb();
        let xc=false;
        return db.collection('user').
               find().toArray().
               then(products=>{
                    products.map(wer=>{
                        All_object=wer;
                        
                        let Totalprice=wer.totalPrice;//totalprice
                        items_object=All_object.items;
                        let DaTa=items_object.find(pro=>pro.productId===id);
                        let Price=DaTa.price;
                        let quantity=DaTa.quantity;
                        let final_value=Price*quantity;

                        Totalprice=Totalprice-final_value;
                        if(Totalprice<0)
                        {
                            Totalprice=0;
                        }
                        let iD=new mongodb.ObjectId(wer._id);
                        let Index=items_object.findIndex(pro=>pro.productId===id);
                        let Lol=items_object.splice(Index,1);
                        console.log(">",All_object.items);
                        db.collection('user').updateOne({_id:iD},{$set:{items:All_object.items,totalPrice:Totalprice}})
                        .catch(err=>console.log(err));
                        
            })
                    return "sucess";
                })
        .catch(err=>console.log(err)); 
        
    }                
}
// [{}]ma [] dur kari ne adar jaava map method vaparvi
	   		/*jyare [{ _id: 5c90b4d9816a1a11a0077520,
							  cart:
							   { productId: 5c908e9647d1481e8c6c9805,
							     price: '45000',
							     quantity: 1,
							     UserId: 5c8fa4bb72f6bb271cd543a7 
							    }
							}]
							tema productId data leva mate let ee=Object.values(re);
							ee[1].productId->karta badha data avi jase
     */
     // let er=Object.values(wix);
        	   		// console.log(er[0].productId);//[{}]ma leva mate productId ne
        	   		














     // else{
     // 	let ee=Object.values(re);
	    //     	   		let mongodb_id=mongodb.ObjectId(UserId);
	    //     	   		console.log(mongodb_id,"<->");
	    //     	   		let mongodb_productId=mongodb.ObjectId(ee[3].productId);
	    //     	   		let mongodb_price=ee[3].price;
	    //     	   		let mongodb_totalPrice=ee[4];
	    //     	   		console.log(mongodb_totalPrice,"mongoTotal");
	    //     	   		console.log(prices,"Total");

	    //     	   		let TotalPrice=mongodb_totalPrice+parseInt(prices);//total->
	    //     	   		let mongodb_UserId=mongodb.ObjectId(ee[3].UserId);
	    //     	   		let mongodb_quantity=ee[3].quantity;
	        	   		
     //    	   			if(mongodb_productId==ikd)
     //    	   			{
        	   				
     //    	   				mongodb_quantity=mongodb_quantity+1;
     //    	   				let cart={
     //    	   					productId:mongodb_productId,
     //    	   					price:mongodb_price,
     //    	   					quantity:mongodb_quantity,
     //    	   				}
        	   				     	   				
     //    	   				db.collection('user').update({_id:mongodb_id},{email:User_Email,password:User_Password,cart,totalPrice:TotalPrice})
     //    	   					.then(success=>{
     //    	   						console.log("successful");
     //    	   					}).
     //    	   				catch(err=>{console.log(err,"2")});
     //    	   			}
     //    	   			else{

     //    	   			}
     // }


     // xc=true;
     //                    let ex=items_object.findIndex(ed=>ed.price===3200);
     //                    let ep=items_object.splice(ex);
     //                    console.log(wer,"after")
                        

     //                    db.collection('user').
     //                    update({_id:iD},wer).
     //                    then(wer=>{                            
     //                        console.log("great job");
     //                    }).
     //                    catch(err=>{
     //                        console.log("great job cismox",err);
     //                    });

// let iD=new mongodb.ObjectId(wer._id);
//                         console.log(wer.items,"before")
//                         console.log(id)
//                         items_object=wer.items;