import user from "../../../../models/user";
import connectDb from "../../../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server";


export const POST =  connectDb(async function postHandler(request, response){
  const requestBody = await request.text();
  // console.log(requestBody);
  if(requestBody){
    try {
      const requestBodyJSON = JSON.parse(requestBody);

      const data = jsonwebtoken.verify(requestBodyJSON, process.env.jwtSecreat);
      // console.log(data);
      let User = await user.find({email: data.email})
      return NextResponse.json({success: true, User })
    } catch {
      return NextResponse.json({ error : "Invalid json in the request Body"});
    }
  }
  else {
    return NextResponse.json({ error : "Request body is empty"})
  }

});

