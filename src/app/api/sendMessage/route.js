import connectDb from "../../../../middleware/mongoose";
import massage from "../../../../models/massage";
import { NextResponse } from "next/server";

export const POST = connectDb(async function postHandler(request, response) {
    const requestBody = await request.text();
    console.log("this is reqBody : ", requestBody);

    try {
        const requestBodyJSON = JSON.parse(requestBody);
        console.log("this is requestBodyJSON", requestBodyJSON)
        
        if (requestBodyJSON) {
            console.log("cheking console",requestBodyJSON);

            const id = Math.random();
            console.log("id : ", id)
            const Uemail = requestBodyJSON.email;
            const cName = requestBodyJSON.cName;
            const cEmail = requestBodyJSON.cEmail;
            const cMobile = requestBodyJSON.cMobile;
            const cMessage = requestBodyJSON.cMessage;

            

            let msg = new massage({ id, Uemail, cName, cEmail, cMobile, cMessage });
            console.log("this is res of database", msg);
            await msg.save();
            return NextResponse.json({ success: "success" });


        } else {
            return NextResponse.json({ error: " this method is nnot allowed" }, { status: 400 });
        }
    } catch (error) {
        console.error("JSON parsing error:", error);
        return NextResponse.json({ error: "Invalid JSON in the request body" }, { status: 400 });
    }


   
});