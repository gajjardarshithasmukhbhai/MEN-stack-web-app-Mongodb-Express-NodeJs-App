let mongodb=require('mongodb');
let getdb=require('../util/database.js');
let UserId;
module.exports=class User{
	static saveUser(emial,password)
	{//direct this method thi data na mokali sako mongo ma tamare constructor te banavu te padse jo this no te use te karvo hoy to
		this.email=emial;
		this.password=password;
		let db=getdb.getDb();
		return db.collection('user').insertOne({"email":this.email,"password":this.password})
		.then(data=>{
			UserId=data.insertedId;
		})
		.catch(error=>{
			return error;
		});
		
	}
	static UserId()
	{
		return UserId;
	}
}