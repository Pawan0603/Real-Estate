import connectDb from "../../../../middleware/mongoose";
import property from "../../../../models/property";
import { NextResponse } from "next/server";

export const POST =  connectDb(async function postHandler(request, response){
  console.log("api run successfull")
  const requestBody = await request.text();
  try {
    const requestBodyJSON = JSON.parse(requestBody); 

    if (requestBodyJSON) {
      console.log(requestBodyJSON);
      let p = new property(requestBodyJSON);
      console.log("this is res of database", p);
      await p.save();
      return NextResponse.json({ success: "success" });

      
    } else {
      return NextResponse.json({ error: " this method is nnot allowed" }, { status: 400 });
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    return NextResponse.json({ error: "Invalid JSON in the request body" }, { status: 400 });
  }

 
});

