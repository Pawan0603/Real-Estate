import connectDb from "../../../../middleware/mongoose";
import massage from "../../../../models/massage";
import { NextResponse } from "next/server";

export const DELETE =  connectDb(async function deleteHandler(request, response){
    const requestBody = await request.text();
    // console.log(requestBody);
    if(requestBody){
        try {
            const requestBodyJSON = JSON.parse(requestBody);
            // console.log(requestBodyJSON);
            let deletedMessage  = await massage.findByIdAndDelete({ _id: requestBodyJSON })
            // console.log(deletedMessage);
            if (!deletedMessage) {
                return NextResponse.json({ success: false, message: 'Item not found' });
              }
      
              return NextResponse.json({ success: true, data: deletedMessage });

        } catch {
            return NextResponse.json({ error: "Invalid json in the request Body" });
        }
    }
    else {
      return NextResponse.json({ error : "Request body is empty"})
    }
  
  });