function setCoockie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.coockie = cname + "=" + value + ";" + expires + ";path=/";
}