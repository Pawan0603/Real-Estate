import connectDb from "../../../../middleware/mongoose";
import property from "../../../../models/property";
import { NextResponse } from "next/server";

export const DELETE =  connectDb(async function deleteHandler(request, response){
    const requestBody = await request.text();
    // console.log(requestBody);
    if(requestBody){
        try {
            const requestBodyJSON = JSON.parse(requestBody);
            console.log(requestBodyJSON);
            let deletedProperty  = await property.findByIdAndDelete({ _id: requestBodyJSON.propertyId })
            if (!deletedProperty) {
                return NextResponse.json({ success: false, message: 'Item not found' });
              }
      
              return NextResponse.json({ success: true, data: deletedProperty });

        } catch {
            return NextResponse.json({ error: "Invalid json in the request Body" });
        }
    }
    else {
      return NextResponse.json({ error : "Request body is empty"})
    }
  
  });
