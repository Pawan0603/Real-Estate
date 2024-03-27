// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../../models/user";
import connectDb from "../../../../middleware/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


export const POST =  connectDb(async function postHandler(request, response){
  console.log("api run successfull")
  const requestBody = await request.text();
  try {
    const requestBodyJSON = JSON.parse(requestBody); 

    if (requestBodyJSON && requestBodyJSON.email && requestBodyJSON.password) {
      const email = requestBodyJSON.email;
      const password = requestBodyJSON.password;
      console.log("email:", email);
      console.log("password:", password);

      let user = await User.findOne({"email": email}).maxTimeMS(30000);
      if(user){
        console.log("this password form data base", user);
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.CryptoJSSecrat);
        let decryptPass = bytes.toString(CryptoJS.enc.Utf8);
        if(email == user.email && password == decryptPass) {
            var token = jwt.sign({ email: user.email }, process.env.jwtSecreat);
            return NextResponse.json({ success: true, token });
        }
        else{
            return NextResponse.json({ success: false, error: "Invalid Credentials" });
        }
      }
      else{
        return NextResponse.json({ success: false, error: "User not found" });
      }
    } else {
      return NextResponse.json({ error: "this method is nnot allowed" }, { status: 400 });
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    return NextResponse.json({ error: "Invalid JSON in the request body" }, { status: 400 });
  }

 
});
