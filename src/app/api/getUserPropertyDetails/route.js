import connectDb from "../../../../middleware/mongoose";
import property from "../../../../models/property";
import { NextResponse } from "next/server";

export const POST = connectDb(async function postHandler(request, response) {
    const requestBody = await request.text();
    console.log(requestBody);
    if (requestBody) {
        try {
            const requestBodyJSON = JSON.parse(requestBody);
            console.log(requestBodyJSON);
            let Property = await property.find({ _id: requestBodyJSON.propertyId })
            if (Property) {
                console.log("clinet side : ", requestBodyJSON.UserEmail)
                console.log("server side: ",Property[0].UserEmail)
                if (requestBodyJSON.UserEmail == Property[0].UserEmail) {
                    return NextResponse.json({ success: true, Property })
                }
                else {
                    return NextResponse.json({ error: "Wrong user" })
                }
                
            }

        } catch {
            return NextResponse.json({ error: "Invalid json in the request Body" });
        }
    }
    else {
        return NextResponse.json({ error: "Request body is empty" })
    }

});