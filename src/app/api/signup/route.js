// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../../../models/user";
import connectDb from "../../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
import { NextResponse } from "next/server";


export const POST =  connectDb(async function postHandler(request, response){
  console.log("api run successfull")
  const requestBody = await request.text();
  try {
    const requestBodyJSON = JSON.parse(requestBody); 

    if (requestBodyJSON && requestBodyJSON.name && requestBodyJSON.email && requestBodyJSON.password) {
      const name = requestBodyJSON.name;
      const email = requestBodyJSON.email;
      const password = requestBodyJSON.password;
      console.log("email:", email);
      console.log("password:", password);

      let user = await User.findOne({"email": email}).maxTimeMS(30000);
      if(!user){
        let u = new User({ name, email, password: CryptoJS.AES.encrypt(password, process.env.CryptoJSSecrat).toString() })
        console.log(u);
        await u.save()
        return NextResponse.json({ success: "success" })
      }
      else{
        return NextResponse.json({ success: false, error: "this email are already registered" });
      }

    } else {
      return NextResponse.json({ error: " this method is nnot allowed" }, { status: 400 });
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    return NextResponse.json({ error: "Invalid JSON in the request body" }, { status: 400 });
  }

 
});

