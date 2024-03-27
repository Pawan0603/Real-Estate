import connectDb from "../../../../middleware/mongoose";
import massage from "../../../../models/massage";
import { NextResponse } from "next/server";

export const POST = connectDb(async function postHandler(request, response) {
  const requestBody = await request.text();
  // console.log(requestBody);
  if (requestBody) {
    try {
      const requestBodyJSON = JSON.parse(requestBody);
    //   console.log(requestBodyJSON);
      let massages = await massage.find({ Uemail: requestBodyJSON })
        // console.log(massages)
      return NextResponse.json({ success: true, massages })
    } catch {
      return NextResponse.json({ error: "Invalid json in the request Body" });
    }
  }
  else {
    return NextResponse.json({ error: "Request body is empty" })
  }

});